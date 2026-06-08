import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reminderService } from '@/services/reminder.service';

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
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['reminders'] }); },
  });
}

export function useToggleReminder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ruleId, isActive }: { ruleId: string; isActive: boolean }) =>
      reminderService.toggle(ruleId, isActive),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['reminders'] }); },
  });
}

export function useDeleteReminder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reminderService.delete,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['reminders'] }); },
  });
}
