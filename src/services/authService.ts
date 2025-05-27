import {
  AuthBaseData,
  AuthForgotPasswordData,
  AuthResetPasswordData,
  AuthSignupData,
  TokenData,
} from '@/types/auth';
import apiClient from './apiClient';

const baseUrl = '/auth';

export const login = async (params: AuthBaseData): Promise<TokenData> => {
  const { data } = await apiClient.post(`${baseUrl}/login`, params);

  return data.data;
};

export const forgotPassword = async (params: AuthForgotPasswordData): Promise<void> => {
  const { data } = await apiClient.post(`${baseUrl}/forgotpassword`, params);

  return data.data;
};

export const resetPassword = async (
  params: AuthResetPasswordData & { resetPasswordToken: string }
): Promise<void> => {
  const { data } = await apiClient.put(
    `${baseUrl}/resetPassword?resetPasswordToken=${params.resetPasswordToken}`,
    params
  );

  return data.data;
};

export const signup = async (params: AuthSignupData): Promise<void> => {
  const { data } = await apiClient.post(`${baseUrl}/register`, params);

  return data.data;
};
