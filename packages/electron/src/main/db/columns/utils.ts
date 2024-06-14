import { ValidationState } from './column';

export function matchOnAssertion<A extends (value: any) => string | null>(
  assertion: A,
  value: any,
  state: ValidationState<string>
) {
  return () => {
    const error = assertion(value);
    if (error != null) {
      state.addError(error, 'value');
    }
  };
}
