import api from '@/lib/axios';

// ─── TYPES ──────────────────────────────────────────────────────────────────────

export interface Brand {
  id: string;
  name: string;
  category: string;
  logoUrl: string | null;
  website: string | null;
  gstin: string | null;
  notes: string[];
  totalDeals: number;
  totalEarned: string;
  activeDeals: number;
  totalValue: number;
  deals?: any[];
  createdAt: string;
  contacts: BrandContact[];
  _count?: { deals: number };
}

export interface BrandContact {
  id: string;
  brandId: string;
  name: string;
  role: string | null;
  email: string | null;
  whatsapp: string | null;
  isPrimary: boolean;
}

export interface CreateBrandData {
  name: string;
  category: string;
  logoUrl?: string | null;
  website?: string | null;
  gstin?: string | null;
  notes?: string[];
}

export interface CreateContactData {
  name: string;
  role?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  isPrimary?: boolean;
}

export interface UploadResult {
  url: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
}

// ─── BRAND SERVICE ──────────────────────────────────────────────────────────────

export const brandService = {
  list: async (): Promise<Brand[]> => {
    const response = await api.get('/brands');
    return response.data.data;
  },

  getById: async (brandId: string): Promise<Brand> => {
    const response = await api.get(`/brands/${brandId}`);
    return response.data.data;
  },

  update: async (brandId: string, data: Partial<CreateBrandData>): Promise<Brand> => {
    const response = await api.patch(`/brands/${brandId}`, data);
    return response.data.data;
  },

  create: async (data: CreateBrandData): Promise<Brand> => {
    const response = await api.post('/brands', data);
    return response.data.data;
  },

  createContact: async (brandId: string, data: CreateContactData): Promise<BrandContact> => {
    const response = await api.post(`/brands/${brandId}/contacts`, data);
    return response.data.data;
  },

  updateContact: async (brandId: string, contactId: string, data: Partial<CreateContactData>): Promise<BrandContact> => {
    const response = await api.patch(`/brands/${brandId}/contacts/${contactId}`, data);
    return response.data.data;
  },

  deleteContact: async (brandId: string, contactId: string): Promise<void> => {
    await api.delete(`/brands/${brandId}/contacts/${contactId}`);
  },

  uploadLogo: async (file: File): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'doc-id': 'brand',
      },
    });

    return response.data.data;
  },

  deleteLogo: async (url: string): Promise<void> => {
    void url;
  },

  delete: async (brandId: string): Promise<void> => {
    await api.delete(`/brands/${brandId}`);
  },
};
