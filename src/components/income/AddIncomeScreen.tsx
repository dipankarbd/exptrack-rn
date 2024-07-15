import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IncomeStackParams } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAddIncomeMutation } from '../../store';
import { IncomeDetailView } from './IncomeDetailView';
import { Colors, LoaderScreen } from 'react-native-ui-lib';

export type AddIncomeScreenProp = NativeStackScreenProps<
  IncomeStackParams,
  'AddIncome'
>;

const AddIncomeScreen = ({ route, navigation }: AddIncomeScreenProp) => {
  const accounts = route.params?.accounts || [];

  const [accountId, setAccountId] = useState(0);
  const [amount, setAmount] = useState(0.0);
  const [source, setSource] = useState('Other');
  const [date, setDate] = useState(new Date());

  const [addIncome, { isLoading }] = useAddIncomeMutation();

  const renderSaveButton = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={handleSave}>
        <MaterialCommunityIcons name="content-save" color="#1F41BB" size={24} />
      </TouchableOpacity>
    );
  };

  const handleSave = () => {
    //TODO - add validation
    addIncome({
      accountId: accountId,
      amount: amount,
      source: source,
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

export default AddIncomeScreen;
