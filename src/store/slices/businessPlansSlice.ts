import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api, type BusinessPlan } from '@/lib/api';

interface BusinessPlansState {
  plans: BusinessPlan[];
  currentPlan: BusinessPlan | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BusinessPlansState = {
  plans: [],
  currentPlan: null,
  isLoading: false,
  error: null
};

export const fetchBusinessPlans = createAsyncThunk(
  'businessPlans/fetchAll',
  async (userId: number) => {
    const response = await api.businessPlans.getAll(userId);
    return response.plans;
  }
);

export const fetchBusinessPlan = createAsyncThunk(
  'businessPlans/fetchOne',
  async ({ userId, planId }: { userId: number; planId: number }) => {
    return await api.businessPlans.getOne(userId, planId);
  }
);

export const createBusinessPlan = createAsyncThunk(
  'businessPlans/create',
  async ({ userId, plan }: { userId: number; plan: Partial<BusinessPlan> }) => {
    const response = await api.businessPlans.create(userId, plan);
    return { ...plan, id: response.id };
  }
);

export const updateBusinessPlan = createAsyncThunk(
  'businessPlans/update',
  async ({ userId, plan }: { userId: number; plan: Partial<BusinessPlan> & { id: number } }) => {
    await api.businessPlans.update(userId, plan);
    return plan;
  }
);

export const deleteBusinessPlan = createAsyncThunk(
  'businessPlans/delete',
  async ({ userId, planId }: { userId: number; planId: number }) => {
    await api.businessPlans.delete(userId, planId);
    return planId;
  }
);

const businessPlansSlice = createSlice({
  name: 'businessPlans',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPlan: (state, action: PayloadAction<BusinessPlan | null>) => {
      state.currentPlan = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessPlans.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBusinessPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plans = action.payload;
      })
      .addCase(fetchBusinessPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки планов';
      })
      .addCase(fetchBusinessPlan.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBusinessPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPlan = action.payload;
      })
      .addCase(fetchBusinessPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки плана';
      })
      .addCase(createBusinessPlan.fulfilled, (state, action) => {
        state.plans.unshift(action.payload as BusinessPlan);
      })
      .addCase(updateBusinessPlan.fulfilled, (state, action) => {
        const index = state.plans.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.plans[index] = { ...state.plans[index], ...action.payload };
        }
      })
      .addCase(deleteBusinessPlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter(p => p.id !== action.payload);
      });
  }
});

export const { clearError, setCurrentPlan } = businessPlansSlice.actions;
export default businessPlansSlice.reducer;
