import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { brandService, CreateBrandData, CreateContactData } from '@/services/brand.service';
import toast from 'react-hot-toast';
import { getErrorMessage } from './useAuth';

export function useBrandsList() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: brandService.list,
  });
}

export function useBrandDetail(brandId: string) {
  return useQuery({
    queryKey: ['brands', brandId],
    queryFn: () => brandService.getById(brandId),
    enabled: !!brandId,
  });
}

export function useCreateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brandService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast.success("Brand created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateBrand(brandId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateBrandData>) => brandService.update(brandId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands', brandId] });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast.success("Brand updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useCreateBrandContact(brandId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContactData) => brandService.createContact(brandId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands', brandId] });
      toast.success("Contact added successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateBrandContact(brandId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contactId, data }: { contactId: string; data: Partial<CreateContactData> }) =>
      brandService.updateContact(brandId, contactId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands', brandId] });
      toast.success("Contact updated");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteBrandContact(brandId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contactId: string) => brandService.deleteContact(brandId, contactId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands', brandId] });
      toast.success("Contact removed");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUploadBrandLogo() {
  return useMutation({
    mutationFn: brandService.uploadLogo,
  });
}

export function useDeleteBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brandService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast.success("Brand deleted");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
