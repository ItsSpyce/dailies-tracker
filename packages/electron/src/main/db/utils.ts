import assert from 'assert';
import { Table, type SchemaDefinitionMap } from './table';
import { Column, IntColumn } from './columns';

export function getIdColumnName(schema: SchemaDefinitionMap): string {
  for (const key in schema) {
    const column = schema[key];
    if (column instanceof IntColumn) {
      if (column._isPrimaryKey) {
        return key;
      }
    }
  }
  return 'ROWID';
}

export function getConditionsForColumn(column: Column<any, string, any>) {
  return [
    column._isNullable ? false : 'NOT NULL',
    column._isPrimaryKey ? 'PRIMARY KEY' : false,
    column._isUnique ? 'UNIQUE' : false,
    column._default
      ? `DEFAULT ${JSON.stringify(
          typeof column._default === 'function'
            ? column._default()
            : column._default
        )}`
      : false,
  ].filter(Boolean) as string[] satisfies string[];
}

export function parameterizeScript(
  script: TemplateStringsArray,
  ...values: any[]
) {
  const args = [];
  let result = '';
  console.log(script, values);
  for (let i = 0; i < script.length; i++) {
    const item = script[i];
    const value = values[i];
    result += item;
    if (typeof value === 'object') {
      if ('_columnName' in value) {
        assert.notEqual(value._columnName, null, 'Column must have a name');
        assert.notEqual(value._columnName.length, 0, 'Column must have a name');
        result += value._columnName;
      } else if ('_tableName' in value) {
        assert.notEqual(value._tableName, null, 'Table must have a name');
        assert.notEqual(value._tableName.length, 0, 'Table must have a name');
        result += value._tableName;
      }
    } else if (value != null) {
      result += '?';
      args.push(value);
    }
  }
  return [result, args] as const;
}
