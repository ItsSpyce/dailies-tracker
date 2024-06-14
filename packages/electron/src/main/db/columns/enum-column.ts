import { Column, ValidationState } from './column';

const EnumColumnAssertions = {};

export class EnumColumn<
  T extends Record<string | symbol, string | number>,
  N extends string
> extends Column<T, N, typeof EnumColumnAssertions> {
  get _columnType(): string {
    if (typeof this._enumType[0] === 'string') {
      return 'TEXT';
    }
    return 'INTEGER';
  }

  constructor(name: N, readonly _enumType: T) {
    super(name);
  }

  _readValue(value: any): T {
    return value;
  }

  _writeValue(value: T): any {
    return value;
  }

  _validate(value: T, state: ValidationState<N>) {}
}
