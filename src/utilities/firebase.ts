import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, type User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
export const database = getDatabase(firebase);
const auth = getAuth(firebase);

export const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
export const signOut = () => firebaseSignOut(auth);

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialLoading: boolean;
}

export const useAuthState = (): AuthState => {
  const [user, setUser] = useState(auth.currentUser);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, (user) => {
    flushSync(() => {
      setUser(user);
      setIsInitialLoading(false);
    });
  }), []);

  return { user, isAuthenticated: !!user, isInitialLoading };
};

export const saveData = (path: string, value: unknown) => set(ref(database, path), value);

export const useAdminStatus = (uid: string | undefined): boolean => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!uid) { setIsAdmin(false); return; }
    return onValue(ref(database, `admins/${uid}`), (snapshot) => {
      setIsAdmin(snapshot.val() === true);
    });
  }, [uid]);

  return isAdmin;
};

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
