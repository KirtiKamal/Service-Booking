# Firebase Authentication Troubleshooting Guide

## Resolving "Missing or Insufficient Permissions" Error

If you're seeing the "Missing or insufficient permissions" error when trying to use Firebase authentication or Firestore, follow these steps to fix the issue.

## Quick Fix Steps

1. **Deploy Firebase Security Rules**

   ```powershell
   npm run firebase:rules
   ```
   
   This will deploy the security rules from `firestore.rules` to your Firebase project.

2. **Check Firebase Configuration**

   Make sure your Firebase configuration in `src/services/firebase.js` is correct. In particular, check the storageBucket URL, which should be `your-project-id.appspot.com`.

3. **Run Firebase Diagnostics**

   ```powershell
   npm run firebase:diagnostics
   ```
   
   This tool will help diagnose any permission issues with your Firebase setup.

4. **Initialize Firebase (if needed)**

   If you're setting up the project for the first time:

   ```powershell
   npm run firebase:init
   ```

## Common Causes for Permission Issues

1. **Firestore Security Rules**
   - Default rules deny all access
   - Rules not properly deployed
   - Rules not allowing your specific operation

2. **Authentication Issues**
   - Authentication method not enabled in Firebase Console
   - Invalid credentials
   - User doesn't have permission for the operation

3. **Firebase Configuration**
   - Incorrect API keys
   - Wrong project ID
   - Misconfigured storageBucket URL

## Manual Steps to Resolve

1. **Login to Firebase**

   ```powershell
   npx firebase login
   ```

2. **Check Current Rules**

   ```powershell
   npx firebase firestore:rules get
   ```

3. **Deploy Rules Manually**

   ```powershell
   npx firebase deploy --only firestore:rules
   ```

## More Resources

1. Check `FIREBASE_PERMISSIONS_GUIDE.md` for detailed troubleshooting
2. Check `FIREBASE_AUTH_SETUP.md` for complete setup instructions

Remember to reload your app after fixing permission issues!

If you continue to experience problems, please refer to the Firebase documentation or reach out for support.
