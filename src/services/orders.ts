import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order } from '../types';

// Create an API slice for orders-related endpoints
export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), // Update with your actual API base URL
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    // Endpoint for fetching orders by user ID
    getOrders: builder.query<Order[], string>({
      query: (userId) => `/orders?userId=${userId}`,
      providesTags: ['Orders'],
    }),
    // Endpoint for adding a new order
    addOrder: builder.mutation<Order, Partial<Order>>({
      query: (newOrder) => ({
        url: '/orders',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

// Export hooks for using the API endpoints
export const { useGetOrdersQuery, useAddOrderMutation } = ordersApi;
