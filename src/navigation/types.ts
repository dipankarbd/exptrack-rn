import { Account, Expense, Income, Transfer } from '../store';

export type RootStackParams = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  Home: undefined;
};

export type MoreStackParams = {
  MoreMenu: undefined;
  Accounts: undefined;
  Transfer: undefined;
  ChangePassword: undefined;
  AddAccount: undefined;
  EditAccount: { account: Account } | undefined;
  AddTransfer: { accounts: Account[] } | undefined;
  EditTransfer: { accounts: Account[]; transfer: Transfer } | undefined;
};

export type IncomeStackParams = {
  IncomeHome: undefined;
  AddIncome: { accounts: Account[] } | undefined;
  EditIncome: { accounts: Account[]; income: Income } | undefined;
};

export type ExpenseStackParams = {
  ExpenseHome: undefined;
  AddExpense: { accounts: Account[] } | undefined;
  EditExpense: { accounts: Account[]; expense: Expense } | undefined;
};
