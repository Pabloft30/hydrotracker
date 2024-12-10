import { User } from '../types/user';

export const getUser = (username: string): User | null => {
  const user = localStorage.getItem(username);
  return user ? JSON.parse(user) : null;
};

export const saveUser = (user: User): void => {
  localStorage.setItem(user.username, JSON.stringify(user));
};

export const updateUser = (username: string, updates: Partial<User>): void => {
  const user = getUser(username);
  if (user) {
    const updatedUser = { ...user, ...updates };
    saveUser(updatedUser);
  }
};