import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface User {
  uid: string;
  username: string;
  email: string;
  displayName: string;
  avatar: string;
  totalBets: number;
  winRate: number;
  favoriteSports: string[];
  isOnline: boolean;
  createdAt: any;
  lastActive: any;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, username: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, username: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user profile in Firestore
      const userData: User = {
        uid: firebaseUser.uid,
        username,
        email,
        displayName,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        totalBets: 0,
        winRate: 0,
        favoriteSports: [],
        isOnline: true,
        createdAt: serverTimestamp(),
        lastActive: serverTimestamp(),
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        setUser(userDoc.data() as User);
      } else {
        // User exists in Firebase Auth but not in Firestore
        // Create a basic user document
        const userData: User = {
          uid: firebaseUser.uid,
          username: firebaseUser.email?.split('@')[0] || 'user',
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`,
          totalBets: 0,
          winRate: 0,
          favoriteSports: [],
          isOnline: true,
          createdAt: serverTimestamp(),
          lastActive: serverTimestamp(),
        };
        
        await setDoc(doc(db, 'users', firebaseUser.uid), userData);
        setUser(userData);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, ...updates };
      await setDoc(doc(db, 'users', user.uid), updatedUser);
      setUser(updatedUser);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const value: UserContextType = {
    user,
    loading,
    signUp,
    signIn,
    signOut: signOutUser,
    updateUserProfile,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 