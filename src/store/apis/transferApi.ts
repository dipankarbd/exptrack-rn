import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '@env';
import {
  AddTransferReqParams,
  AddTransferResponse,
  DeleteTransferReqParams,
  TransferResponse,
} from '../types';
import { RootState } from '..';

export const transferApi = createApi({
  reducerPath: 'transferApi',
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
  tagTypes: ['Transfer'],
  endpoints: (builder) => ({
    getTransfers: builder.query<TransferResponse, void>({
      query: () => {
        return {
          url: '/transfers',
          method: 'GET',
        };
      },
      providesTags: ['Transfer'],
    }),
    addTransfer: builder.mutation<
      AddTransferResponse,
      Partial<AddTransferReqParams>
    >({
      query: (data) => {
        return {
          url: '/transfers',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Transfer'],
    }),
    deleteTransfer: builder.mutation<boolean, Partial<DeleteTransferReqParams>>(
      {
        query: (data) => {
          return {
            url: `/transfers/${data.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Transfer'],
      },
    ),
  }),
});

export const {
  useGetTransfersQuery,
  useAddTransferMutation,
  useDeleteTransferMutation,
} = transferApi;
