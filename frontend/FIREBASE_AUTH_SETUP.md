# Firebase Authentication Setup

This project uses Firebase Authentication for login and signup functionality. Follow these steps to complete the setup:

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup steps to create a new Firebase project
3. Once your project is created, click "Continue"

## 2. Add Firebase to Your Web App

1. In the Firebase console, click on the web icon (</>) to add a web app to your project
2. Register your app with a nickname (e.g., "service-booking-app")
3. Click "Register app"
4. Copy the Firebase configuration object

## 3. Configure Firebase in the Project

1. Open `src/services/firebase.js`
2. Replace the placeholder Firebase config with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 4. Enable Email/Password Authentication

1. In the Firebase console, navigate to "Authentication" from the left sidebar
2. Click "Sign-in method" tab
3. Click on "Email/Password"
4. Toggle the "Enable" switch to enable Email/Password authentication
5. Click "Save"

## 5. Test the Authentication Flow

1. Start the application with `npm start`
2. Navigate to `/signup` to create a new account
3. Try logging in with the created account at `/login`
4. Upon successful authentication, you should be redirected to the Dashboard

## Authentication Features

- **Protected Routes**: Unauthenticated users cannot access the dashboard or service pages
- **Login/Signup Forms**: Complete forms with validation
- **Responsive Design**: Works on mobile and desktop
- **Persistent Authentication**: Stays logged in across page refreshes

## File Structure

- `src/services/firebase.js`: Firebase configuration and auth functions
- `src/contexts/AuthContext.js`: React context for managing authentication state
- `src/components/PrivateRoute.js`: Component for protecting routes
- `src/pages/Login.js`: Login form component
- `src/pages/Signup.js`: Signup form component

## Additional Customization

You can further customize the authentication by:

1. Adding additional sign-in methods (Google, Facebook, etc.)
2. Implementing password reset functionality
3. Adding user profile management
4. Setting up email verification
