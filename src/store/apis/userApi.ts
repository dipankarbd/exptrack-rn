import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '@env';
import {
  AuthReqParams,
  AuthResponse,
  RegisterReqParams,
  RegisterResponse,
} from '../types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    auhenticate: builder.mutation<AuthResponse, Partial<AuthReqParams>>({
      query: (data) => {
        return {
          url: '/authenticate',
          method: 'POST',
          body: data,
        };
      },
    }),
    register: builder.mutation<RegisterResponse, Partial<RegisterReqParams>>({
      query: (data) => {
        return {
          url: '/users/register',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const { useAuhenticateMutation, useRegisterMutation } = userApi;
