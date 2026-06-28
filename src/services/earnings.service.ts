import api from '@/lib/axios';

export type EarningsCurrency = 'INR' | 'USD';
export type EarningsDealStatus = 'PAID' | 'PENDING' | 'OVERDUE' | 'DELIVERED';
export type EarningsDealFilter = 'expected' | 'paid' | 'created' | 'overdue' | 'all';

export interface EarningsDashboard {
  period: string;
  currency: EarningsCurrency;
  filter: EarningsDealFilter;
  exchangeRate: number;
  exchangeRateSource: 'frankfurter' | 'env';
  metrics: {
    earned: number;
    earnedChangePercentage: number;
    pending: number;
    pendingInvoiceCount: number;
    overdue: number;
    averageDealValue: number;
    dealCount: number;
  };
  breakdown: {
    total: number;
    items: Array<{ status: EarningsDealStatus; amount: number; percentage: number }>;
  };
  trend: Array<{ month: string; monthKey: string; paid: number; pending: number }>;
  recentDeals: Array<{
    id: string;
    brandName: string;
    brandLogo: string | null;
    dealTitle: string;
    value: number;
    remaining: number;
    currency: EarningsCurrency;
    platforms: string[];
    status: EarningsDealStatus;
    paidDate: string | null;
  }>;
  yearly: {
    year: number;
    yearToDate: number;
    previousYearToDate: number;
    changePercentage: number;
  };
}

export const earningsService = {
  getDashboard: async (
    month: string,
    currency: EarningsCurrency = 'INR',
  ): Promise<EarningsDashboard> => {
    const response = await api.get('/earnings', { params: { month, currency } });
    return response.data.data;
  },
};
