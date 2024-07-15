import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '@env';
import { UpdatePasswordReqParams } from '../types';
import { RootState } from '..';

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
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
  endpoints: (builder) => ({
    updatePassword: builder.mutation<boolean, Partial<UpdatePasswordReqParams>>(
      {
        query: (data) => {
          return {
            url: '/users/update-password',
            method: 'PUt',
            body: data,
          };
        },
      },
    ),
  }),
});

export const { useUpdatePasswordMutation } = settingsApi;
