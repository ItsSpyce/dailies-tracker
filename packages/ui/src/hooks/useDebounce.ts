import { useEffect, useState } from 'react';

const DEFAULT_DEBOUNCE_WAIT = 500;

export type UseDebounceHook<T, F> = [
  lastResult: T,
  callback: F,
  clearResult: () => void
];

export function useDebounce<
  T = any,
  F extends (...args: any[]) => T = (...args: any[]) => T
>(callback: F, ms: number = DEFAULT_DEBOUNCE_WAIT): UseDebounceHook<T, F> {
  if (typeof callback !== 'function') {
    throw new Error('Callback not a function');
  }
  const [debouncedValue, setDebouncedValue] = useState<T>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const hydroCallback = (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      const result = callback(...args);
      if (result instanceof Promise) {
        result.then((value) => {
          setDebouncedValue(value);
          setTimeoutId(undefined);
        });
      } else {
        setDebouncedValue(result);
        setTimeoutId(undefined);
      }
    }, ms);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return [
    debouncedValue!,
    hydroCallback as F,
    () => setDebouncedValue(undefined),
  ];
}
