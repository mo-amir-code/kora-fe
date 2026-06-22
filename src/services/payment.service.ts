import api from '@/lib/axios';

export interface PaymentItem {
  id: string;
  type: 'INVOICE' | 'PAYMENT_EVENT';
  brandName: string;
  brandLogo: string | null;
  dealTitle: string;
  amount: number;
  currency: string;
  dueDate: string | null;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  referenceId: string;
  sourceId: string;
}

export interface PaymentStats {
  received: number;
  pending: number;
  overdue: number;
  total: number;
}

export const paymentService = {
  getPayments: async (status: string = 'all'): Promise<PaymentItem[]> => {
    const response = await api.get(`/payment?status=${status}`);
    return response.data.data;
  },

  getStats: async (): Promise<PaymentStats> => {
    const response = await api.get('/payment/stats');
    return response.data.data;
  },
};
