import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '@env';
import {
  AddIncomeReqParams,
  AddIncomeResponse,
  DeleteIncomeReqParams,
  IncomeResponse,
} from '../types';
import { RootState } from '..';

export const incomeApi = createApi({
  reducerPath: 'incomeApi',
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
  tagTypes: ['Income'],
  endpoints: (builder) => ({
    getIncomes: builder.query<IncomeResponse, void>({
      query: () => {
        return {
          url: '/incomes',
          method: 'GET',
        };
      },
      providesTags: ['Income'],
    }),
    addIncome: builder.mutation<AddIncomeResponse, Partial<AddIncomeReqParams>>(
      {
        query: (data) => {
          return {
            url: '/incomes',
            method: 'POST',
            body: data,
          };
        },
        invalidatesTags: ['Income'],
      },
    ),
    deleteIncome: builder.mutation<boolean, Partial<DeleteIncomeReqParams>>({
      query: (data) => {
        return {
          url: `/incomes/${data.id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Income'],
    }),
  }),
});

export const {
  useGetIncomesQuery,
  useAddIncomeMutation,
  useDeleteIncomeMutation,
} = incomeApi;
