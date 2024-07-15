import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '@env';
import {
  AccountsResponse,
  AddAccountReqParams,
  AddAccountResponse,
  UpdateAccountReqParams,
  UpdateAccountResponse,
} from '../types';
import { RootState } from '..';

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers: any, api: any) => {
      const state = api.getState() as RootState;
      const token = state.authToken.token;

      if (token) {
        headers.set('Authorization', token);
      }

      return headers;
    },
  }),
  tagTypes: ['Account'],
  endpoints: (builder) => ({
    getAccounts: builder.query<AccountsResponse, void>({
      query: () => {
        return {
          url: '/accounts',
          method: 'GET',
        };
      },
      providesTags: ['Account'],
    }),
    addAccount: builder.mutation<
      AddAccountResponse,
      Partial<AddAccountReqParams>
    >({
      query: (data) => {
        return {
          url: '/accounts',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Account'],
    }),

    updateAccount: builder.mutation<
      UpdateAccountResponse,
      Partial<UpdateAccountReqParams>
    >({
      query: (data) => {
        return {
          url: `/accounts/${data.id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Account'],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useAddAccountMutation,
  useUpdateAccountMutation,
} = accountsApi;
