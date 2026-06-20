import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reminderService } from '@/services/reminder.service';
import toast from 'react-hot-toast';
import { getErrorMessage } from './useAuth';

export function useReminderRules() {
  return useQuery({
    queryKey: ['reminders'],
    queryFn: reminderService.list,
  });
}

export function useCreateReminder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reminderService.create,
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['reminders'] }); 
      toast.success("Reminder rule created");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useToggleReminder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ruleId, isActive }: { ruleId: string; isActive: boolean }) =>
      reminderService.toggle(ruleId, isActive),
    onSuccess: (_, variables) => { 
      queryClient.invalidateQueries({ queryKey: ['reminders'] }); 
      toast.success(`Reminder ${variables.isActive ? 'enabled' : 'disabled'}`);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteReminder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reminderService.delete,
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['reminders'] }); 
      toast.success("Reminder rule deleted");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
