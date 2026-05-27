import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrdersState {
  feed: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  userOrders: TOrder[];
  currentOrder: TOrder | null;
  modalOrder: TOrder | null;
  loading: boolean;
  error: string | null;
  feedLoading: boolean;
  modalLoading: boolean;
}

const initialState: OrdersState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  userOrders: [],
  currentOrder: null,
  modalOrder: null,
  loading: false,
  modalLoading: false,
  error: null,
  feedLoading: false
};

export const fetchFeed = createAsyncThunk('orders/fetchFeed', async () => {
  const data = await getFeedsApi();
  return data;
});

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async () => {
    const data = await getOrdersApi();
    return data;
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders[0];
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    return { ...data.order, ingredients };
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.feedLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.feedLoading = false;
        state.error = action.error.message || 'Не удалось загрузить заказы';
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.feedLoading = false;
        state.feed = action.payload;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось загрузить заказы';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.modalLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.modalLoading = false;
        state.error = action.error.message || 'Не удалось загрузить заказ';
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.modalLoading = false;
        state.modalOrder = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось создать заказ';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      });
  }
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
