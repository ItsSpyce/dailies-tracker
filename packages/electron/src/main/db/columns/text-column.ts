import { match } from 'ts-pattern';
import { Column, ValidationState } from './column';
import { matchOnAssertion } from './utils';

const TextColumnAssertions = {
  length: 'Value must be exactly $1 characters long',
  minLength: 'Value must be at least $1 characters long',
  maxLength: 'Value must be at most $1 characters long',
  matches: 'Value does not match the pattern',
  startsWith: 'Value must start with $1',
  endsWith: 'Value must end with $1',
  contains: 'Value must contain $1',
  notContains: 'Value must not contain $1',
  email: 'Value must be a valid email address',
  url: 'Value must be a valid URL',
  uuid: 'Value must be a valid UUID',
  alpha: 'Value must contain only alphabetic characters',
  alphaNumeric: 'Value must contain only alphanumeric characters',
  numeric: 'Value must contain only numeric characters',
  ascii: 'Value must contain only ASCII characters',
  base64: 'Value must be a valid Base64 string',
  oneOf: 'Value must be one of $1',
};

export class TextColumn<N extends string> extends Column<
  string,
  N,
  typeof TextColumnAssertions
> {
  get _columnType() {
    return 'TEXT';
  }

  _readValue(value: any): string {
    return value;
  }

  _writeValue(value: string): any {
    return value;
  }

  _validate(value: string, state: ValidationState<N>) {
    match(this._asserts)
      .with(
        { length: true },
        matchOnAssertion(this._asserts.length, value, state)
      )
      .with(
        { minLength: true },
        matchOnAssertion(this._asserts.minLength, value, state)
      )
      .with(
        { maxLength: true },
        matchOnAssertion(this._asserts.maxLength, value, state)
      )
      .with(
        { matches: true },
        matchOnAssertion(this._asserts.matches, value, state)
      )
      .with(
        { startsWith: true },
        matchOnAssertion(this._asserts.startsWith, value, state)
      )
      .with(
        { endsWith: true },
        matchOnAssertion(this._asserts.endsWith, value, state)
      )
      .with(
        { contains: true },
        matchOnAssertion(this._asserts.contains, value, state)
      )
      .with(
        { notContains: true },
        matchOnAssertion(this._asserts.notContains, value, state)
      )
      .with(
        { email: true },
        matchOnAssertion(this._asserts.email, value, state)
      )
      .with({ url: true }, matchOnAssertion(this._asserts.url, value, state))
      .with({ uuid: true }, matchOnAssertion(this._asserts.uuid, value, state))
      .with(
        { alpha: true },
        matchOnAssertion(this._asserts.alpha, value, state)
      )
      .with(
        { alphaNumeric: true },
        matchOnAssertion(this._asserts.alphaNumeric, value, state)
      )
      .with(
        { numeric: true },
        matchOnAssertion(this._asserts.numeric, value, state)
      )
      .with(
        { ascii: true },
        matchOnAssertion(this._asserts.ascii, value, state)
      )
      .with(
        { base64: true },
        matchOnAssertion(this._asserts.base64, value, state)
      )
      .with(
        { oneOf: true },
        matchOnAssertion(this._asserts.oneOf, value, state)
      );
  }

  unique(): this {
    this._isUnique = true;
    return this;
  }

  length(length: number): this {
    return this._assert(
      'length',
      (value) => (value.length !== length ? TextColumnAssertions.length : null),
      length
    );
  }

  minLength(length: number): this {
    return this._assert(
      'minLength',
      (value) =>
        value.length < length ? TextColumnAssertions.minLength : null,
      length
    );
  }

  maxLength(length: number): this {
    return this._assert(
      'maxLength',
      (value) =>
        value.length > length ? TextColumnAssertions.maxLength : null,
      length
    );
  }

  matches(regex: RegExp): this {
    return this._assert('matches', (value) =>
      regex.test(value) ? null : TextColumnAssertions.matches
    );
  }

  startsWith(prefix: string): this {
    return this._assert(
      'startsWith',
      (value) =>
        value.startsWith(prefix) ? null : TextColumnAssertions.startsWith,
      prefix
    );
  }

  endsWith(suffix: string): this {
    return this._assert(
      'endsWith',
      (value) =>
        value.endsWith(suffix) ? null : TextColumnAssertions.endsWith,
      suffix
    );
  }

  contains(substring: string): this {
    return this._assert(
      'contains',
      (value) =>
        value.includes(substring) ? null : TextColumnAssertions.contains,
      substring
    );
  }

  notContains(substring: string): this {
    return this._assert(
      'notContains',
      (value) =>
        !value.includes(substring) ? null : TextColumnAssertions.notContains,
      substring
    );
  }

  email(): this {
    return this._assert('email', (value) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        ? null
        : TextColumnAssertions.email
    );
  }

  url(): this {
    return this._assert('url', (value) =>
      /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value)
        ? null
        : TextColumnAssertions.url
    );
  }

  uuid(): this {
    return this._assert('uuid', (value) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        value
      )
        ? null
        : TextColumnAssertions.uuid
    );
  }

  alpha(): this {
    return this._assert('alpha', (value) =>
      /^[a-zA-Z]+$/.test(value) ? null : TextColumnAssertions.alpha
    );
  }

  alphaNumeric(): this {
    return this._assert('alphaNumeric', (value) =>
      /^[a-zA-Z0-9]+$/.test(value) ? null : TextColumnAssertions.alphaNumeric
    );
  }

  numeric(): this {
    return this._assert('numeric', (value) =>
      /^[0-9]+$/.test(value) ? null : TextColumnAssertions.numeric
    );
  }

  ascii(): this {
    return this._assert('ascii', (value) =>
      /^[\x00-\x7F]+$/.test(value) ? null : TextColumnAssertions.ascii
    );
  }

  base64(): this {
    return this._assert('base64', (value) =>
      /^[a-zA-Z0-9+/]*={0,2}$/.test(value) ? null : TextColumnAssertions.base64
    );
  }

  oneOf(values: string[]): this {
    return this._assert('oneOf', (value) =>
      values.includes(value) ? null : TextColumnAssertions.oneOf
    );
  }
}
