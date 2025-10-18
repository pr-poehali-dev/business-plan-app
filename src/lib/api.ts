const API_ENDPOINTS = {
  auth: 'https://functions.poehali.dev/29cd92e4-24fc-4384-9a5b-bd068479cbd5',
  businessPlans: 'https://functions.poehali.dev/b9d2701d-7f94-4213-8555-0b9926900a1d'
};

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface BusinessPlan {
  id: number;
  title: string;
  category?: string;
  description?: string;
  investment?: string;
  payback?: string;
  content?: any;
  created_at?: string;
}

export const api = {
  auth: {
    register: async (name: string, email: string, password: string): Promise<{ success: boolean; user: User }> => {
      const response = await fetch(API_ENDPOINTS.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', name, email, password })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Ошибка регистрации');
      }
      
      return response.json();
    },
    
    login: async (email: string, password: string): Promise<{ success: boolean; user: User }> => {
      const response = await fetch(API_ENDPOINTS.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Ошибка входа');
      }
      
      return response.json();
    }
  },
  
  businessPlans: {
    getAll: async (userId: number): Promise<{ plans: BusinessPlan[] }> => {
      const response = await fetch(API_ENDPOINTS.businessPlans, {
        method: 'GET',
        headers: { 'X-User-Id': userId.toString() }
      });
      
      if (!response.ok) {
        throw new Error('Ошибка загрузки планов');
      }
      
      return response.json();
    },
    
    getOne: async (userId: number, planId: number): Promise<BusinessPlan> => {
      const response = await fetch(`${API_ENDPOINTS.businessPlans}?id=${planId}`, {
        method: 'GET',
        headers: { 'X-User-Id': userId.toString() }
      });
      
      if (!response.ok) {
        throw new Error('Ошибка загрузки плана');
      }
      
      return response.json();
    },
    
    create: async (userId: number, plan: Partial<BusinessPlan>): Promise<{ success: boolean; id: number }> => {
      const response = await fetch(API_ENDPOINTS.businessPlans, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId.toString()
        },
        body: JSON.stringify(plan)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Ошибка создания плана');
      }
      
      return response.json();
    },
    
    update: async (userId: number, plan: Partial<BusinessPlan> & { id: number }): Promise<{ success: boolean }> => {
      const response = await fetch(API_ENDPOINTS.businessPlans, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId.toString()
        },
        body: JSON.stringify(plan)
      });
      
      if (!response.ok) {
        throw new Error('Ошибка обновления плана');
      }
      
      return response.json();
    },
    
    delete: async (userId: number, planId: number): Promise<{ success: boolean }> => {
      const response = await fetch(`${API_ENDPOINTS.businessPlans}?id=${planId}`, {
        method: 'DELETE',
        headers: { 'X-User-Id': userId.toString() }
      });
      
      if (!response.ok) {
        throw new Error('Ошибка удаления плана');
      }
      
      return response.json();
    }
  }
};
