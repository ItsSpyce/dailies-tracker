export interface SqlToJsConverter<S, T> {
  get sqlTypeName(): string;
  convertToSql(value: T): S;
  convertToJs(value: S): T;
}

export function textConverter(): SqlToJsConverter<string, string> {
  return {
    sqlTypeName: 'TEXT',
    convertToSql: (value) => value,
    convertToJs: (value) => value,
  };
}

export function intConverter(): SqlToJsConverter<number, number> {
  return {
    sqlTypeName: 'INTEGER',
    convertToSql: (value) => parseInt(value.toString()),
    convertToJs: (value) => value,
  };
}

export function realConverter(): SqlToJsConverter<number, number> {
  return {
    sqlTypeName: 'REAL',
    convertToSql: (value) => parseFloat(value.toString()),
    convertToJs: (value) => value,
  };
}

export function blobConverter(): SqlToJsConverter<Uint8Array, Uint8Array> {
  return {
    sqlTypeName: 'BLOB',
    convertToSql: (value) => value,
    convertToJs: (value) => value,
  };
}

export function dateConverter(): SqlToJsConverter<string, Date> {
  return {
    sqlTypeName: 'DATETIME',
    convertToSql: (value) => value.toISOString(),
    convertToJs: (value) => new Date(value),
  };
}

export function booleanConverter(): SqlToJsConverter<number, boolean> {
  return {
    sqlTypeName: 'INTEGER',
    convertToSql: (value) => (value ? 1 : 0),
    convertToJs: (value) => value === 1,
  };
}

export function nullableConverter(
  converter: SqlToJsConverter<any, any>
): SqlToJsConverter<any, any> {
  return {
    sqlTypeName: converter.sqlTypeName,
    convertToSql: (value) =>
      value == null ? null : converter.convertToSql(value),
    convertToJs: (value) =>
      value == null ? null : converter.convertToJs(value),
  };
}
