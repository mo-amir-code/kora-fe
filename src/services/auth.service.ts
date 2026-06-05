import api from '@/lib/axios';

export interface MeResponse {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
}

export interface AuthResponse {
  user: { id: string; email: string; fullName: string; avatarUrl: string | null };
  accessToken: string;
}

export const authService = {
  getMe: async (token?: string): Promise<MeResponse> => {
    const response = await api.get('/auth/me', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return response.data.data;
  },

  getGoogleAuthUrl: (): string => {
    return `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  },

  signin: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post('/auth/signin', data);
    return response.data.data;
  },

  signup: async (data: { email: string; password: string; fullName: string }): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', data);
    return response.data.data;
  },

  signupSendOtp: async (data: { email: string; password: string; fullName: string }): Promise<void> => {
    await api.post('/auth/signup/send-otp', data);
  },

  signupVerifyOtp: async (data: { email: string; otp: string }): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup/verify-otp', data);
    return response.data.data;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },

  resetPassword: async (data: { email: string; otp: string; newPassword: string }): Promise<void> => {
    await api.post('/auth/reset-password', data);
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const response = await api.post('/auth/refresh');
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};
