import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyD5P6wx89BnButu2HWiR_m13lHz5O2U3eE",
  authDomain: "sample-project-8cb2c.firebaseapp.com",
  databaseURL: "https://sample-project-8cb2c-default-rtdb.firebaseio.com",
  projectId: "sample-project-8cb2c",
  storageBucket: "sample-project-8cb2c.firebasestorage.app",
  messagingSenderId: "656904410478",
  appId: "1:656904410478:web:930e4158cd9dba15db9d7f"
};

const firebase = initializeApp(firebaseConfig);
export const database = getDatabase(firebase);

export const useDataQuery = (path: string): [unknown, boolean, Error | undefined] => {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    return onValue(
      ref(database, path),
      (snapshot) => { setData(snapshot.val()); setLoading(false); },
      (error) => { setError(error); setLoading(false); }
    );
  }, [path]);

  return [data, loading, error];
};
