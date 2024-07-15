export type Account = {
  id: number;
  name: string;
  accountType: string;
  accountState: string;
  initialAmount: number;
  currentBalance: number;
};

export type Income = {
  id: number;
  accountId: number;
  amount: number;
  date: string;
  source: string;
};

export type Category = {
  id: number;
  name: string;
  parentId: number | null;
};

export type Expense = {
  id: number;
  categoryId: number;
  categoryTitle: string;
  accountId: number;
  amount: number;
  date: string;
};

export type Transfer = {
  id: number;
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  date: string;
};

export type AuthReqParams = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  expires: string;
};

export type AuthTokenState = {
  token: string | null;
  expiresAt: number;
};

export type AuthTokenUpdatePayload = {
  token: string;
  expires: string;
};

export type RegisterReqParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type RegisterResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export type AccountsResponse = Account[];

export type AddAccountReqParams = {
  name: string;
  accountType: string;
  initialAmount: number;
};

export type UpdateAccountReqParams = {
  id: number;
  name: string;
  accountType: string;
  initialAmount: number;
};

export type AddAccountResponse = Account;
export type UpdateAccountResponse = Account;

export type IncomeResponse = Income[];

export type AddIncomeReqParams = {
  accountId: number;
  amount: number;
  source: string;
  date: string;
};

export type DeleteIncomeReqParams = {
  id: number;
};

export type AddIncomeResponse = Income;

export type ExpenseResponse = Expense[];

export type AddExpenseReqParams = {
  categoryId: number;
  accountId: number;
  amount: number;
  date: string;
};

export type UpdateExpenseReqParams = {
  id: number;
  categoryId: number;
  accountId: number;
  amount: number;
  date: string;
};

export type DeleteExpenseReqParams = {
  id: number;
};

export type AddExpenseResponse = Expense;
export type UpdateExpenseResponse = Expense;
export type CategoryResponse = Category[];

export type TransferResponse = Transfer[];

export type AddTransferReqParams = {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  date: string;
};

export type DeleteTransferReqParams = {
  id: number;
};

export type AddTransferResponse = Transfer;

export type UpdatePasswordReqParams = {
  oldPassword: string;
  newPassword: string;
};
