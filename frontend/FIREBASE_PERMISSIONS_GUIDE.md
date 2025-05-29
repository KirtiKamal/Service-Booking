# Firebase Permissions Troubleshooting Guide

If you're encountering permission errors with your Firebase authentication or Firestore database, follow these steps to resolve the issues:

## Common Permission Errors

1. **"Missing or insufficient permissions"** - This means your security rules are preventing the requested operation.
2. **"PERMISSION_DENIED"** - The client doesn't have permission to access the requested resource.
3. **"FirebaseError: Firebase: Error (auth/...)"** - Various authentication errors.

## Step 1: Check Firebase Security Rules

### Firestore Rules

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on "Firestore Database" in the left sidebar
4. Click on the "Rules" tab
5. Make sure your rules allow the operations you're trying to perform
6. Click "Publish" after making changes

Basic Firestore rules for development (not for production):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access on users collection for authenticated users
    match /users/{userId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow access to other collections for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules

1. Go to the "Storage" section in Firebase Console
2. Click on the "Rules" tab
3. Update the rules and publish

Basic Storage rules for development:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Step 2: Check Firebase Configuration

1. Make sure your Firebase configuration in `firebase.js` is correct
2. Verify your `storageBucket` URL format is correct (should be `<project-id>.appspot.com`)
3. Check that you have enabled the authentication methods you're trying to use

## Step 3: Enable Authentication Methods

1. Go to "Authentication" in Firebase Console
2. Click on "Sign-in method"
3. Enable the authentication methods you need (Email/Password, Google, etc.)
4. For Google Auth, make sure your OAuth consent screen is configured properly

## Step 4: Check Console for Specific Error Messages

Look at your browser's developer console (F12) for specific error messages that can help identify the problem:

- `FirebaseError: Firebase: Error (auth/popup-blocked)`: Browser is blocking pop-ups
- `FirebaseError: Firebase: Error (auth/unauthorized-domain)`: Your domain isn't authorized
- `FirebaseError: Missing or insufficient permissions`: Firestore rules issue

## Step 5: Deploy Updated Rules

Use the Firebase CLI to deploy updated security rules:

```
firebase deploy --only firestore:rules,storage
```

## Step 6: Temporarily Disable Rules for Testing

For testing purposes only, you can temporarily set permissive rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**WARNING**: Never use these rules in production as they allow anyone to read and write to your database.

## Need More Help?

If you're still experiencing permission issues after trying these steps, check:

1. Firebase Emulator logs if you're using the local emulator
2. Firebase Authentication logs in Firebase Console
3. Firestore usage logs in Firebase Console

For detailed error debugging, add console logs around your Firebase operations and check the browser console for specific error codes and messages.
