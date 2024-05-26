import {
  SqlToJsConverter,
  blobConverter,
  booleanConverter,
  dateConverter,
  intConverter,
  nullableConverter,
  realConverter,
  textConverter,
} from './converters';

export class ColumnValidationError extends Error {
  constructor(message: string, public path: string) {
    super(message);
  }
}

export type ColumnSqlType<T> = T extends BaseColumn<infer S, any, any>
  ? S
  : never;
export type ColumnJsType<T> = T extends BaseColumn<any, infer T, any>
  ? T
  : never;
export type ColumnName<T> = T extends BaseColumn<any, any, infer N> ? N : never;

const baseAssertions = {
  isUnique: 'Value must be unique',
  notNullable: 'Value cannot be null',
};

export abstract class BaseColumn<
  TIn = any,
  TOut = any,
  TName extends string = string,
  TAssertionErrorMap extends Record<string, string> = {}
> {
  abstract converter: SqlToJsConverter<TIn, TOut>;
  private _assertions: (keyof TAssertionErrorMap)[] = [];
  protected defaultValue?: TIn;
  protected defaultExpr?: string;

  get columnName(): TName {
    return this._columnName;
  }

  set columnName(value: TName) {
    this._columnName = value;
  }

  constructor(private _columnName?: TName) {}

  protected addAssertion(name: keyof TAssertionErrorMap): this {
    this._assertions.push(name);
    return this;
  }

  nullable(): NullableColumn<TIn, TOut, TName, TAssertionErrorMap> {
    return new NullableColumn(this);
  }

  unique(): this {
    return this;
  }

  default(value: TIn | string): this {
    if (typeof value === 'string') {
      this.defaultExpr = value;
    } else {
      this.defaultValue = value;
    }
    return this;
  }
}

const nullableAssertions = {
  isNotNull: (value: any) => value != null,
  isNull: (value: any) => value == null,
};

export class NullableColumn<
  TIn,
  TOut,
  TName extends string,
  TAssertionErrorMap extends Record<string, string>
> extends BaseColumn<
  TIn | null,
  TOut | null,
  TName,
  Omit<TAssertionErrorMap, keyof typeof nullableAssertions>
> {
  converter: SqlToJsConverter<TIn, TOut>;
  constructor(
    private column: BaseColumn<TIn, TOut, TName, TAssertionErrorMap>
  ) {
    super(column.columnName);
    this.converter = nullableConverter(column.converter);
  }
}

type TextColumnAssertions = {};

export class TextColumn<
  TName extends string,
  TAssertionErrorMap extends Record<string, string> = TextColumnAssertions
> extends BaseColumn<string, string, TName, TAssertionErrorMap> {
  converter = textConverter();

  default(value: string): this {
    this.defaultValue = value;
    return this;
  }
}

type IntColumnAssertions = {};

export class IntColumn<
  TName extends string,
  TAssertionErrorMap extends Record<string, string> = IntColumnAssertions
> extends BaseColumn<number, number, TName, TAssertionErrorMap> {
  converter = intConverter();
}

type BooleanColumnAssertions = {};

export class BooleanColumn<
  TName extends string,
  TAssertionErrorMap extends Record<string, string> = BooleanColumnAssertions
> extends BaseColumn<number, boolean, TName, TAssertionErrorMap> {
  converter = booleanConverter();
}

type RealColumnAssertions = {};

export class RealColumn<
  TName extends string,
  TAssertionErrorMap extends Record<string, string> = RealColumnAssertions
> extends BaseColumn<number, number, TName, TAssertionErrorMap> {
  converter = realConverter();
}

type BlobColumnAssertions = {};

export class BlobColumn<
  TName extends string,
  TAssertionErrorMap extends Record<string, string> = BlobColumnAssertions
> extends BaseColumn<Uint8Array, Uint8Array, TName, TAssertionErrorMap> {
  converter = blobConverter();
}

type DateColumnAssertions = {};

export class DateColumn<
  TName extends string,
  TAssertionErrorMap extends Record<string, string> = DateColumnAssertions
> extends BaseColumn<string, Date, TName, TAssertionErrorMap> {
  converter = dateConverter();
}

export class IdColumn extends IntColumn<'id'> {
  constructor() {
    super('id');
  }
}
