import { create } from 'zustand';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  User,
  AuthError
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
}

const handleAuthError = (error: AuthError) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed';
    case 'auth/weak-password':
      return 'Password is too weak';
    case 'auth/popup-closed-by-user':
      return 'Sign in was cancelled';
    default:
      return error.message;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      set({ error: handleAuthError(error as AuthError) });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email, password) => {
    try {
      set({ loading: true, error: null });
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      set({ error: handleAuthError(error as AuthError) });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (error) {
      if ((error as AuthError).code !== 'auth/popup-closed-by-user') {
        set({ error: handleAuthError(error as AuthError) });
      }
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await firebaseSignOut(auth);
      set({ user: null });
    } catch (error) {
      set({ error: handleAuthError(error as AuthError) });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (email) => {
    try {
      set({ loading: true, error: null });
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      set({ error: handleAuthError(error as AuthError) });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
}));