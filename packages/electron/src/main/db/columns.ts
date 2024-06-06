import { match } from 'ts-pattern';
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
import { snakeCase } from 'change-case';

export class ColumnValidationError extends Error {
  constructor(message: string, public path: string) {
    super(message);
  }
}

interface StatefulMatcher<T> {
  (value: T): string | null;
}

const joinPaths = (...paths: string[]) => paths.join('.');

export class ValidationState<TPath extends string> {
  private _errors: ColumnValidationError[] = [];
  private _dirty = false;

  get errors() {
    return this._errors;
  }

  get dirty() {
    return this._dirty;
  }

  get path(): string {
    return this._path;
  }

  constructor(private readonly _path: TPath) {}

  addError(path: string, error: string): void {
    this._dirty = true;
    this._errors.push(
      new ColumnValidationError(error, joinPaths(this._path, path))
    );
  }

  hasErrors(): boolean {
    return this._errors.length > 0;
  }
}

export type InferSqlType<T> = T extends BaseColumn<infer S, any, any>
  ? S
  : never;
export type InferJsType<T> = T extends BaseColumn<any, infer T, any>
  ? T extends NullableColumn<any>
    ? T | null
    : T
  : never;
export type InferName<T> = T extends BaseColumn<any, any, infer N> ? N : never;
export type InferErrorDefinitions<T> = T extends BaseColumn<
  any,
  any,
  any,
  infer E
>
  ? E
  : never;

const baseAssertions = {
  isUnique: 'Value must be unique',
  notNullable: 'Value cannot be null',
};

export interface Column<TName extends string = string> {
  columnName: TName;
}

export abstract class BaseColumn<
  TIn = any,
  TOut = any,
  TName extends string = string,
  TAssertionErrorMap extends Record<string, string> = {}
> implements Column<TName>
{
  abstract converter: SqlToJsConverter<TIn, TOut>;
  private _transformer?: (value: TOut) => any;
  private _columnName: TName;
  private _assertions: Record<keyof TAssertionErrorMap, StatefulMatcher<TOut>> =
    Object.create(null);
  protected conditions: string[] = ['NOT NULL'];
  protected defaultValue?: TOut | ((instance: this) => TOut);

  get columnName(): TName {
    return this._columnName;
  }

  set columnName(value: TName) {
    this._columnName = snakeCase(value) as TName;
  }

  constructor(columnName?: TName) {
    if (columnName != null) {
      this.columnName = columnName;
    }
    this._addAssertion('notNullable', (value) =>
      value == null ? 'Value cannot be null' : null
    );
  }

  getConditions() {
    return this.conditions;
  }

  nullable(): NullableColumn<this> {
    return new NullableColumn(this);
  }

  unique(): this {
    this.conditions = [
      ...this.conditions.filter((c) => c !== 'NOT NULL'),
      'UNIQUE',
    ];
    return this;
  }

  primaryKey(): this {
    this.conditions = [
      ...this.conditions.filter((c) => c !== 'NOT NULL'),
      'PRIMARY KEY',
    ];
    return this;
  }

  default(value: TOut | ((instance: this) => TOut)): this {
    this.defaultValue = value;
    return this;
  }

  transform<TOut2>(
    transformer: (value: TOut) => TOut2 | void
  ): BaseColumn<TIn, TOut2, TName, TAssertionErrorMap> {
    const self = this as any as BaseColumn<
      TIn,
      TOut2,
      TName,
      TAssertionErrorMap
    >;
    self._transformer = transformer as any;
    return self;
  }

  validate(value: TOut, state: ValidationState<TName>): TIn;
  validate(value: TOut, state: ValidationState<TName>): TIn {
    for (const [assertion, matcher] of Object.entries(this._assertions)) {
      if (typeof matcher !== 'function') {
        continue;
      }
      match(assertion)
        .with('notNullable', () => {
          matcher(value) &&
            state.addError(this.columnName, baseAssertions.notNullable);
        })
        .otherwise(() => this._validate(value, state, assertion));
      if (state.hasErrors()) {
        throw state.errors[0];
      }
    }
    return this.converter.convertToSql(value);
  }

  protected abstract _validate(
    value: TOut,
    state: ValidationState<TName>,
    name: keyof TAssertionErrorMap
  ): void;

  protected _addAssertion(
    assertion: keyof TAssertionErrorMap,
    matcher: StatefulMatcher<TOut>
  ): void {
    this._assertions[assertion] = matcher;
  }

  protected _removeAssertion(assertion: keyof TAssertionErrorMap): void {
    delete this._assertions[assertion];
  }

  public toString = () => this._columnName;

  parse(value: TIn): TOut {
    const converted = this.converter.convertToJs(value);
    const transformed = this._transformer?.(converted) ?? converted;
    return transformed;
  }
}

export class NullableColumn<
  TColumn extends BaseColumn<any, any, any, any>
> extends BaseColumn<
  InferSqlType<TColumn> | null,
  InferJsType<TColumn> | null,
  InferName<TColumn>,
  InferErrorDefinitions<TColumn>
> {
  converter: SqlToJsConverter<InferSqlType<TColumn>, InferJsType<TColumn>>;
  constructor(private column: TColumn) {
    super(column.columnName);
    this.converter = nullableConverter(column.converter);
    this.conditions = this.conditions.filter((c) => c !== 'NOT NULL');
    this._removeAssertion('notNullable');
  }

  parse(value: InferSqlType<TColumn>): InferJsType<TColumn> | null {
    return this.column.parse(value);
  }

  _validate(
    value: InferJsType<TColumn> | null,
    state: ValidationState<InferName<TColumn>>
  ) {
    // TODO:
  }
}

type TextColumnAssertions = {};

export class TextColumn<
  TName extends string,
  TAssertionErrorMap extends Record<string, string> = TextColumnAssertions
> extends BaseColumn<string, string, TName, TAssertionErrorMap> {
  converter = textConverter();

  default(value: string): this {
    this.conditions.push(`DEFAULT '${value}'`);
    return this;
  }

  length(length: number): this {
    this._addAssertion('length', (value) =>
      value.length !== length
        ? 'Value must be exactly ${length} characters long'
        : null
    );
    return this;
  }

  minLength(length: number): this {
    this._addAssertion('minLength', (value) =>
      value.length < length
        ? `Value must be at least ${length} characters long`
        : null
    );
    return this;
  }

  maxLength(length: number): this {
    this._addAssertion('maxLength', (value) =>
      value.length > length
        ? `Value must be at most ${length} characters long`
        : null
    );
    return this;
  }

  matches(regex: RegExp): this {
    this._addAssertion('matches', (value) =>
      regex.test(value) ? null : 'Value does not match the pattern'
    );
    return this;
  }

  _validate(value: string, state: ValidationState<TName>) {}
}

type IntColumnAssertions = {};

export class IntColumn<
  TName extends string,
  TAssertionErrorMap extends Record<string, string> = IntColumnAssertions
> extends BaseColumn<number, number, TName, TAssertionErrorMap> {
  converter = intConverter();

  _validate(value: number, state: ValidationState<TName>) {
    if (value == null) {
      state.addError(this.columnName, 'Value cannot be null');
    }
  }
}

type BooleanColumnAssertions = {};

export class BooleanColumn<
  TName extends string,
  TAssertionErrorMap extends Record<string, string> = BooleanColumnAssertions
> extends BaseColumn<number, boolean, TName, TAssertionErrorMap> {
  converter = booleanConverter();

  _validate(value: boolean, state: ValidationState<TName>) {
    if (value == null) {
      state.addError(this.columnName, 'Value cannot be null');
    }
  }
}

type RealColumnAssertions = {};

export class RealColumn<
  TName extends string,
  TAssertionErrorMap extends Record<string, string> = RealColumnAssertions
> extends BaseColumn<number, number, TName, TAssertionErrorMap> {
  converter = realConverter();

  _validate(value: number, state: ValidationState<TName>) {
    if (value == null) {
      state.addError(this.columnName, 'Value cannot be null');
    }
  }
}

type BlobColumnAssertions = {};

export class BlobColumn<
  TName extends string,
  TAssertionErrorMap extends Record<string, string> = BlobColumnAssertions
> extends BaseColumn<Uint8Array, Uint8Array, TName, TAssertionErrorMap> {
  converter = blobConverter();

  _validate(value: Uint8Array, state: ValidationState<TName>) {
    if (value == null) {
      state.addError(this.columnName, 'Value cannot be null');
    }
  }
}

type DateColumnAssertions = {};

export class DateColumn<
  TName extends string,
  TAssertionErrorMap extends Record<string, string> = DateColumnAssertions
> extends BaseColumn<string, Date, TName, TAssertionErrorMap> {
  converter = dateConverter();

  defaultNow(): this {
    return this.default(() => new Date());
  }

  _validate(value: Date, state: ValidationState<TName>) {
    if (value == null) {
      state.addError(this.columnName, 'Value cannot be null');
    }
  }
}

/// Helper columns

export class IdColumn extends IntColumn<'id'> {
  constructor() {
    super('id');
    this.primaryKey();
  }
}

export class CreatedAtColumn extends DateColumn<'created_at'> {
  constructor() {
    super('created_at');
    this.defaultNow();
  }
}

export class UpdatedAtColumn extends DateColumn<'updated_at'> {
  constructor() {
    super('updated_at');
    this.defaultNow();
  }
}

export class DeletedAtColumn extends NullableColumn<DateColumn<'deleted_at'>> {
  constructor() {
    super(new DateColumn('deleted_at'));
  }
}
