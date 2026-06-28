import api from '@/lib/axios';

export interface UserGeneralSettings {
  id?: string;
  userId?: string;
  timezone?: string;
  baseCurrency?: string;
}

export interface UserInvoiceSettings {
  id?: string;
  userId?: string;
  invoicePrefix?: string;
  nextInvoiceNum?: number;
  gstin?: string;
  upiId?: string;
  bankIfsc?: string;
  bankAccount?: string;
  logoUrl?: string;
  footerText?: string;
  // Aliases for legacy invoice page views
  legalName?: string;
  accountNo?: string;
  ifsc?: string;
}

export interface UserMe {
  id: string;
  email: string;
  fullName: string;
  handle?: string;
  avatarUrl?: string;
  whatsappNumber?: string;
  plan: string;
  onboardingDone: boolean;
  createdAt: string;
  settings?: UserGeneralSettings;
  invoiceSettings?: UserInvoiceSettings;
}

export const profileService = {
  getMe: async (): Promise<UserMe> => {
    const response = await api.get('/user/me');
    return response.data.data;
  },

  updateProfile: async (data: { fullName?: string; handle?: string; whatsappNumber?: string; avatarUrl?: string }) => {
    const response = await api.patch('/user/me', data);
    return response.data.data;
  },

  updateGeneralSettings: async (data: UserGeneralSettings): Promise<UserGeneralSettings> => {
    const response = await api.patch('/user/settings/general', data);
    return response.data.data;
  },

  updateInvoiceSettings: async (data: UserInvoiceSettings): Promise<UserInvoiceSettings> => {
    const response = await api.patch('/user/settings/invoice', data);
    return response.data.data;
  },
};
