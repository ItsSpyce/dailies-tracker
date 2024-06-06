import {
  BaseColumn,
  type InferJsType,
  type InferName,
  type ColumnValidationError,
  ValidationState,
} from './columns';
import { getIdColumnName } from './utils';
import * as sqlite3 from 'sqlite3';
import chalk from 'chalk';
import { snakeCase } from 'change-case';

export type SchemaDefinitionMap = Record<string, BaseColumn>;
export type SchemaSelectorMap<T extends SchemaDefinitionMap> = {
  [key in keyof T]: InferJsType<T[key]>;
};
type ConvertSchemaToType<T> = {
  [key in keyof T]: InferJsType<T[key]>;
};
type WhereStatement<T extends SchemaDefinitionMap> =
  | {
      [key in keyof T]?: InferJsType<T[key]>;
    }
  | number;

const buildWhereStatement = <T extends SchemaDefinitionMap>(
  schema: T,
  where?: WhereStatement<T>
) => {
  if (typeof where === 'number') {
    where = { [getIdColumnName(schema)]: where } as any;
  }
  where = {
    deleted_at: null,
    ...(where as any),
  };
  return (
    'WHERE ' +
    Object.entries(where)
      .map(
        ([key, value]) =>
          `${key} = ${typeof value === 'string' ? `'${value}'` : value}`
      )
      .join(' AND ')
  );
};

export class BaseSchema<
  T extends SchemaDefinitionMap = {},
  M extends object = any
> {
  protected _mappers: ((entity: ConvertSchemaToType<T>) => M)[] = [];

  get schema(): T {
    return this._schema;
  }

  constructor(protected _schema: T) {
    for (const fieldName of Object.getOwnPropertyNames(_schema)) {
      const columnDefinition = _schema[fieldName];
      if (!(columnDefinition instanceof BaseColumn)) {
        throw new Error(
          `Cannot define base schema with non-column definition (reading ${fieldName})`
        );
      }
      columnDefinition.columnName ??= fieldName;
    }
  }

  extends<T2 extends BaseSchema>(other: T2): BaseSchema<T & T2['schema'], M> {
    this._schema = { ...this._schema, ...other._schema };
    return this;
  }

  mapsTo<M2 extends Record<string, any>>(
    factory: (entity: ConvertSchemaToType<T>) => M2
  ): BaseSchema<T, M extends undefined ? M2 : M & M2> {
    this._mappers.push(factory as any);
    return this as any;
  }
}

export class TableSchema<
  T extends SchemaDefinitionMap = {},
  M extends Record<string, any> = undefined,
  TName extends string = string
> extends BaseSchema<T, M> {
  get name(): TName {
    return this._name;
  }

  constructor(private _name: TName, schema: T, private _db: sqlite3.Database) {
    super(schema);
  }

  extends = <T2 extends TableSchema | BaseSchema>(
    schema: T2
  ): TableSchema<T & T2['schema'], M> => {
    this._schema = { ...schema.schema, ...this._schema };
    return this;
  };

  mapsTo = <M2 extends Record<string, any>>(
    factory: (entity: ConvertSchemaToType<T>) => M2
  ): TableSchema<T, M extends undefined ? M2 : M & M2> => {
    this._mappers.push(factory as any);
    return this as any;
  };

  entity = (): SchemaEntity<
    T,
    M extends undefined ? { [key in keyof T]: InferJsType<T[key]> } : M
  > => {
    const result = new SchemaDefinitionExecutor(
      this._name,
      this._schema,
      this._mappers,
      this._db
    );
    // initialize the table for this entity
    const columnCreationMap = new Map<string, string[]>();
    Object.entries(this._schema).forEach(([key, column]) => {
      const columnName = column.columnName ?? key;
      Object.defineProperty(result, key, {
        get: () => columnName,
      });
      const columnType = column.converter.sqlTypeName;
      columnCreationMap.set(columnName, [
        columnType,
        ...column.getConditions(),
      ]);
    });
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${
      this.name
    } (\n${Array.from(columnCreationMap.entries())
      .map(
        ([columnName, conditions]) => `\t${columnName} ${conditions.join(' ')}`
      )
      .join(',\n')}\n)`;
    this._db.exec(createTableQuery, (err) => {
      if (err != null) {
        console.error(
          chalk.red`Failed to execute script:`,
          this.name,
          err.message
        );
        console.debug(chalk.blue`Executed script:`, createTableQuery);
      }
    });
    return result as any;
  };
}

export type SchemaEntity<T extends SchemaDefinitionMap, M extends object> = {
  [key in keyof T]: InferName<T[key]>;
} & SchemaDefinitionExecutor<T, M>;

export type TableType<T extends SchemaEntity<any, any>> =
  T extends SchemaEntity<any, infer M> ? M : never;

class SchemaDefinitionExecutor<
  T extends SchemaDefinitionMap,
  M extends object
> {
  private _columnNameMap = new Map<string, string>();

  constructor(
    public _name: string,
    public _schema: T,
    private _mappers: ((entity: ConvertSchemaToType<T>) => M)[],
    private _db: sqlite3.Database
  ) {
    for (const [key, value] of Object.entries(_schema)) {
      this._columnNameMap.set(value.columnName, key);
    }
  }
  parse = (
    from: Partial<ConvertSchemaToType<T>>
  ): [ConvertSchemaToType<T> & M, ColumnValidationError[] | null] => {
    let result = Object.create(null);
    const self = this;
    const state = new ValidationState(this._name);
    for (const [columnName, column] of Object.entries(self._schema)) {
      const key = self._columnNameMap.get(columnName) ?? columnName;
      const value = from[key];
      const converted = column.validate(value, state);
      result[key] = converted;
    }
    if (this._mappers.length === 0) {
      return [result, state.hasErrors() ? state.errors : null];
    }
    for (const mapper of self._mappers) {
      const mapped = mapper(from as ConvertSchemaToType<T>);
      result = { ...result, ...mapped };
    }
    return [result, state.hasErrors() ? state.errors : null];
  };

  private _parseColumns = (data: any): M => {
    if (data == null) {
      return null;
    }
    const result = Object.create(null);
    for (const [key, value] of Object.entries(data)) {
      const objectFieldName = this._columnNameMap.get(key);
      if (objectFieldName != null) {
        result[objectFieldName] = this._schema[objectFieldName].parse(value);
      }
    }
    return result;
  };

  select = (
    fields: (keyof T)[] | '*',
    where?: WhereStatement<T>
  ): Promise<M[]> => {
    const self = this;
    const selectFields =
      fields === '*' ? '*' : fields.map(this._columnNameMap.get).join(', ');
    const query = `SELECT ${selectFields} FROM ${
      self._name
    } ${buildWhereStatement(this._schema, where)}`;
    console.debug(chalk.blue`Executing query:`, query);
    return new Promise((resolve, reject) => {
      self._db.all(query, function (err, rows) {
        if (err) {
          return reject(err);
        }

        console.debug('Selected', rows.length, 'rows');
        resolve(rows.map(self._parseColumns));
      });
    });
  };

  insert = (value: Partial<ConvertSchemaToType<T>>): Promise<M> => {
    const self = this;
    const columns = Object.keys(value)
      .map((x) => mapNamesToColumnNames([x], self._schema)[0])
      .join(', ');
    const values = Object.values(value).join(', ');
    const query = `INSERT INTO ${this._name} (${columns}) VALUES (${values})`;
    console.debug(chalk.blue`Executing query:`, query);
    return new Promise((resolve, reject) => {
      self._db.all(query, function (err, rows) {
        if (err) {
          return reject(err);
        }
        console.debug('Inserted', rows.length, 'rows');
        resolve(self._parseColumns(rows[0]));
      });
    });
  };

  batchInsert = (values: Partial<ConvertSchemaToType<T>>[]): Promise<M[]> => {
    const self = this;
    const combinedQuery = values
      .map((value) => {
        const columns = Object.keys(value)
          .map((x) => mapNamesToColumnNames([x], self._schema)[0])
          .join(', ');
        const valuesString = values
          .map((value) => `(${Object.values(value).join(', ')})`)
          .join(', ');
        return `INSERT INTO ${self._name} (${columns}) VALUES ${valuesString}`;
      })
      .join('\n');
    console.debug(chalk.blue`Executing query:`, combinedQuery);

    return new Promise((resolve, reject) => {
      self._db.all(combinedQuery, function (err, rows) {
        if (err) {
          return reject(err);
        }
        console.debug('Inserted', rows.length, 'rows');
        resolve(rows.map(self._parseColumns));
      });
    });
  };

  update = (
    value: Partial<ConvertSchemaToType<T>>,
    where?: WhereStatement<T>
  ): Promise<M> => {
    const self = this;
    const setClause = Object.entries(value)
      .map(
        ([key, value]) =>
          `${key} = ${typeof value === 'string' ? `'${value}'` : value}`
      )
      .join(', ');
    const query = `UPDATE ${self._name} SET ${setClause} ${buildWhereStatement(
      self._schema,
      where
    )}`;
    console.debug(chalk.blue`Executing query:`, query);
    return new Promise((resolve, reject) => {
      self._db.all(query, function (err, rows) {
        if (err) {
          return reject(err);
        }
        console.debug('Updated', rows.length, 'rows');
        resolve(self._parseColumns(rows[0]));
      });
    });
  };

  delete = (where: WhereStatement<T>): Promise<void> => {
    const self = this;

    const query = `DELETE FROM ${self._name} ${buildWhereStatement(
      self._schema,
      where
    )}`;
    console.debug(chalk.blue`Executing query:`, query);
    return new Promise((resolve, reject) => {
      self._db.all(query, function (err, rows) {
        if (err) {
          return reject(err);
        }
        console.debug('Deleted', rows.length, 'rows');
        resolve();
      });
    });
  };

  toString() {
    return this._name;
  }
}

function mapNamesToColumnNames<T extends SchemaDefinitionMap>(
  names: string[] | '*',
  schema: T
) {
  if (names === '*') {
    names = Object.keys(schema);
  }
  return names.map((name) => schema[name].columnName ?? snakeCase(name));
}
