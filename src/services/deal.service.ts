import api from '@/lib/axios';

export interface Deal {
  id: string;
  brandId: string;
  contactId: string | null;
  title: string;
  stage: string;
  amount: string | null;
  amountPaid?: string | number | null;
  paymentStatus?: string;
  currency: string;
  paymentTerms: string | null;
  paymentDueDate: string | null;
  platforms: string[];
  contractUrl: string | null;
  exclusivityEnds: string | null;
  notes: string | null;
  createdAt: string;
  brand: { id: string; name: string; logoUrl: string | null; gstin?: string | null; contacts?: any[] };
  contact: { id: string; name: string; email?: string | null } | null;
  deliverables: Deliverable[];
  activities?: DealActivity[];
}

export interface DealActivity {
  id: string;
  type: string;
  body: string | null;
  createdAt: string;
}

export interface Deliverable {
  id: string;
  type: string;
  quantity: number;
  platform: string | null;
  dueDate: string | null;
  isCompleted: boolean;
  notes: string | null;
}

export interface CreateDealData {
  brandId: string;
  contactId?: string | null;
  title: string;
  stage?: string;
  amount?: number | null;
  currency?: string;
  paymentTerms?: string | null;
  paymentDueDate?: string | null;
  platforms?: string[];
  contractUrl?: string | null;
  notes?: string | null;
  deliverables?: {
    type: string;
    quantity?: number;
    platform?: string | null;
    dueDate?: string | null;
  }[];
}

export const dealService = {
  list: async (stage?: string): Promise<Deal[]> => {
    const params = stage && stage !== 'all' ? `?stage=${stage}` : '';
    const response = await api.get(`/deals${params}`);
    return response.data.data;
  },

  getById: async (dealId: string): Promise<Deal> => {
    const response = await api.get(`/deals/${dealId}`);
    return response.data.data;
  },

  create: async (data: CreateDealData): Promise<Deal> => {
    const response = await api.post('/deals', data);
    return response.data.data;
  },

  update: async (dealId: string, data: Partial<CreateDealData>): Promise<Deal> => {
    const response = await api.patch(`/deals/${dealId}`, data);
    return response.data.data;
  },

  delete: async (dealId: string): Promise<void> => {
    await api.delete(`/deals/${dealId}`);
  },

  updateDeliverables: async (dealId: string, updates: { id: string; isCompleted: boolean }[]): Promise<Deal> => {
    const response = await api.patch(`/deals/${dealId}/deliverables`, updates);
    return response.data.data;
  },

  addActivity: async (dealId: string, data: { type: string; body: string }): Promise<Deal> => {
    const response = await api.post(`/deals/${dealId}/activities`, data);
    return response.data.data;
  },
};
