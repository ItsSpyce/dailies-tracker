import { type Column, type InferColumnType, ValidationState } from './columns';
import { snakeCase } from '../utils/change-case';
import type { Connection } from './connection';

export type SchemaDefinitionMap = Record<string, Column<any, string, any>>;
export type SchemaSelectorMap<T extends SchemaDefinitionMap> = {
  [key in keyof T]: InferColumnType<T[key]>;
};
type ConvertSchemaToType<T> = {
  [key in keyof T]: InferColumnType<T[key]>;
};
type WhereStatement<T extends SchemaDefinitionMap> = {
  [key in keyof T]?:
    | {
        eq: InferColumnType<T[key]>;
        ne: InferColumnType<T[key]>;
        gt: InferColumnType<T[key]>;
        gte: InferColumnType<T[key]>;
        lt: InferColumnType<T[key]>;
        lte: InferColumnType<T[key]>;
        like: InferColumnType<T[key]>;
        in: InferColumnType<T[key]>[];
        notIn: InferColumnType<T[key]>[];
      }
    | InferColumnType<T[key]>
    | null;
};

export class Table<T extends Record<string, Column<any, string, any>>> {
  private _columnNameToObjectField = new Map<string, string>();
  private _objectFieldToColumnName = new Map<string, string>();

  constructor(
    public _tableName: string,
    public _schema: T,
    private _connection: Connection
  ) {
    for (const [key, value] of Object.entries(_schema)) {
      if (!value._columnName) {
        value._columnName = snakeCase(key);
      }
      this._columnNameToObjectField.set(value._columnName, key);
      this._objectFieldToColumnName.set(key, value._columnName);
    }
  }

  private _convertRowToObject(
    row: Record<string, any>
  ): ConvertSchemaToType<T> {
    const result = Object.create(null);
    for (const [key, value] of Object.entries(row)) {
      const objectField = this._columnNameToObjectField.get(key);
      if (objectField) {
        result[objectField] = this._schema[objectField].readValue(value);
      }
    }
    return result;
  }

  select = async (
    where?: WhereStatement<T>
  ): Promise<ConvertSchemaToType<T>[]> => {
    let script = `SELECT * FROM ${this._tableName}`;
    if (where) {
      script += ` WHERE ${Object.entries(where)
        .map(([key, value]) => {
          if (value === null) {
            return `${this._objectFieldToColumnName.get(key)} IS NULL`;
          }
          if (typeof value === 'object') {
            const entries = Object.entries(value);
            if (entries.length === 1) {
              const [operator, operand] = entries[0] as [string, any];
              if (operator === 'like') {
                return `${this._objectFieldToColumnName.get(key)} LIKE ?`;
              }
              if (operator === 'in') {
                return `${this._objectFieldToColumnName.get(key)} IN (${operand
                  .map(() => '?')
                  .join(', ')})`;
              }
              if (operator === 'notIn') {
                return `${this._objectFieldToColumnName.get(
                  key
                )} NOT IN (${operand.map(() => '?').join(', ')})`;
              }
              return `${this._objectFieldToColumnName.get(key)} ${operator} ?`;
            }
          }
          return `${this._objectFieldToColumnName.get(key)} = ?`;
        })
        .join(' AND ')}`;
    }
    const result = await this._connection.execute(script, []);
    return result.map((row) => this._convertRowToObject(row));
  };

  insert = async (
    values: Partial<ConvertSchemaToType<T>>
  ): Promise<ConvertSchemaToType<T>> => {
    const script = `
      INSERT INTO ${this._tableName} (${Object.keys(values)
      .map((key) => this._objectFieldToColumnName.get(key))
      .join(', ')})
      VALUES (${Object.keys(values)
        .map(() => '?')
        .join(', ')})
    `;
    const validationState = new ValidationState(this._tableName);
    const parameterizedValue = Object.entries(values).map(([key, value]) => {
      this._schema[key]._validate(value, validationState);
      return this._schema[key]._writeValue(value);
    });
    if (validationState.hasErrors()) {
      throw validationState.errors[0];
    }
    const result = await this._connection.execute(script, parameterizedValue);
    return result.map((row) => this._convertRowToObject(row))[0];
  };

  bulkInsert = async (
    values: Partial<ConvertSchemaToType<T>>[]
  ): Promise<ConvertSchemaToType<T>[]> => {
    let script = '';
    for (const value of values) {
      script += `
        INSERT INTO ${this._tableName} (${Object.keys(value)
        .map((key) => this._objectFieldToColumnName.get(key))
        .join(', ')})
        VALUES (${Object.keys(value)
          .map(() => '?')
          .join(', ')});
      `;
    }
    const validationState = new ValidationState(this._tableName);
    const parameterizedValues = values.map((value) => {
      const parameterizedValue = Object.entries(value).map(([key, value]) => {
        this._schema[key]._validate(value, validationState);
        return this._schema[key]._writeValue(value);
      });
      return parameterizedValue;
    });

    if (validationState.hasErrors()) {
      throw validationState.errors[0];
    }
    const result = await this._connection.execute(script, parameterizedValues);
    return result.map((row) => this._convertRowToObject(row));
  };

  update = async (
    values: Partial<ConvertSchemaToType<T>>,
    conditions: Partial<ConvertSchemaToType<T>>
  ): Promise<ConvertSchemaToType<T>[]> => {
    const script = `
      UPDATE ${this._tableName}
      SET ${Object.entries(values)
        .map(([key, value]) => {
          this._schema[key]._validate(
            value,
            new ValidationState(this._tableName)
          );
          return `${this._objectFieldToColumnName.get(key)} = ?`;
        })
        .join(', ')}
      WHERE ${Object.entries(conditions)
        .map(([key, value]) => {
          this._schema[key]._validate(
            value,
            new ValidationState(this._tableName)
          );
          return `${this._objectFieldToColumnName.get(key)} = ?`;
        })
        .join(' AND ')}
    `;
    const parameterizedValues = [
      ...Object.entries(values).map(([key, value]) =>
        this._schema[key]._writeValue(value)
      ),
      ...Object.entries(conditions).map(([key, value]) =>
        this._schema[key]._writeValue(value)
      ),
    ];
    const result = await this._connection.execute(script, parameterizedValues);
    return result.map((row) => this._convertRowToObject(row));
  };

  delete = async (
    conditions: Partial<ConvertSchemaToType<T>>
  ): Promise<ConvertSchemaToType<T>[]> => {
    const script = `
      DELETE FROM ${this._tableName}
      WHERE ${Object.entries(conditions)
        .map(([key, value]) => {
          this._schema[key]._validate(
            value,
            new ValidationState(this._tableName)
          );
          return `${this._objectFieldToColumnName.get(key)} = ?`;
        })
        .join(' AND ')}
    `;
    const parameterizedValues = Object.entries(conditions).map(([key, value]) =>
      this._schema[key]._writeValue(value)
    );
    const result = await this._connection.execute(script, parameterizedValues);
    return result.map((row) => this._convertRowToObject(row));
  };
}
