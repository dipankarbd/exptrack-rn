import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IncomeStackParams } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDeleteIncomeMutation } from '../../store';
import { IncomeDetailView } from './IncomeDetailView';
import { Colors, LoaderScreen } from 'react-native-ui-lib';

export type EditIncomeScreenProp = NativeStackScreenProps<
  IncomeStackParams,
  'EditIncome'
>;

const EditIncomeScreen = ({ route, navigation }: EditIncomeScreenProp) => {
  const accounts = route.params?.accounts || [];
  const income = route.params?.income || {
    id: 0,
    accountId: 0,
    amount: 0.0,
    date: '',
    source: 'Other',
  };

  const [accountId, setAccountId] = useState(income.accountId);
  const [amount, setAmount] = useState(income.amount);
  const [source, setSource] = useState(income.source);
  const [date, setDate] = useState(new Date(income.date));

  const [deleteIncome, { isLoading }] = useDeleteIncomeMutation();

  const renderDeleteButton = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={handleSave}>
        <MaterialCommunityIcons name="delete" color="#1F41BB" size={24} />
      </TouchableOpacity>
    );
  };

  const handleSave = () => {
    //TODO - add validation
    deleteIncome({
      id: income.id,
    })
      .unwrap()
      .then(() => handleSaveDone())
      .catch((error) => {
        showErrorAlert(error);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => renderDeleteButton(),
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
      <IncomeDetailView
        accounts={accounts}
        accountId={accountId}
        amount={amount}
        source={source}
        date={date}
        onChangeAccountId={setAccountId}
        onChangeAmount={setAmount}
        onChangeSource={setSource}
        onChangeDate={setDate}
      />
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

export default EditIncomeScreen;
