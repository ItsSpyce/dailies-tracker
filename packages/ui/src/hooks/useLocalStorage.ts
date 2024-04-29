import React, { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  const _setStoredValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    try {
      const toStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(toStore);
      localStorage.setItem(key, JSON.stringify(toStore));
    } catch (err) {
      console.error(err);
    }
  };

  return [storedValue, _setStoredValue];
}
