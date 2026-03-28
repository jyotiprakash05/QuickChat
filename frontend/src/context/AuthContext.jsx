import { createContext, useContext, useState, useCallback } from 'react';
import { CURRENT_USER, MOCK_USERS } from '../data/mockData';
import { IS_DEMO_MODE } from '../utils/constants';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      if (IS_DEMO_MODE) {
        // Simulate login delay
        await new Promise((r) => setTimeout(r, 800));
        if (email && password) {
          setUser(CURRENT_USER);
          return true;
        }
        throw new Error('Please enter email and password');
      }
      // TODO: Real Cognito auth
      // const userPool = new CognitoUserPool({ UserPoolId: CONFIG.COGNITO_USER_POOL_ID, ClientId: CONFIG.COGNITO_CLIENT_ID });
      throw new Error('AWS Cognito not configured. Use demo mode.');
    } catch (err) {
      setError(err.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      if (IS_DEMO_MODE) {
        await new Promise((r) => setTimeout(r, 1000));
        if (name && email && password) {
          const newUser = {
            ...CURRENT_USER,
            displayName: name,
            email: email,
          };
          setUser(newUser);
          return true;
        }
        throw new Error('Please fill in all fields');
      }
      throw new Error('AWS Cognito not configured. Use demo mode.');
    } catch (err) {
      setError(err.message || 'Signup failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      setUser((prev) => ({ ...prev, ...updates }));
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout, updateProfile, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export default AuthContext;
