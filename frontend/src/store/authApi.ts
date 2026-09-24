import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../types';
import { prepareAuthHeaders } from './apiHeaders';

interface Token {
  access_token: string;
  token_type: string;
}

interface Credentials {
  username: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    prepareHeaders: prepareAuthHeaders,
  }),
  endpoints: (build) => ({
    login: build.mutation<Token, Credentials>({ query: (credentials) => { 
        const formData = new URLSearchParams(); 
        formData.append('username', credentials.username); 
        formData.append('password', credentials.password);
        return {
          url: '/auth/login',
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
      },
    }),
    register: build.mutation<User, Credentials>({ query: (body) => ({ url: '/auth/register', method: 'POST', body }) }),
    getUser: build.query<User, void>({ query: () => '/auth' }),
    }),
});