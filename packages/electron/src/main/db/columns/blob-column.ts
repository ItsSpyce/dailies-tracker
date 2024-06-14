import { Column, ValidationState } from './column';

const BlobColumnAssertions = {};

export class BlobColumn<N extends string> extends Column<
  Uint8Array,
  N,
  typeof BlobColumnAssertions
> {
  get _columnType(): string {
    return 'BLOB';
  }

  _readValue(value: any): Uint8Array {
    return new Uint8Array(value);
  }

  _writeValue(value: Uint8Array): any {
    return value;
  }
  _validate(value: Uint8Array, state: ValidationState<N>) {
    if (!this._isNullable && value == null) {
      state.addError(this._name, 'Value cannot be null');
    }
  }
}
