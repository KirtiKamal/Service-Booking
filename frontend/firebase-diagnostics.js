// Firebase Permissions Diagnostic Tool
// This script tests various Firebase operations to diagnose permission issues

const { initializeApp } = require('firebase/app');
const {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} = require('firebase/auth');
const {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs
} = require('firebase/firestore');
const readline = require('readline');

// Read Firebase config from environment or prompt user
const getFirebaseConfig = async () => {
  // Try to read from firebase.js
  try {
    const fs = require('fs');
    const path = require('path');
    const configPath = path.join(__dirname, 'src', 'services', 'firebase.js');
    
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, 'utf8');
      const configMatch = content.match(/const firebaseConfig = ({[\s\S]*?});/);
      
      if (configMatch && configMatch[1]) {
        try {
          // WARNING: This is a simple extraction for diagnostic purposes only
          // Not for production use as it uses eval
          const configStr = configMatch[1].replace(/(\w+):/g, '"$1":');
          return eval(`(${configStr})`);
        } catch (e) {
          console.error('Error parsing Firebase config:', e);
        }
      }
    }
  } catch (e) {
    console.error('Error reading Firebase config:', e);
  }
  
  // If config extraction failed, prompt user
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log('Please enter your Firebase configuration:');
  const apiKey = await new Promise(resolve => rl.question('API Key: ', resolve));
  const authDomain = await new Promise(resolve => rl.question('Auth Domain: ', resolve));
  const projectId = await new Promise(resolve => rl.question('Project ID: ', resolve));
  const storageBucket = await new Promise(resolve => rl.question('Storage Bucket: ', resolve));
  
  rl.close();
  
  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket
  };
};

// Test Firebase Authentication
const testAuth = async (auth) => {
  console.log('\n🔍 TESTING FIREBASE AUTHENTICATION');
  console.log('-----------------------------');
  
  try {
    // Check if already signed in
    const currentUser = auth.currentUser;
    console.log('✓ Auth initialized successfully');
    
    if (currentUser) {
      console.log(`✓ Already signed in as: ${currentUser.email}`);
      return true;
    } else {
      console.log('✓ No user currently signed in');
      return false;
    }
  } catch (error) {
    console.error('✗ Auth test failed:', error);
    return false;
  }
};

// Test Firestore Database
const testFirestore = async (db, auth) => {
  console.log('\n🔍 TESTING FIRESTORE DATABASE');
  console.log('---------------------------');
  
  if (!auth.currentUser) {
    console.log('✗ Not authenticated. Skipping Firestore tests.');
    return;
  }
  
  try {
    // Test reading user document
    const userRef = doc(db, 'users', auth.currentUser.uid);
    console.log('Attempting to read user document...');
    
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        console.log('✓ Successfully read user document');
        console.log('Document data:', userDoc.data());
      } else {
        console.log('! User document does not exist');
        
        // Test writing user document
        console.log('Attempting to create user document...');
        try {
          await setDoc(userRef, {
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            displayName: auth.currentUser.displayName || '',
            testField: 'Created by diagnostic tool',
            createdAt: new Date().toISOString()
          });
          console.log('✓ Successfully created user document');
        } catch (writeError) {
          console.error('✗ Failed to create user document:', writeError);
          console.log('This indicates a permission issue with writing to Firestore.');
          console.log('Check your security rules and make sure they allow writes.');
        }
      }
    } catch (readError) {
      console.error('✗ Failed to read user document:', readError);
      console.log('This indicates a permission issue with reading from Firestore.');
      console.log('Check your security rules and make sure they allow reads.');
    }
    
  } catch (error) {
    console.error('✗ Firestore test failed:', error);
  }
};

// Main function
const main = async () => {
  console.log('Firebase Permissions Diagnostic Tool');
  console.log('==================================');
  
  try {
    // Get Firebase config
    const firebaseConfig = await getFirebaseConfig();
    console.log('Firebase Configuration loaded');
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log('✓ Firebase initialized successfully');
    
    // Initialize Auth and Firestore
    const auth = getAuth(app);
    const db = getFirestore(app);
    
    // Test Authentication
    const isAuthenticated = await testAuth(auth);
    
    if (!isAuthenticated) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      console.log('\nUser Authentication Required');
      const email = await new Promise(resolve => rl.question('Email: ', resolve));
      const password = await new Promise(resolve => rl.question('Password: ', resolve));
      
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('✓ Successfully signed in as:', userCredential.user.email);
        rl.close();
      } catch (error) {
        console.error('✗ Failed to sign in:', error);
        console.log('Please check your email and password.');
        rl.close();
        process.exit(1);
      }
    }
    
    // Test Firestore
    await testFirestore(db, auth);
    
    console.log('\nDiagnostic tests completed.');
    console.log('See FIREBASE_PERMISSIONS_GUIDE.md for more information on resolving any issues.');
    
  } catch (error) {
    console.error('✗ Diagnostic tool failed:', error);
  }
};

main();
