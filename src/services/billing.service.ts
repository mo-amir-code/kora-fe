import api from '@/lib/axios';

export interface BillingPlanResponse {
  plan: "FREE" | "PRO";
  billingCycle: "MONTHLY" | "QUARTERLY" | "YEARLY" | null;
  planExpiresAt: string | null;
  status?: string | null;
  cancelAtPeriodEnd?: boolean;
  isPromo?: boolean;
}

export interface TransactionItem {
  id: string;
  amount: string;
  status: "Succeeded" | "Pending" | "Failed";
  date: string;
}

export const billingService = {
  getCurrentPlan: async (): Promise<BillingPlanResponse> => {
    const response = await api.get('/billing/current-plan');
    return response.data.data;
  },

  createCheckoutSession: async (billingCycle: "MONTHLY" | "QUARTERLY" | "YEARLY"): Promise<{ checkoutUrl: string; paymentId: string; sessionId?: string }> => {
    const response = await api.post('/billing/checkout', { billingCycle });
    return response.data.data;
  },

  changePlan: async (billingCycle: "MONTHLY" | "QUARTERLY" | "YEARLY"): Promise<any> => {
    const response = await api.post('/billing/change-plan', { billingCycle });
    return response.data.data;
  },

  cancelSubscription: async (): Promise<any> => {
    const response = await api.post('/billing/cancel');
    return response.data.data;
  },

  resumeSubscription: async (): Promise<any> => {
    const response = await api.post('/billing/resume');
    return response.data.data;
  },

  getTransactions: async (): Promise<TransactionItem[]> => {
    const response = await api.get('/transactions');
    return response.data.data;
  }
};
