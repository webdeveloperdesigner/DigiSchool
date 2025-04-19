// src/services/firebase/authService.js

import { auth, db } from '../../screens/firebase'; // Ensure the path is correct
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID', // Get this from Firebase Console
});

export const registerWithEmail = async (name, email, password, role) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    let uniqueId = '';

    // Generate SID or TID
    if (role === 'student') {
      uniqueId = `year${new Date().getFullYear()}${Math.random().toString(36).substr(2, 10)}`;
    } else if (role === 'teacher') {
      uniqueId = `year${new Date().getFullYear()}${Math.random().toString(36).substr(2, 10)}`;
    }

    // Add to Firestore
    const userRef = await addDoc(collection(db, 'users'), {
      name,
      email,
      uniqueId,
      role,
      createdAt: new Date(),
    });

    return { user, uniqueId };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async () => {
  await signOut(auth);
};
