import { useQuery } from '@tanstack/react-query';
import { paymentService } from '@/services/payment.service';

export function usePayments(status: string = 'all') {
  return useQuery({
    queryKey: ['payments', status],
    queryFn: () => paymentService.getPayments(status),
  });
}

export function usePaymentStats() {
  return useQuery({
    queryKey: ['payments', 'stats'],
    queryFn: () => paymentService.getStats(),
  });
}
