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

// Admin is identified by email. Set VITE_ADMIN_EMAIL in your .env.local; if it
// is not configured, no account is treated as admin (the Admin page stays locked).
const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL ?? '').trim().toLowerCase();

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapFirebaseUser(firebaseUser: FirebaseUser, username?: string): User {
  const email = firebaseUser.email || '';
  return {
    id: firebaseUser.uid,
    username: username || firebaseUser.displayName || email.split('@')[0] || 'User',
    email,
    isAdmin: !!ADMIN_EMAIL && email.trim().toLowerCase() === ADMIN_EMAIL,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Best-effort Firestore enrichment: read the profile to refine the username
  // and create the document when it is genuinely missing. NEVER throws or
  // blocks auth — every Firestore call is wrapped so a failure is swallowed and
  // auth proceeds.
  //
  // CRITICAL: createdAt is written ONLY when the document is confirmed missing
  // (exists() === false after a successful read). We never overwrite createdAt
  // on a subsequent login — doing so would reset "Account Created" to the login
  // time. If the read itself fails, we bail without writing anything, so a
  // transient error can never clobber a real createdAt.
  const enrichFromFirestore = useCallback(async (firebaseUser: FirebaseUser) => {
    try {
      const ref = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(ref).catch(() => null);
      // Could not read the profile (network/permission error). Do NOT attempt to
      // create it — that risks overwriting a real createdAt with the login time.
      if (!userDoc) return;

      if (userDoc.exists()) {
        const username = userDoc.data()?.username;
        if (username) {
          // Normal case on every login: doc present with a username. No writes.
          setUser((prev) => (prev ? { ...prev, username } : mapFirebaseUser(firebaseUser, username)));
          return;
        }
        // Doc exists but username is missing — repair username/email only.
        // createdAt is left untouched (it already exists on this doc).
        await setDoc(
          ref,
          {
            username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            email: firebaseUser.email || '',
          },
          { merge: true }
        ).catch(() => {
          /* non-fatal: username repair failed; auth already succeeded */
        });
        return;
      }

      // Genuinely new profile (successful read, confirmed missing) — set
      // createdAt exactly once, here at first creation.
      await setDoc(
        ref,
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

  // Best-effort activity stamp (Last Login + Device/Browser) read by the Admin
  // User Activity page. Merge-only so it never overwrites the username/email/
  // createdAt captured at signup. Errors are swallowed — this must never block
  // or fail the authentication flow.
  const recordLogin = useCallback((uid: string) => {
    if (typeof navigator === 'undefined') return;
    setDoc(
      doc(db, 'users', uid),
      {
        lastLoginAt: new Date().toISOString(),
        lastUserAgent: navigator.userAgent,
      },
      { merge: true }
    ).catch(() => {
      /* non-fatal */
    });
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
    // Non-fatal activity stamp used by the Admin User Activity page. Never
    // blocks auth or navigation.
    void recordLogin(res.user.uid);
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
    // Non-fatal activity stamp used by the Admin User Activity page. Never
    // blocks auth or navigation.
    void recordLogin(res.user.uid);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAdmin: user?.isAdmin ?? false, loading, login, signup, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}