import { User } from "../models/userModel";

// Mock DB (devs usan esto en lugar de tu DB real)
const mockUsers: User[] = [];

export async function createUser(data: Omit<User, 'id'>): Promise<User> {
  const newUser: User = { id: Date.now().toString(), ...data };
  mockUsers.push(newUser);
  return newUser;
}

export async function getUserById(id: string): Promise<User> {
  const user = mockUsers.find(u => u.id === id);
  if (!user) throw new Error('Usuario no encontrado');
  return user;
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
  const index = mockUsers.findIndex(u => u.id === id);
  if (index === -1) throw new Error('Usuario no encontrado');
  mockUsers[index] = { ...mockUsers[index], ...data };
  return mockUsers[index];
}

export async function deleteUser(id: string): Promise<void> {
  const index = mockUsers.findIndex(u => u.id === id);
  if (index === -1) throw new Error('Usuario no encontrado');
  mockUsers.splice(index, 1);
}