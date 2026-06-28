import { useQuery } from '@tanstack/react-query';
import { earningsService, type EarningsCurrency } from '@/services/earnings.service';

export function useEarnings(month: string, currency: EarningsCurrency = 'INR') {
  return useQuery({
    queryKey: ['earnings', month, currency],
    queryFn: () => earningsService.getDashboard(month, currency),
  });
}
