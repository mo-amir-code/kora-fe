import { useQuery } from '@tanstack/react-query';
import { earningsService, type EarningsCurrency, type EarningsDealFilter } from '@/services/earnings.service';

export function useEarnings(month: string, currency: EarningsCurrency = 'INR', filter: EarningsDealFilter = 'expected') {
  return useQuery({
    queryKey: ['earnings', month, currency, filter],
    queryFn: () => earningsService.getDashboard(month, currency, filter),
  });
}
