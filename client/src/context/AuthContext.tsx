import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapFirebaseUser(firebaseUser: FirebaseUser, username?: string): User {
  return {
    id: firebaseUser.uid,
    username: username || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    email: firebaseUser.email || '',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Best-effort Firestore enrichment: read the profile to refine the username
  // and create the document when it is missing. NEVER throws or blocks auth —
  // every Firestore call is wrapped so a failure is swallowed and auth proceeds.
  const enrichFromFirestore = useCallback(async (firebaseUser: FirebaseUser) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid)).catch(() => null);
      if (userDoc && userDoc.exists()) {
        const username = userDoc.data()?.username;
        if (username) {
          setUser((prev) => (prev ? { ...prev, username } : mapFirebaseUser(firebaseUser, username)));
          return;
        }
      }
      // Profile missing (or unreadable) — try to create it best-effort.
      await setDoc(
        doc(db, 'users', firebaseUser.uid),
        {
          username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email: firebaseUser.email || '',
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      ).catch(() => {
        /* non-fatal: profile creation failed; auth already succeeded */
      });
    } catch {
      /* non-fatal: Firestore unavailable; auth already succeeded */
    }
  }, []);

  const checkAuth = useCallback(async () => {
    // Use onAuthStateChanged to listen for auth state changes.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // Firebase Auth is the source of truth — set the user immediately so
      // loading always clears and navigation is never blocked by Firestore.
      if (firebaseUser) {
        setUser(mapFirebaseUser(firebaseUser));
        void enrichFromFirestore(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
      unsubscribe();
    });
  }, [enrichFromFirestore]);

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    // Auth is the source of truth — set the user immediately so the caller can
    // navigate without waiting on (or depending on) Firestore.
    setUser(mapFirebaseUser(res.user));
    // Firestore is best-effort and must NOT block navigation. Fire it off and
    // swallow any errors.
    void enrichFromFirestore(res.user);
  };

  const signup = async (username: string, email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: username });
    // Set the user immediately so the UI can proceed; do not block on auth.
    setUser(mapFirebaseUser(res.user, username));
    // Firestore profile creation is best-effort and must NOT block successful
    // authentication or navigation. Fire it off and swallow any errors.
    setDoc(doc(db, 'users', res.user.uid), {
      username,
      email,
      createdAt: new Date().toISOString(),
    }).catch(() => {
      /* non-fatal: profile document creation failed; auth already succeeded */
    });
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}