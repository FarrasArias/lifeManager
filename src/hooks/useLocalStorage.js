import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = (val) => {
    try {
      const next = val instanceof Function ? val(value) : val;
      setValue(next);
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch (e) {
      console.error('localStorage write failed:', e);
    }
  };

  return [value, set];
}
