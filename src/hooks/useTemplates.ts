import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { templateService, CreateTemplateData } from "@/services/template.service";
import { toast } from "react-hot-toast";

export function useTemplates(category?: string) {
  return useQuery({
    queryKey: ["templates", category],
    queryFn: () => templateService.list(category),
  });
}

export function useCreateTemplate() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateTemplateData) => templateService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Template created successfully");
    },
    onError: () => {
      toast.error("Failed to create template");
    }
  });
}

export function useUpdateTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateTemplateData> }) =>
      templateService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Template updated successfully");
    },
    onError: () => {
      toast.error("Failed to update template");
    },
  });
}

export function useDeleteTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => templateService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Template deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete template");
    },
  });
}
