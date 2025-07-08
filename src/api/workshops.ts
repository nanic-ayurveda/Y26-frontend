import { api } from './index';

export interface Workshop {
  id: string;
  title: string;
  description?: string;
  type: 'WORKSHOP';
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  expectedParticipants?: number;
  venue?: string;
  venueId?: string;
  dateTime?: string;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  coordinatorId?: string;
  creator: {
    id: string;
    name: string;
    email: string;
  };
  coordinator?: {
    id: string;
    name: string;
    email: string;
  };
  budgets?: any[];
  budgetApprovals?: any[];
  expenses?: any[];
  _count?: {
    expenses: number;
  };
}

export interface CreateWorkshopRequest {
  title: string;
  description?: string;
  expectedParticipants?: number;
  venue?: string;
  dateTime?: string;
  coordinatorEmail?: string;
}

export interface UpdateWorkshopRequest {
  title?: string;
  description?: string;
  expectedParticipants?: number;
  venue?: string;
  dateTime?: string;
  coordinatorEmail?: string;
}

export const workshopsAPI = {
  getAll: async (): Promise<Workshop[]> => {
    const response = await api.get('/workshops');
    return response.data;
  },

  getById: async (id: string): Promise<Workshop> => {
    const response = await api.get(`/workshops/${id}`);
    return response.data;
  },

  create: async (data: CreateWorkshopRequest): Promise<Workshop> => {
    const response = await api.post('/workshops', data);
    return response.data;
  },

  update: async (id: string, data: UpdateWorkshopRequest): Promise<Workshop> => {
    const response = await api.put(`/workshops/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/workshops/${id}`);
  },

  approve: async (id: string, data: { status: 'APPROVED' | 'REJECTED'; remarks: string }) => {
    const response = await api.post(`/workshops/${id}/approve`, data);
    return response.data;
  }
};