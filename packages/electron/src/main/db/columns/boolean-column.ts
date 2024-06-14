import { Column, ValidationState } from './column';

const BooleanColumnAssertions = {
  isTrue: 'Value must be true',
  isFalse: 'Value must be false',
};

export class BooleanColumn<N extends string> extends Column<
  boolean,
  N,
  typeof BooleanColumnAssertions
> {
  get _columnType(): string {
    return 'BOOLEAN';
  }

  _readValue(value: any): boolean {
    return Boolean(value);
  }

  _writeValue(value: boolean): any {
    return value;
  }

  _validate(value: boolean, state: ValidationState<N>): boolean {
    if (!this._isNullable && value == null) {
      state.addError(this._name, 'Value cannot be null');
    }
    return value;
  }

  true(): this {
    return this._assert('isTrue', (value) =>
      value ? BooleanColumnAssertions.isTrue : null
    );
  }

  false(): this {
    return this._assert('isFalse', (value) =>
      !value ? BooleanColumnAssertions.isFalse : null
    );
  }
}
