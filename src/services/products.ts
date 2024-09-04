import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create an API slice for products-related endpoints
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    // Endpoint for fetching all products
    getProducts: builder.query<any, void>({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    // Endpoint for fetching a product by its ID
    getProductById: builder.query<any, number>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    // Endpoint for adding a new product
    addProduct: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/products',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

// Export hooks for using the API endpoints
export const { useGetProductsQuery, useGetProductByIdQuery, useAddProductMutation } = productsApi;
