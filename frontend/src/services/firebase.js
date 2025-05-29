// Firebase configuration
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  sendEmailVerification
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

// Your Firebase configuration
// Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAGPv7nISA4wg_UXXo0qhUSNDjMAItU1tQ",
  authDomain: "service-booking-cf253.firebaseapp.com",
  projectId: "service-booking-cf253",
  storageBucket: "service-booking-cf253.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "484902136126",
  appId: "1:484902136126:web:60fcf94c52a28e85e6e46f",
  measurementId: "G-51GB4TGDVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Helper function to handle Firebase errors
const handleFirebaseError = (error) => {
  console.error('Firebase error:', error);
  
  // Common Firebase errors with user-friendly messages
  const errorMessages = {
    'permission-denied': 'You don\'t have permission to access this resource. Please check your Firebase security rules.',
    'unauthenticated': 'Authentication required. Please log in and try again.',
    'not-found': 'The requested resource was not found.',
    'already-exists': 'The document already exists.',
    'resource-exhausted': 'You\'ve reached your quota limit or the server is under heavy load.',
    'failed-precondition': 'The operation failed because a condition was not met.',
    'aborted': 'The operation was aborted.',
    'out-of-range': 'The operation was attempted past the valid range.',
    'unimplemented': 'The operation is not implemented or not supported.',
    'internal': 'An internal error occurred.',
    'unavailable': 'The service is currently unavailable.',
    'data-loss': 'Unrecoverable data loss or corruption.',
    'cancelled': 'The operation was cancelled.'
  };
  
  if (error.code && error.code.includes('firestore/')) {
    const errorCode = error.code.split('/')[1];
    return errorMessages[errorCode] || error.message;
  }
  
  return error.message;
};

// Auth functions
export const registerUser = async (email, password, displayName = '') => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // If displayName provided, update profile
    if (displayName) {
      await updateProfile(user, { displayName });
    }
    
    try {
      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName || '',
        createdAt: new Date().toISOString(),
        role: 'user'
      });
    } catch (firestoreError) {
      console.error('Firestore error:', firestoreError);
      // Continue with the process even if Firestore fails
      // We can still authenticate the user
    }
    
    try {
      // Send email verification
      await sendEmailVerification(user);
    } catch (emailError) {
      console.error('Email verification error:', emailError);
      // Continue even if email verification fails
    }
    
    return { user, error: null };
  } catch (error) {
    console.error('Registration error:', error);
    return { user: null, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    try {
      // Check if this is a new user
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      // If new user, create document in Firestore
      if (!userDoc.exists()) {
        try {
          await setDoc(doc(db, 'users', result.user.uid), {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName || '',
            photoURL: result.user.photoURL || '',
            createdAt: new Date().toISOString(),
            role: 'user'
          });
        } catch (firestoreWriteError) {
          console.error('Error creating user document:', firestoreWriteError);
          // Continue authentication even if we can't write to Firestore
        }
      }
    } catch (firestoreReadError) {
      console.error('Error checking if user exists:', firestoreReadError);
      // Continue authentication even if we can't read from Firestore
    }
    
    return { user: result.user, error: null };
  } catch (error) {
    console.error('Google sign-in error:', error);
    let errorMsg = error.message;
    
    // Provide more user-friendly error messages
    if (error.code === 'auth/popup-blocked') {
      errorMsg = 'The sign-in popup was blocked by your browser. Please allow popups for this website.';
    } else if (error.code === 'auth/cancelled-popup-request') {
      errorMsg = 'Sign-in was cancelled. Please try again.';
    } else if (error.code === 'auth/popup-closed-by-user') {
      errorMsg = 'Sign-in popup was closed before completion. Please try again.';
    }
    
    return { user: null, error: errorMsg };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      return { error: 'No authenticated user found' };
    }
    
    // Update authentication profile
    if (userData.displayName || userData.photoURL) {
      await updateProfile(user, {
        displayName: userData.displayName || user.displayName,
        photoURL: userData.photoURL || user.photoURL
      });
    }
    
    // Update user document in Firestore
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: new Date().toISOString()
    });
    
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const updateUserEmail = async (newEmail) => {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      return { error: 'No authenticated user found' };
    }
    
    await updateEmail(user, newEmail);
    
    // Update email in Firestore
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      email: newEmail,
      updatedAt: new Date().toISOString()
    });
    
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const updateUserPassword = async (newPassword) => {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      return { error: 'No authenticated user found' };
    }
    
    await updatePassword(user, newPassword);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const getUserData = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return { userData: userDoc.data(), error: null };
    } else {
      return { userData: null, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    return { userData: null, error: handleFirebaseError(error) };
  }
};

// Get current authenticated user data from Firestore
export const getCurrentUserData = async () => {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      return { userData: null, error: 'No authenticated user found' };
    }
    
    const { userData, error } = await getUserData(user.uid);
    return { userData, error };
  } catch (error) {
    return { userData: null, error: error.message };
  }
};

export { auth, db };
