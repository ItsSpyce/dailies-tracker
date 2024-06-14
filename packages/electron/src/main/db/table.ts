import { type Column, type InferColumnType, ValidationState } from './columns';
import type { Connection } from './connection';
import { getIdColumnName } from './utils';
import { snakeCase } from '../utils/change-case';

export type SchemaDefinitionMap = Record<string, Column<any, string, any>>;
export type SchemaSelectorMap<T extends SchemaDefinitionMap> = {
  [key in keyof T]: InferColumnType<T[key]>;
};
type ConvertSchemaToType<T> = {
  [key in keyof T]: InferColumnType<T[key]>;
};
type WhereStatement<T extends SchemaDefinitionMap> =
  | {
      [key in keyof T]?: InferColumnType<T[key]>;
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

export class Table<T extends Record<string, Column<any, string, any>>> {
  private _columnNameMap: Record<keyof T, string> = Object.create(null);

  get columns(): { [K in keyof T]: string } {
    return;
  }

  constructor(
    public _name: string,
    public _schema: T,
    private _connection: Connection
  ) {
    for (const [key, value] of Object.entries(_schema)) {
      if (value._columnName == null) {
        value._columnName = snakeCase(key);
      }
      // @ts-ignore
      this._columnNameMap[key] = value._columnName;
    }
  }
  parse = (
    from: Partial<ConvertSchemaToType<T>>
  ): { [K in keyof T]: InferColumnType<T[K]> } => {
    let result = Object.create(null);
    const self = this;
    const state = new ValidationState(this._name);
    for (const [columnName, column] of Object.entries(self._schema)) {
      const key = self._columnNameMap[columnName] ?? columnName;
      const value = from[key];
      const converted = column.parse(value, state);
      result[key] = converted;
    }
    if (state.hasErrors()) {
      throw state.errors[0];
    }
    return result;
  };

  private _parseColumns = (
    data: any
  ): { [K in keyof T]: InferColumnType<T[K]> } => {
    if (data == null) {
      return null;
    }
    const result = Object.create(null);
    const state = new ValidationState(this._name);
    for (const [key, value] of Object.entries(data)) {
      const objectFieldName = this._columnNameMap[key];
      if (objectFieldName != null) {
        result[objectFieldName] = this._schema[objectFieldName].parse(
          value,
          state
        );
      }
    }
    return result;
  };

  select = async (
    fields: (keyof T)[] | '*',
    where?: WhereStatement<T>
  ): Promise<{ [K in keyof T]: InferColumnType<T[K]> }[]> => {
    const self = this;
    const selectFields =
      fields === '*' ? '*' : fields.map((field) => this._schema[field]);
    const result = await self._connection
      .execute`SELECT ${selectFields} FROM ${self} ${buildWhereStatement(
      this._schema,
      where
    )}`;
    return result.map(self._parseColumns);
  };

  insert = async (
    value: Partial<ConvertSchemaToType<T>>
  ): Promise<{ [K in keyof T]: InferColumnType<T[K]> }> => {
    const self = this;
    const columns = Object.keys(value)
      .map((x) => mapNamesToColumnNames([x], self._schema)[0])
      .join(', ');
    const values = Object.values(value)
      .map((v) => JSON.stringify(v))
      .join(', ');
    const [item] = await self._connection
      .execute`INSERT INTO ${this._name} (${columns}) VALUES (${values})`;
    return self._parseColumns(item);
  };

  batchInsert = async (
    values: Partial<ConvertSchemaToType<T>>[]
  ): Promise<{ [K in keyof T]: InferColumnType<T[K]> }[]> => {
    const self = this;
    const insertStatements = new Array<string>();
    for (const value of values) {
      const columns = Object.keys(value)
        .map((x) => mapNamesToColumnNames([x], self._schema)[0])
        .join(', ');
      const values = Object.values(value)
        .map((v) => JSON.stringify(v))
        .join(', ');
      insertStatements.push(
        `INSERT INTO ${this._name} (${columns}) VALUES (${values});`
      );
    }
    const combinedQuery = insertStatements.join('\n');
    const result = await self._connection.execute(combinedQuery);
    return result.map(self._parseColumns);
  };

  update = async (
    value: Partial<ConvertSchemaToType<T>>,
    where?: WhereStatement<T>
  ): Promise<{ [K in keyof T]: InferColumnType<T[K]> }> => {
    const self = this;
    const setClause = Object.entries(value)
      .map(
        ([key, value]) =>
          `${key} = ${typeof value === 'string' ? `'${value}'` : value}`
      )
      .join(', ');
    const [result] = await self._connection.execute`UPDATE ${
      self._name
    } SET ${setClause} ${buildWhereStatement(self._schema, where)}`;
    return self._parseColumns(result);
  };

  delete = async (where: WhereStatement<T>): Promise<void> => {
    const self = this;
    await self._connection.execute`DELETE FROM ${
      self._name
    } ${buildWhereStatement(self._schema, where)}`;
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
  return names.map((name) => schema[name]._columnName ?? snakeCase(name));
}
