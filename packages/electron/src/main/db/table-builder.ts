import {
  BaseColumn,
  TextColumn,
  IntColumn,
  BooleanColumn,
  RealColumn,
  BlobColumn,
  DateColumn,
  IdColumn,
  type ColumnJsType,
  type ColumnName,
} from './columns';

type SchemaDefinitionMap = Record<string, BaseColumn>;
type SchemaSelectorMap<T extends SchemaDefinitionMap> = Partial<{
  [key in keyof T]: ColumnJsType<T[key]>;
}>;
type ConvertSchemaToType<T> = {
  [key in keyof T]: ColumnJsType<T[key]>;
};

export class BaseSchema<
  T extends SchemaDefinitionMap = {},
  M extends SchemaSelectorMap<T> = {}
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

  mapsTo<M2 extends SchemaSelectorMap<T>>(
    factory: (entity: ConvertSchemaToType<T>) => M2
  ): BaseSchema<T, M & M2> {
    this._mappers.push(factory as any);
    return this as any;
  }
}

export class TableSchema<
  T extends SchemaDefinitionMap = {},
  M extends SchemaSelectorMap<T> = {},
  TName extends string = string
> extends BaseSchema<T, M> {
  get name(): TName {
    return this._name;
  }

  constructor(private _name: TName, schema: T) {
    super(schema);
  }

  extends<T2 extends TableSchema | BaseSchema>(
    schema: T2
  ): TableSchema<T & T2['schema'], M> {
    this._schema = { ...this._schema, ...schema.schema };
    return this;
  }

  mapsTo<M2 extends SchemaSelectorMap<T>>(
    factory: (entity: ConvertSchemaToType<T>) => M2
  ): TableSchema<T, M & M2> {
    this._mappers.push(factory as any);
    return this as any;
  }

  seal(): SchemaDefinition<T, M> {
    const self = this;
    const result = Object.create({
      _schema: this._schema,
      parse(from: Partial<ConvertSchemaToType<T>>) {
        const result: M = {} as M;
        for (const mapper of self._mappers) {
          const mapped = mapper(from as ConvertSchemaToType<T>);
          Object.assign(result, mapped);
        }
        return result;
      },
    });
    const schemaFields = Object.getOwnPropertyNames(this._schema);
    for (const field of schemaFields) {
      Object.defineProperty(result, field, {
        get: () => this._schema[field].columnName ?? field,
      });
    }
    return result;
  }
}

export type SchemaDefinition<
  T extends SchemaDefinitionMap,
  M extends SchemaSelectorMap<T>
> = { [key in keyof T]: ColumnName<T[key]> } & {
  get _schema(): T;

  parse(from: Partial<ConvertSchemaToType<T>>): M;
};

export function createBaseSchema<T extends Record<string, BaseColumn>>(
  columns: T
): BaseSchema<T> {
  const base = new BaseSchema(columns);
  return base;
}

export function table<T extends Record<string, BaseColumn>>(
  name: string,
  columns: T
): TableSchema<T> {
  const table = new TableSchema(name, columns);
  return table;
}

export const column = {
  text<TName extends string>(name?: TName) {
    return new TextColumn(name);
  },
  int<TName extends string>(name?: TName) {
    return new IntColumn(name);
  },
  boolean<TName extends string>(name?: TName) {
    return new BooleanColumn(name);
  },
  real<TName extends string>(name?: TName) {
    return new RealColumn(name);
  },
  blob<TName extends string>(name?: TName) {
    return new BlobColumn(name);
  },
  date<TName extends string>(name?: TName) {
    return new DateColumn(name);
  },
  id() {
    return new IdColumn();
  },
};
