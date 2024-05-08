import { useState, useEffect } from 'react';

export function useAsyncState<T>(
  getter?: () => Promise<T>
): [T | undefined, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (getter) {
      getter().then(setState);
    }
  }, [getter]);

  // @ts-ignore
  return [state, setState];
}
