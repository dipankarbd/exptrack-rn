import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { Expense, useGetAccountsQuery, useGetExpensesQuery } from '../../store';
import { ExpenseListView } from './ExpenseListView';
import { ExpenseStackParams } from '../../navigation/types';
import { ErrorView } from '../common/ErrorView';

const ExpenseScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ExpenseStackParams>>();

  const {
    data: expenseData,
    error,
    isFetching: isExpenseFetching,
    refetch,
  } = useGetExpensesQuery();

  const { data: accountsData, isFetching: isAccountsFetching } =
    useGetAccountsQuery();

  const isFetching = isExpenseFetching || isAccountsFetching;

  const renderAddButton = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={handlleAddExpense}>
        <MaterialCommunityIcons name="plus" color="#1F41BB" size={24} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddButton(),
    });
  });

  const handlleAddExpense = () => {
    if (accountsData) {
      navigation.navigate('AddExpense', { accounts: accountsData });
    }
  };

  const handleOnSelectExpense = (expense: Expense) => {
    if (accountsData) {
      navigation.navigate('EditExpense', {
        accounts: accountsData,
        expense: expense,
      });
    }
  };

  return (
    <View style={styles.container}>
      {error && <ErrorView message="Unable to fetch expense" />}
      {expenseData && accountsData && (
        <ExpenseListView
          expenses={expenseData}
          accounts={accountsData}
          onSelect={handleOnSelectExpense}
          onRefresh={refetch}
          refreshing={isFetching}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },

  addButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExpenseScreen;
