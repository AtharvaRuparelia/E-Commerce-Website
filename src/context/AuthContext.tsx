import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { getCurrentLocalProfile, logoutUser } from '../services/authService';

interface AuthContextType {
  firebaseUser: { uid: string; email?: string } | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => void;
}

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  profile: null,
  loading: true,
  isAdmin: false,
  logout: async () => {},
  refreshProfile: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(() => getCurrentLocalProfile());
  const [loading, setLoading] = useState(false);

  const updateState = () => {
    const p = getCurrentLocalProfile();
    setProfile(p);
  };

  useEffect(() => {
    updateState();
    window.addEventListener('trustforge_auth_changed', updateState);
    window.addEventListener('storage', updateState);
    return () => {
      window.removeEventListener('trustforge_auth_changed', updateState);
      window.removeEventListener('storage', updateState);
    };
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setProfile(null);
  };

  const isAdmin = profile?.role === 'admin';
  const firebaseUser = profile ? { uid: profile.id, email: profile.email } : null;

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        profile,
        loading,
        isAdmin,
        logout: handleLogout,
        refreshProfile: updateState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
