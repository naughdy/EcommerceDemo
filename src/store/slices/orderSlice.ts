import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  id: string; // Unique identifier for the order
  productId: number; // ID of the ordered product
  customerName: string; // Name of the customer
  address: string; // Delivery address
  date: string; // Date of order creation
}

interface OrderState {
  orders: Order[]; // List of orders
  loading: boolean; // Loading state
  error: string | null; // Error state
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Action to add a new order
    createOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    // Action to start fetching orders
    fetchOrdersStart: (state) => {
      state.loading = true;
    },
    // Action to handle successful fetching of orders
    fetchOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
      state.loading = false;
      state.orders = action.payload;
    },
    // Action to handle failed fetching of orders
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createOrder, fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } = orderSlice.actions;
export default orderSlice.reducer;
