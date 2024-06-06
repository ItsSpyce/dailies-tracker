import type { SchemaDefinitionMap } from './table';
import { IdColumn } from './columns';

export function getIdColumnName(schema: SchemaDefinitionMap): string {
  for (const key in schema) {
    if (schema[key] instanceof IdColumn) {
      return key;
    }
  }
  return 'ROWID';
}
