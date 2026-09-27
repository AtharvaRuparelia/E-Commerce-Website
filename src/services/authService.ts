import { UserProfile, UserRole } from '../types';

const AUTH_USER_KEY = 'bhavna_auth_session_v2';
const REGISTERED_USERS_KEY = 'bhavna_registered_users_v2';

export interface RegisteredAccount {
  id: string;
  name: string;
  email: string;
  pass: string;
  role: UserRole;
  phone?: string;
  createdAt: number;
}

// Pre-seeded default valid accounts for testing
const INITIAL_ACCOUNTS: RegisteredAccount[] = [
  {
    id: 'usr-customer-01',
    name: 'Atharva Ruparelia',
    email: 'customer@bhavnapooja.com',
    pass: 'Customer@123',
    role: 'customer',
    phone: '9876543210',
    createdAt: Date.now() - 3600000 * 24
  },
  {
    id: 'usr-admin-01',
    name: 'Bhavna Shop Admin',
    email: 'admin@bhavnapooja.com',
    pass: 'Admin@123',
    role: 'admin',
    phone: '9876543211',
    createdAt: Date.now() - 3600000 * 48
  }
];

export function getRegisteredAccounts(): RegisteredAccount[] {
  try {
    const data = localStorage.getItem(REGISTERED_USERS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('LocalStorage registered users error:', e);
  }
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(INITIAL_ACCOUNTS));
  return INITIAL_ACCOUNTS;
}

export function saveRegisteredAccounts(accounts: RegisteredAccount[]): void {
  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Save registered users error:', e);
  }
}

export const registerUser = async (
  name: string,
  email: string,
  pass: string,
  role: UserRole = 'customer',
  rollNumber?: string,
  phone?: string
): Promise<UserProfile> => {
  const cleanEmail = email.trim().toLowerCase();
  const accounts = getRegisteredAccounts();

  const existing = accounts.find((a) => a.email.toLowerCase() === cleanEmail);
  if (existing) {
    throw new Error('An account with this email address already exists. Please sign in instead.');
  }

  if (pass.length < 4) {
    throw new Error('Password must be at least 4 characters long.');
  }

  const newAcc: RegisteredAccount = {
    id: `usr-${Date.now()}`,
    name: name.trim() || 'Valued Customer',
    email: cleanEmail,
    pass: pass.trim(),
    role: role || 'customer',
    phone: phone?.trim() || '9876543210',
    createdAt: Date.now()
  };

  saveRegisteredAccounts([...accounts, newAcc]);

  const profile: UserProfile = {
    id: newAcc.id,
    name: newAcc.name,
    email: newAcc.email,
    role: newAcc.role,
    phone: newAcc.phone,
    createdAt: newAcc.createdAt
  };

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event('trustforge_auth_changed'));
  return profile;
};

export const loginUser = async (email: string, pass: string): Promise<UserProfile> => {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = pass.trim();

  const accounts = getRegisteredAccounts();
  const match = accounts.find(
    (a) => a.email.toLowerCase() === cleanEmail && a.pass === cleanPass
  );

  if (!match) {
    throw new Error('Invalid email or password. Please check your credentials or register a new account.');
  }

  const profile: UserProfile = {
    id: match.id,
    name: match.name,
    email: match.email,
    role: match.role,
    phone: match.phone,
    createdAt: match.createdAt
  };

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event('trustforge_auth_changed'));
  return profile;
};

export const logoutUser = async (): Promise<void> => {
  localStorage.removeItem(AUTH_USER_KEY);
  window.dispatchEvent(new Event('trustforge_auth_changed'));
};

export const getCurrentLocalProfile = (): UserProfile | null => {
  try {
    const data = localStorage.getItem(AUTH_USER_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Local auth error:', e);
  }
  return null;
};
