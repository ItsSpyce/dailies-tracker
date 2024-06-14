import type { SchemaDefinitionMap } from './table';
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
