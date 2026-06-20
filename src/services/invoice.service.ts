import api from '@/lib/axios';

export interface InvoiceLineItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'VIEWED' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE' | 'VOID' | 'CANCELLED';

export interface Invoice {
  id: string;
  userId: string;
  dealId: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  subtotal: number;
  gstRate?: number;
  gstAmount?: number;
  total: number;
  issuedDate: string;
  dueDate: string;
  paidAt?: string;
  pdfUrl?: string;
  viewedAt?: string;
  notes?: string;
  lineItems: InvoiceLineItem[];
  deal: {
    id: string;
    title: string;
    brand: {
      id: string;
      name: string;
      logoUrl?: string;
    };
  };
}

export interface CreateInvoiceData {
  dealId: string;
  invoiceNumber?: string;
  status?: string;
  subtotal: number;
  gstRate?: number;
  gstAmount?: number;
  total: number;
  issuedDate: string;
  dueDate: string;
  notes?: string;
  lineItems: Omit<InvoiceLineItem, 'id'>[];
}

export const invoiceService = {
  list: async (): Promise<Invoice[]> => {
    const response = await api.get('/invoice');
    return response.data.data;
  },

  getById: async (id: string): Promise<Invoice> => {
    const response = await api.get(`/invoice/${id}`);
    return response.data.data;
  },

  create: async (data: CreateInvoiceData): Promise<Invoice> => {
    const response = await api.post('/invoice', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<CreateInvoiceData>): Promise<Invoice> => {
    const response = await api.patch(`/invoice/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/invoice/${id}`);
  },
};
