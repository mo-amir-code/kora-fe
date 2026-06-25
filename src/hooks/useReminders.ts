import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export interface ReminderRule {
  id: string;
  userId: string;
  name: string | null;
  triggerType: string;
  offsetValue: number;
  offsetUnit: string;
  nextFollowUps: string[];
  messageTemplate: string | null;
  channelEmail: boolean;
  channelWhatsapp: boolean;
  channelPush: boolean;
  isActive: boolean;
  createdAt: string;
}

export const useRemindersList = () => {
  return useQuery({
    queryKey: ["reminder-rules"],
    queryFn: async () => {
      const res = await api.get("/reminder");
      return res.data.data as ReminderRule[];
    },
  });
};

export const useReminderRules = useRemindersList;

export const useCreateReminder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<ReminderRule>) => {
      const res = await api.post("/reminder", data);
      return res.data.data as ReminderRule;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminder-rules"] });
      toast.success("Reminder rule created successfully");
    },
    onError: () => {
      toast.error("Failed to create reminder rule");
    },
  });
};

export const useToggleReminder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ruleId, isActive }: { ruleId: string; isActive: boolean }) => {
      const res = await api.patch(`/reminder/${ruleId}`, { isActive });
      return res.data.data as ReminderRule;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminder-rules"] });
    },
    onError: () => {
      toast.error("Failed to update reminder status");
    },
  });
};

export const useDeleteReminder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ruleId: string) => {
      await api.delete(`/reminder/${ruleId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminder-rules"] });
      toast.success("Reminder rule deleted");
    },
    onError: () => {
      toast.error("Failed to delete reminder rule");
    },
  });
};

export const useUpdateReminder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ruleId, data }: { ruleId: string; data: Partial<ReminderRule> }) => {
      const res = await api.put(`/reminder/${ruleId}`, data);
      return res.data.data as ReminderRule;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminder-rules"] });
      toast.success("Reminder rule updated successfully");
    },
    onError: () => {
      toast.error("Failed to update reminder rule");
    },
  });
};
