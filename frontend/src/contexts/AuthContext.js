import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, getCurrentUser, getCurrentUserData } from '../services/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Get additional user data from Firestore
          const { userData, error } = await getCurrentUserData();
          
          if (error) {
            console.error('Error fetching user data:', error);
            setAuthError(error);
          } else {
            setUserData(userData);
            setAuthError(null);
          }
        } catch (error) {
          console.error('Error in auth state change handler:', error);
          setAuthError('Failed to load user profile data');
        }
      } else {
        setUserData(null);
        setAuthError(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Reset error state
  const clearAuthError = () => {
    setAuthError(null);
  };

  const value = {
    currentUser,
    userData,
    loading,
    authError,
    clearAuthError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
