import { User } from '@/types/users';

export interface AuthBaseData {
  email: string;
  password: string;
}

export type AuthLoginData = AuthBaseData;

export type AuthForgotPasswordData = Pick<AuthBaseData, 'email'>;

export type AuthResetPasswordData = Pick<AuthBaseData, 'password'>;

export interface AuthSignupData extends AuthBaseData {
  name: string;
}

export type TokenData = {
  email: string;
  id: string;
  name: string;
  isVerified: boolean;
  role: User['role'];
  access_token: string;
};
