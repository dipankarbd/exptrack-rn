import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ExpenseStackParams } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useAddExpenseMutation,
  useGetExpenseCategoriesQuery,
} from '../../store';
import { ExpenseDetailView } from './ExpenseDetailView';
import { Colors, LoaderScreen } from 'react-native-ui-lib';
import { createCategoryLabels } from '../../utils';

export type AddExpenseScreenProp = NativeStackScreenProps<
  ExpenseStackParams,
  'AddExpense'
>;

const AddExpenseScreen = ({ route, navigation }: AddExpenseScreenProp) => {
  const { data: categoryData } = useGetExpenseCategoriesQuery();
  const [addExpense, { isLoading }] = useAddExpenseMutation();

  const accounts = route.params?.accounts || [];
  const [accountId, setAccountId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [amount, setAmount] = useState(0.0);
  const [date, setDate] = useState(new Date());

  const categoryLabels = createCategoryLabels(categoryData);

  const renderSaveButton = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={handleSave}>
        <MaterialCommunityIcons name="content-save" color="#1F41BB" size={24} />
      </TouchableOpacity>
    );
  };

  const handleSave = () => {
    //TODO - add validation
    addExpense({
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => renderSaveButton(),
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
      {isLoading && <LoaderScreen message="Saving" color={Colors.grey40} />}
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

export default AddExpenseScreen;
