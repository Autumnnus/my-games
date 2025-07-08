import { User } from '@/types/users';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as userService from '../services/userSerivce';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUser(id),
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: userService.createUser,
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ id, user }: { id: number; user: Partial<User> }) =>
      userService.updateUser(id, user),
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: userService.deleteUser,
  });
};
