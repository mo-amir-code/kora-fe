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
  expectedNext30Days?: {
    amount: number;
    invoiceCount: number;
  };
  avgCollectionDays?: {
    days: number;
  };
  actionRequired?: {
    overdueAmount: number;
    overdueCount: number;
  };
  collectionRate?: {
    percentage: number;
    collectedAmount: number;
    totalBilledAmount: number;
  };
}

export interface CreatePaymentEventPayload {
  dealId: string;
  invoiceId?: string;
  type: 'PAYMENT_RECEIVED' | 'PARTIAL_PAYMENT' | 'REFUND' | 'CHARGEBACK' | 'ADJUSTMENT';
  amount: number;
  method?: string;
  reference?: string;
  paidAt?: string;
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

  createPaymentEvent: async (payload: CreatePaymentEventPayload): Promise<any> => {
    const response = await api.post('/payment/events', payload);
    return response.data.data;
  },
};
