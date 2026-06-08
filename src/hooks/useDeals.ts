import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dealService, CreateDealData } from '@/services/deal.service';

export function useDealsList(stage?: string) {
  return useQuery({
    queryKey: ['deals', stage],
    queryFn: () => dealService.list(stage),
  });
}

export function useDealDetail(dealId: string) {
  return useQuery({
    queryKey: ['deals', 'detail', dealId],
    queryFn: () => dealService.getById(dealId),
    enabled: !!dealId,
  });
}

export function useCreateDeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dealService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
    },
  });
}

export function useUpdateDeal(dealId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateDealData>) => dealService.update(dealId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
    },
  });
}

export function useDeleteDeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dealService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
    },
  });
}

export function useUpdateDeliverables(dealId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: { id: string; isCompleted: boolean }[]) =>
      dealService.updateDeliverables(dealId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals', 'detail', dealId] });
    },
  });
}

export function useAddDealActivity(dealId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { type: string; body: string }) =>
      dealService.addActivity(dealId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals', 'detail', dealId] });
    },
  });
}
