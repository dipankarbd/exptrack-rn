import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MoreStackParams } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAddTransferMutation } from '../../store';
import { TransferDetailView } from './TransferDetailView';
import { Colors, LoaderScreen } from 'react-native-ui-lib';

export type AddTransferScreenProp = NativeStackScreenProps<
  MoreStackParams,
  'AddTransfer'
>;

const AddTransferScreen = ({ route, navigation }: AddTransferScreenProp) => {
  const accounts = route.params?.accounts || [];

  const [fromAccountId, setFromAccountId] = useState(0);
  const [toAccountId, setToAccountId] = useState(0);
  const [amount, setAmount] = useState(0.0);
  const [date, setDate] = useState(new Date());

  const [addTransfer, { isLoading }] = useAddTransferMutation();

  const renderSaveButton = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={handleSave}>
        <MaterialCommunityIcons name="content-save" color="#1F41BB" size={24} />
      </TouchableOpacity>
    );
  };

  const handleSave = () => {
    //TODO - add validation
    addTransfer({
      fromAccountId: fromAccountId,
      toAccountId: toAccountId,
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
      <TransferDetailView
        accounts={accounts}
        fromAccountId={fromAccountId}
        toAccountId={toAccountId}
        amount={amount}
        date={date}
        onChangeFromAccountId={setFromAccountId}
        onChangeToAccountId={setToAccountId}
        onChangeAmount={setAmount}
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

export default AddTransferScreen;
