import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ExpenseStackParams } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useDeleteExpenseMutation,
  useGetExpenseCategoriesQuery,
  useUpdateExpenseMutation,
} from '../../store';
import { ExpenseDetailView } from './ExpenseDetailView';
import { Colors, LoaderScreen } from 'react-native-ui-lib';
import { createCategoryLabels } from '../../utils';

export type EditExpenseScreenProp = NativeStackScreenProps<
  ExpenseStackParams,
  'EditExpense'
>;

const EditExpenseScreen = ({ route, navigation }: EditExpenseScreenProp) => {
  const accounts = route.params?.accounts || [];
  const expense = route.params?.expense || {
    id: 0,
    categoryId: 0,
    categoryTitle: '',
    accountId: 0,
    amount: 0,
    date: '',
  };

  const { data: categoryData } = useGetExpenseCategoriesQuery();
  const [updateExpense, { isLoading: updateExpenseLoading }] =
    useUpdateExpenseMutation();
  const [deleteExpense, { isLoading: deleteExpenseLoading }] =
    useDeleteExpenseMutation();

  const [accountId, setAccountId] = useState(expense.accountId);
  const [categoryId, setCategoryId] = useState(expense.categoryId);
  const [amount, setAmount] = useState(expense.amount);
  const [date, setDate] = useState(new Date(expense.date));

  const categoryLabels = createCategoryLabels(categoryData);

  const renderRightButtons = () => {
    return (
      <View style={styles.navBarButtons}>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <MaterialCommunityIcons name="delete" color="#1F41BB" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <MaterialCommunityIcons
            name="content-save"
            color="#1F41BB"
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleSave = () => {
    //TODO - add validation
    updateExpense({
      id: expense.id,
      accountId: accountId,
      categoryId: categoryId,
      amount: amount,
      date: date.toString(),
    })
      .unwrap()
      .then(() => handleSaveDone())
      .catch((error) => {
        showErrorAlert(error);
      });
  };

  const handleDelete = () => {
    deleteExpense({
      id: expense.id,
    })
      .unwrap()
      .then(() => handleSaveDone())
      .catch((error) => {
        showErrorAlert(error);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => renderRightButtons(),
    });
  });

  const handleSaveDone = () => {
    navigation.goBack();
  };

  const showErrorAlert = (error: any) => {
    const errorMessage = error.data.error ? error.data.error : 'Unknown error';
    Alert.alert('Error Occured!', errorMessage, [
      { text: 'OK', onPress: () => {} },
    ]);
  };

  return (
    <View style={styles.container}>
      {categoryLabels && (
        <ExpenseDetailView
          accounts={accounts}
          categories={categoryLabels}
          categoryId={categoryId}
          accountId={accountId}
          amount={amount}
          date={date}
          onChangeCategory={setCategoryId}
          onChangeAccount={setAccountId}
          onChangeAmount={setAmount}
          onChangeDate={setDate}
        />
      )}
      {updateExpenseLoading && (
        <LoaderScreen message="Updating..." color={Colors.grey40} />
      )}
      {deleteExpenseLoading && (
        <LoaderScreen message="Deleting..." color={Colors.grey40} />
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
  navBarButtons: {
    flexDirection: 'row',
  },

  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditExpenseScreen;
