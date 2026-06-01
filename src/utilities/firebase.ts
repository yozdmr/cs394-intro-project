import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';

const firebaseConfig = {

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
