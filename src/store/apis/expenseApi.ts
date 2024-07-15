import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '@env';
import {
  AddExpenseReqParams,
  AddExpenseResponse,
  CategoryResponse,
  DeleteExpenseReqParams,
  ExpenseResponse,
  UpdateExpenseReqParams,
  UpdateExpenseResponse,
} from '../types';
import { RootState } from '..';

export const expenseApi = createApi({
  reducerPath: 'expenseApi',
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
  tagTypes: ['Expense'],
  endpoints: (builder) => ({
    getExpenses: builder.query<ExpenseResponse, void>({
      query: () => {
        return {
          url: '/expenses',
          method: 'GET',
        };
      },
      providesTags: ['Expense'],
    }),
    getExpenseCategories: builder.query<CategoryResponse, void>({
      query: () => {
        return {
          url: '/expenses/categories',
          method: 'GET',
        };
      },
    }),
    addExpense: builder.mutation<
      AddExpenseResponse,
      Partial<AddExpenseReqParams>
    >({
      query: (data) => {
        return {
          url: '/expenses',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Expense'],
    }),
    updateExpense: builder.mutation<
      UpdateExpenseResponse,
      Partial<UpdateExpenseReqParams>
    >({
      query: (data) => {
        return {
          url: `/expenses/${data.id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Expense'],
    }),
    deleteExpense: builder.mutation<boolean, Partial<DeleteExpenseReqParams>>({
      query: (data) => {
        return {
          url: `/expenses/${data.id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Expense'],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useGetExpenseCategoriesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
