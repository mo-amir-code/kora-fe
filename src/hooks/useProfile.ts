import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService, UserMe, UserGeneralSettings, UserInvoiceSettings } from '@/services/profile.service';
import toast from 'react-hot-toast';
import { getErrorMessage } from './useAuth';

export function useProfile() {
  return useQuery<UserMe>({
    queryKey: ['profile'],
    queryFn: profileService.getMe,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateGeneralSettings() {
  const queryClient = useQueryClient();

  return useMutation<UserGeneralSettings, Error, UserGeneralSettings>({
    mutationFn: profileService.updateGeneralSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('General settings saved');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateInvoiceSettings() {
  const queryClient = useQueryClient();

  return useMutation<UserInvoiceSettings, Error, UserInvoiceSettings>({
    mutationFn: profileService.updateInvoiceSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Invoice settings saved');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
