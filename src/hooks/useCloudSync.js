import { useState, useEffect, useRef } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

function readLocal(key, fallback) {
  try {
    const item = window.localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// Drop-in replacement for useLocalStorage that also syncs to Firestore.
// Reads from localStorage immediately (no flicker), then merges from Firestore
// once the user is authenticated. All writes go to both stores.
export function useCloudSync(key, initialValue) {
  const { user } = useAuth();
  const [value, setValue] = useState(() => readLocal(key, initialValue));
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!user || loadedRef.current) return;
    loadedRef.current = true;
    getDoc(doc(db, 'users', user.uid, 'data', key)).then(snap => {
      if (snap.exists()) {
        const remote = snap.data().value;
        setValue(remote);
        writeLocal(key, remote);
      }
    }).catch(console.error);
  }, [user, key]);

  const set = (val) => {
    setValue(prev => {
      const next = val instanceof Function ? val(prev) : val;
      writeLocal(key, next);
      if (user) {
        setDoc(doc(db, 'users', user.uid, 'data', key), { value: next })
          .catch(console.error);
      }
      return next;
    });
  };

  return [value, set];
}
