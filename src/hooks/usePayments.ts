import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentService, CreatePaymentEventPayload } from '@/services/payment.service';

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

export function useCreatePaymentEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePaymentEventPayload) => paymentService.createPaymentEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['earnings'] });
    },
  });
}
