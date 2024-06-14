import { snakeCase } from '../../utils/change-case';

export class ColumnValidationError extends Error {
  constructor(message: string, public path: string) {
    super(`${path}: ${message}`);
  }
}

interface StatefulMatcher<T> {
  (value: T): string | null;
}

export type InferColumnType<T> = T extends Column<infer T, any, any>
  ? T
  : never;
export type InferColumnErrorDefinitions<T> = T extends Column<any, any, infer E>
  ? E
  : never;
export type InferColumnName<T> = T extends Column<any, infer N, any>
  ? N
  : never;

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

export abstract class Column<
  T,
  N extends string,
  E extends Record<string, string>
> {
  _name: N;
  _columnName: string;
  _asserts: Partial<Record<keyof E, StatefulMatcher<T>>> = {};
  _isNullable: boolean = false;
  _isPrimaryKey: boolean = false;
  _isUnique: boolean = false;
  _isAutoIncrement: boolean = false;
  _default: T | (() => T) | null = null;

  abstract get _columnType(): string;

  constructor(name?: N) {
    if (name != null) {
      this._name = name;
      this._columnName = snakeCase(name);
    }
  }

  abstract _readValue(value: any): T;
  abstract _writeValue(value: T): any;
  abstract _validate(value: T, state: ValidationState<N>): void;

  nullable(): NullableColumn<this> {
    return new NullableColumn(this);
  }

  default(value: typeof this._default): this {
    this._default = value;
    return this;
  }

  parse(value: any, state: ValidationState<N>): T {
    const parsed = this._readValue(value);
    if (!(this instanceof NullableColumn) && parsed == null) {
      state.addError(this._name, 'Value cannot be null');
    }
    this._validate(parsed, state);
    if (state.hasErrors()) {
      throw state.errors[0];
    }
    return parsed;
  }

  protected _assert<K extends keyof E>(
    key: K,
    matcher: StatefulMatcher<T> | null,
    ...args: any[]
  ) {
    this._asserts[key] = (value) => {
      // if args is not empty, iterate through and pass values with regex of ${index}
      const message = matcher?.(value);
      if (message != null) {
        return message.replace(/\$(\d+)/g, (_, index) => args[index]);
      }
      return null;
    };
    return this;
  }
}

export class NullableColumn<
  TColumn extends Column<any, any, any>
> extends Column<
  InferColumnType<TColumn> | null,
  InferColumnName<TColumn>,
  InferColumnErrorDefinitions<TColumn>
> {
  get _columnType(): string {
    return this._column._columnType;
  }
  constructor(private _column: TColumn) {
    super(_column._name);
  }

  _readValue(value: any): InferColumnType<TColumn> {
    if (value == null) {
      return null;
    }
    return this._column._readValue(value);
  }

  _writeValue(value: InferColumnType<TColumn>) {
    if (value == null) {
      return null;
    }
    return this._column._writeValue(value);
  }

  _validate(value: any, state: ValidationState<any>): any {
    if (value == null) {
      return null;
    }
    return this._column._validate(value, state);
  }
}
