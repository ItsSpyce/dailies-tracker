import { useCallback, useEffect, useState } from 'react';

type InternalResult<T extends (...args: any[]) => Promise<any>> = {
  value: Awaited<ReturnType<T>>;
  error: Error | null;
};

type InternalImmediate<T extends () => Promise<any>> = {
  value: Awaited<ReturnType<T>>;
  error: Error | null;
};

export function useInternal<T extends (...args: any[]) => Promise<any>>(
  internalFn: T
): [T, InternalResult<T>] {
  const [value, setValue] = useState<InternalResult<T>>({
    // @ts-ignore
    value: null,
    error: null,
  });

  // @ts-ignore
  const middleware: T = useCallback(
    async (...args: any[]) => {
      try {
        const value = await internalFn(...args);
        setValue({ value, error: null });
        return value;
      } catch (error) {
        if (error instanceof Error) {
          // @ts-ignore
          setValue({ error, value: undefined });
        }
      }
      return [middleware, value!];
    },
    [internalFn]
  );
  return [middleware, value];
}

export function useImmediateInternal<T extends () => Promise<any>>(
  internalFn: T
): InternalImmediate<T> {
  const [value, setValue] = useState<InternalImmediate<T>>({
    value: null!,
    error: null,
  });

  useEffect(() => {
    internalFn()
      .then((v) => {
        setValue({ value: v, error: null });
      })
      .catch((error) => {
        setValue({ value: null!, error });
      });
  }, [internalFn]);

  return value;
}
