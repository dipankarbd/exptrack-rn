import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './apis/userApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { updateAuthToken, authTokenReducer } from './slices/authTokenSlice';
import { useAuhenticateMutation, useRegisterMutation } from './apis/userApi';
import {
  accountsApi,
  useAddAccountMutation,
  useGetAccountsQuery,
  useUpdateAccountMutation,
} from './apis/accountsApi';
import {
  incomeApi,
  useAddIncomeMutation,
  useDeleteIncomeMutation,
  useGetIncomesQuery,
} from './apis/incomeApi';
import {
  expenseApi,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpenseCategoriesQuery,
  useGetExpensesQuery,
  useUpdateExpenseMutation,
} from './apis/expenseApi';
import {
  transferApi,
  useAddTransferMutation,
  useDeleteTransferMutation,
  useGetTransfersQuery,
} from './apis/transferApi';
import { settingsApi, useUpdatePasswordMutation } from './apis/settingsApi';

export const store = configureStore({
  reducer: {
    authToken: authTokenReducer,
    [userApi.reducerPath]: userApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [incomeApi.reducerPath]: incomeApi.reducer,
    [expenseApi.reducerPath]: expenseApi.reducer,
    [transferApi.reducerPath]: transferApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(accountsApi.middleware)
      .concat(incomeApi.middleware)
      .concat(expenseApi.middleware)
      .concat(transferApi.middleware)
      .concat(settingsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  updateAuthToken,
  useAuhenticateMutation,
  useRegisterMutation,
  useGetAccountsQuery,
  useAddAccountMutation,
  useUpdateAccountMutation,
  useGetIncomesQuery,
  useAddIncomeMutation,
  useDeleteIncomeMutation,
  useGetExpensesQuery,
  useGetExpenseCategoriesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetTransfersQuery,
  useAddTransferMutation,
  useDeleteTransferMutation,
  useUpdatePasswordMutation,
};
export * from './types';
