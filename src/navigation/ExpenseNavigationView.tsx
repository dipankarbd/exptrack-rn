import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExpenseStackParams } from './types';
import ExpenseScreen from '../components/expense/ExpenseScreen';
import AddExpenseScreen from '../components/expense/AddExpenseScreen';
import EditExpenseScreen from '../components/expense/EditExpenseScreen';

const ExpenseStack = createNativeStackNavigator<ExpenseStackParams>();

const ExpenseNavigationView = () => {
  return (
    <ExpenseStack.Navigator
      initialRouteName="ExpenseHome"
      screenOptions={{
        headerShown: true,
      }}>
      <ExpenseStack.Screen
        name="ExpenseHome"
        component={ExpenseScreen}
        options={{ title: 'Expense' }}
      />
      <ExpenseStack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{ title: 'Add Expense' }}
      />

      <ExpenseStack.Screen
        name="EditExpense"
        component={EditExpenseScreen}
        options={{ title: 'Edit Expense' }}
      />
    </ExpenseStack.Navigator>
  );
};

export default ExpenseNavigationView;
