import { match } from 'ts-pattern';
import { Column, ValidationState } from './column';
import { matchOnAssertion } from './utils';

const IntColumnAssertions = {
  equals: 'Value must be equal to $1',
  notEquals: 'Value must not be equal to $1',
  greaterThan: 'Value must be greater than $1',
  greaterThanOrEqual: 'Value must be greater than or equal to $1',
  lessThan: 'Value must be less than $1',
  lessThanOrEqual: 'Value must be less than or equal to $1',
};

export class IntColumn<N extends string> extends Column<
  number,
  N,
  typeof IntColumnAssertions
> {
  get _columnType() {
    return 'INTEGER';
  }

  _isPrimaryKey: boolean = false;

  _readValue(value: any): number {
    return Number(value);
  }
  _writeValue(value: number) {
    return value;
  }
  _validate(value: number, state: ValidationState<N>) {
    match(this._asserts)
      .with(
        { equals: true },
        matchOnAssertion(this._asserts.equals, value, state)
      )
      .with(
        { notEquals: true },
        matchOnAssertion(this._asserts.notEquals, value, state)
      )
      .with(
        { greaterThan: true },
        matchOnAssertion(this._asserts.greaterThan, value, state)
      )
      .with(
        { greaterThanOrEqual: true },
        matchOnAssertion(this._asserts.greaterThanOrEqual, value, state)
      )
      .with(
        { lessThan: true },
        matchOnAssertion(this._asserts.lessThan, value, state)
      )
      .with(
        { lessThanOrEqual: true },
        matchOnAssertion(this._asserts.lessThanOrEqual, value, state)
      );
  }

  equals(value: number): this {
    this._assert('equals', (v) =>
      v !== value ? IntColumnAssertions.equals : null
    );
    return this;
  }

  notEquals(value: number): this {
    this._assert('notEquals', (v) =>
      v === value ? IntColumnAssertions.notEquals : null
    );
    return this;
  }

  greaterThan(value: number): this {
    this._assert('greaterThan', (v) =>
      v <= value ? IntColumnAssertions.greaterThan : null
    );
    return this;
  }

  greaterThanOrEqual(value: number): this {
    this._assert('greaterThanOrEqual', (v) =>
      v < value ? IntColumnAssertions.greaterThanOrEqual : null
    );
    return this;
  }

  lessThan(value: number): this {
    this._assert('lessThan', (v) =>
      v >= value ? IntColumnAssertions.lessThan : null
    );
    return this;
  }

  lessThanOrEqual(value: number): this {
    this._assert('lessThanOrEqual', (v) =>
      v > value ? IntColumnAssertions.lessThanOrEqual : null
    );
    return this;
  }

  inRange(min: number, max: number): this {
    this.greaterThanOrEqual(min).lessThanOrEqual(max);
    return this;
  }

  positive(): this {
    this.greaterThan(0);
    return this;
  }

  negative(): this {
    this.lessThan(0);
    return this;
  }

  nonNegative(): this {
    this.greaterThanOrEqual(0);
    return this;
  }

  nonPositive(): this {
    this.lessThanOrEqual(0);
    return this;
  }

  nonZero(): this {
    this.notEquals(0);
    return this;
  }

  zero(): this {
    this.equals(0);
    return this;
  }

  primaryKey(): this {
    this._isPrimaryKey = true;
    return this;
  }
}

export class RealColumn<N extends string> extends IntColumn<N> {
  get _columnType() {
    return 'REAL';
  }
}
