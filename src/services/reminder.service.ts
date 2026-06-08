import api from '@/lib/axios';

export interface ReminderRule {
  id: string;
  triggerType: string;
  hoursBefore: number;
  channelEmail: boolean;
  channelWhatsapp: boolean;
  channelPush: boolean;
  isActive: boolean;
}

export const reminderService = {
  list: async (): Promise<ReminderRule[]> => {
    const response = await api.get('/reminders');
    return response.data.data;
  },

  create: async (data: { triggerType: string; hoursBefore: number; channelEmail?: boolean; channelWhatsapp?: boolean }): Promise<ReminderRule> => {
    const response = await api.post('/reminders', data);
    return response.data.data;
  },

  toggle: async (ruleId: string, isActive: boolean): Promise<ReminderRule> => {
    const response = await api.patch(`/reminders/${ruleId}`, { isActive });
    return response.data.data;
  },

  delete: async (ruleId: string): Promise<void> => {
    await api.delete(`/reminders/${ruleId}`);
  },
};
