import api from '@/lib/axios';

export interface UserInvoiceSettings {
  id: string;
  userId: string;
  legalName?: string;
  upiId?: string;
  accountNo?: string;
  ifsc?: string;
  bankName?: string;
  panNumber?: string;
  gstNumber?: string;
  address?: string;
  email?: string;
  phone?: string;
}

export interface UserMe {
  id: string;
  email: string;
  fullName: string;
  handle?: string;
  avatarUrl?: string;
  whatsappNumber?: string;
  timezone: string;
  plan: string;
  onboardingDone: boolean;
  createdAt: string;
  invoiceSettings?: UserInvoiceSettings;
}

export const profileService = {
  getMe: async (): Promise<UserMe> => {
    const response = await api.get('/user/me');
    return response.data.data;
  },

  updateInvoiceSettings: async (data: Partial<Omit<UserInvoiceSettings, 'id' | 'userId'>>): Promise<UserInvoiceSettings> => {
    const response = await api.patch('/user/settings/invoice', data);
    return response.data.data;
  },
};
