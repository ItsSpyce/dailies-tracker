import { Column, ValidationState } from './column';

const DateColumnAssertions = {};

export class DateColumn<N extends string> extends Column<
  Date,
  N,
  typeof DateColumnAssertions
> {
  get _columnType(): string {
    return 'DATETIME';
  }

  _readValue(value: any): Date {
    return new Date(value);
  }

  _writeValue(value: Date): any {
    return value.toISOString();
  }

  _validate(value: Date, state: ValidationState<N>) {}

  defaultNow(): this {
    return this.default(() => new Date());
  }
}
