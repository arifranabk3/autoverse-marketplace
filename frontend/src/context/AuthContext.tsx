'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'buyer' | 'dealer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  location?: string;
  dealershipName?: string;
  unreadNotifications?: number;
  unreadMessages?: number;
}

export interface DemoAccount {
  label: string;
  role: UserRole;
  user: User;
  description: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    label: 'Verified Buyer / Collector',
    role: 'buyer',
    description: 'Alexander Pierce — VIP Exotic Car Collector with 5 saved exotics and active escrow deposits.',
    user: {
      id: 'usr_buyer_001',
      name: 'Alexander Pierce',
      email: 'alexander.pierce@autoverse.vip',
      role: 'buyer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      phone: '+1 (555) 392-1084',
      location: 'Beverly Hills, CA',
      unreadNotifications: 3,
      unreadMessages: 2,
    },
  },
  {
    label: 'Authorized Dealer Principal',
    role: 'dealer',
    description: 'Marcus Vance — Principal at Apex Prestige Motors with 14 active supercar allocations.',
    user: {
      id: 'usr_dealer_001',
      name: 'Marcus Vance',
      email: 'marcus@apexprestigemotors.com',
      role: 'dealer',
      dealershipName: 'Apex Prestige Automotives',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      phone: '+1 (555) 701-4492',
      location: 'Miami, FL',
      unreadNotifications: 5,
      unreadMessages: 4,
    },
  },
  {
    label: 'Super Admin / Platform Governance',
    role: 'admin',
    description: 'Elena Rostova — Chief Automotive Compliance & Platform Governance Officer.',
    user: {
      id: 'usr_admin_001',
      name: 'Elena Rostova',
      email: 'admin.elena@autoverse.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      phone: '+1 (555) 000-8821',
      location: 'New York, NY',
      unreadNotifications: 8,
      unreadMessages: 1,
    },
  },
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (roleOrEmail: UserRole | string, password?: string) => Promise<{ success: boolean; redirectUrl: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'autoverse_auth_user_v2';
const TOKEN_KEY = 'autoverse_auth_token_v2';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate session from localStorage on initial client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.role && parsed.id) {
          setUser(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored session:', e);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (roleOrEmail: UserRole | string, _password?: string): Promise<{ success: boolean; redirectUrl: string }> => {
    setIsLoading(true);
    try {
      // Find matching demo account or default by role/email
      let matched = DEMO_ACCOUNTS.find((a) => a.role === roleOrEmail || a.user.email.toLowerCase() === roleOrEmail.toLowerCase());
      if (!matched) {
        // Fallback default buyer
        matched = DEMO_ACCOUNTS[0];
      }

      const activeUser = { ...matched.user };
      setUser(activeUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeUser));
      // Store session token (mock or JWT representation)
      localStorage.setItem(TOKEN_KEY, `autoverse_session_${activeUser.role}_${activeUser.id}`);

      let redirectUrl = '/dashboard';
      if (activeUser.role === 'dealer') redirectUrl = '/dealer';
      if (activeUser.role === 'admin') redirectUrl = '/admin';

      return { success: true, redirectUrl };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TOKEN_KEY);
      // Clean legacy tokens if present
      localStorage.removeItem('auth_token');
    } catch (e) {
      console.warn('Error clearing session:', e);
    }
  };

  const switchRole = (newRole: UserRole) => {
    const matched = DEMO_ACCOUNTS.find((a) => a.role === newRole) || DEMO_ACCOUNTS[0];
    const updated = { ...matched.user };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(TOKEN_KEY, `autoverse_session_${updated.role}_${updated.id}`);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
