import { User } from '@/types/users';
import { apiClient } from './apiClient';

export const getUsers = async (): Promise<User[]> => {
  const { data } = await apiClient().get('/users');

  return data.data;
};

export const getUser = async (id: number): Promise<User> => {
  const { data } = await apiClient().get(`/users/${id}`);

  return data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const { data } = await apiClient().post('/users', user);

  return data;
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const { data } = await apiClient().put(`/users/${id}`, user);

  return data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await apiClient().delete(`/users/${id}`);
};
