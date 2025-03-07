import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as authService from "../services/authService";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["login"] }),
  });
};
export const useForgotPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["forgotPassword"] }),
  });
};
export const useResetPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["resetPassword"] }),
  });
};
export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["signup"] }),
  });
};
