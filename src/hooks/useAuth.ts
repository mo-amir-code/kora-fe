import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { authService, MeResponse } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth/auth';
import { AuthUser } from '@/stores/auth/types';

// Maps backend MeResponse to frontend AuthUser shape
export function mapToAuthUser(me: MeResponse): AuthUser {
  return {
    id: me.id,
    name: me.fullName,
    email: me.email,
    avatar: me.avatarUrl,
  };
}

// Mutation hook for OAuth callback flow
export function useOAuthCallback() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: async (token: string) => {
      const me = await authService.getMe(token);
      return { user: mapToAuthUser(me), token };
    },
    onSuccess: ({ user, token }) => {
      setAuth({ user, token });
    },
  });
}

// Hook to initiate Google OAuth
export function useGoogleAuth() {
  const handleGoogleAuth = () => {
    window.location.href = authService.getGoogleAuthUrl();
  };
  return { handleGoogleAuth };
}

// Extracts error message from Axios error responses
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? 'Something went wrong. Please try again.';
  }
  return 'Something went wrong. Please try again.';
}

// Mutation hook for email/password signin
export function useSignin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: authService.signin,
    onSuccess: (data) => {
      setAuth({ user: mapToAuthUser(data.user), token: data.token });
    },
  });
}

// Mutation hook for email/password signup
export function useSignup() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: authService.signup,
    onSuccess: (data) => {
      setAuth({ user: mapToAuthUser(data.user), token: data.token });
    },
  });
}

// Mutation hook for signup send OTP (step 1)
export function useSignupSendOtp() {
  return useMutation({
    mutationFn: authService.signupSendOtp,
  });
}

// Mutation hook for signup verify OTP (step 2)
export function useSignupVerifyOtp() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: authService.signupVerifyOtp,
    onSuccess: (data) => {
      setAuth({ user: mapToAuthUser(data.user), token: data.token });
    },
  });
}

// Mutation hook for forgot password (send OTP)
export function useForgotPassword() {
  return useMutation({
    mutationFn: authService.forgotPassword,
  });
}

// Mutation hook for reset password
export function useResetPassword() {
  return useMutation({
    mutationFn: authService.resetPassword,
  });
}
