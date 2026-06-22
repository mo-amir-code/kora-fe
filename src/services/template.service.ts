import api from "@/lib/axios";

export type MessageTemplateCategory = 
  | "OUTREACH"
  | "FOLLOW_UP"
  | "NEGOTIATION"
  | "CONTRACT"
  | "INVOICE"
  | "PAYMENT_REMINDER"
  | "THANK_YOU"
  | "CUSTOM";

export interface MessageTemplate {
  id: string;
  userId: string;
  category: MessageTemplateCategory;
  name: string;
  body: string;
  channels: string[];
  isSystem: boolean;
}

export interface CreateTemplateData {
  name: string;
  body: string;
  category: MessageTemplateCategory;
  channels: string[];
}

export const templateService = {
  list: async (category?: string): Promise<MessageTemplate[]> => {
    const response = await api.get("/message-templates", {
      params: { category }
    });
    return response.data.data;
  },

  create: async (data: CreateTemplateData): Promise<MessageTemplate> => {
    const response = await api.post("/message-templates", data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<CreateTemplateData>): Promise<MessageTemplate> => {
    const response = await api.patch(`/message-templates/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/message-templates/${id}`);
  },

  getById: async (id: string): Promise<MessageTemplate> => {
    const response = await api.get(`/message-templates/${id}`);
    return response.data.data;
  }
};
