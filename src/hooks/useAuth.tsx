
import { useState, createContext, useContext, ReactNode } from 'react';

// Define the Auth context type
interface AuthContextType {
  user: { email: string; role?: string } | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{ email: string; role?: string } | null>(null);

  // Check local storage for existing session on mount
  useState(() => {
    const storedUser = localStorage.getItem('naijaHubAdminAuth');
    const isAuthenticated = storedUser === 'true';
    
    if (isAuthenticated) {
      // For demo purposes, set a default admin user
      setUser({ email: 'admin@naijahub.com', role: 'admin' });
    }
  });

  const signIn = async (email: string, password: string) => {
    // In a real app, this would call an API
    if (email === 'admin@naijahub.com' && password === 'password123') {
      const userData = { email, role: 'admin' };
      setUser(userData);
      localStorage.setItem('naijaHubAdminAuth', 'true');
      localStorage.setItem('naijaHubAuthTimestamp', new Date().getTime().toString());
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('naijaHubAdminAuth');
    localStorage.removeItem('naijaHubAuthTimestamp');
    localStorage.removeItem('loginAttempts');
    localStorage.removeItem('lastAttemptTime');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;
