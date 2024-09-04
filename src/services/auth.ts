import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types';

// Create an API slice for authentication-related endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }), // Update with your actual API base URL
  endpoints: (builder) => ({
    // Endpoint for user registration
    register: builder.mutation<{ user: User }, { username: string, password: string, theme: 'light' | 'dark' }>({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    // Endpoint for user login
    login: builder.mutation<{ user: User; token: string }, { username: string, password: string }>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    // Endpoint for updating user theme
    updateTheme: builder.mutation<{ message: string }, { userId: string, theme: 'light' | 'dark' }>({
      query: (body) => ({
        url: '/update-theme',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Export hooks for using the API endpoints
export const { useRegisterMutation, useLoginMutation, useUpdateThemeMutation } = authApi;
