import React, {
  ReactNode,
  useEffect,
  useState,
  useContext,
  createContext,
} from 'react';
import {app} from '../index';
import {
  getAuth,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  Auth,
} from 'firebase/auth';

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface AuthContextModel {
  auth: Auth;
  user: User | null;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  signOff: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextModel>(
  {} as AuthContextModel
);

export function useAuth(): AuthContextModel {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  function signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email);
  }

  function signOff(): Promise<void> {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const values = {
    signUp,
    user,
    signIn,
    resetPassword,
    signOff,
    auth,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
