import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MoreStackParams } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDeleteTransferMutation } from '../../store';
import { TransferDetailView } from './TransferDetailView';
import { Colors, LoaderScreen } from 'react-native-ui-lib';

export type EditTransferScreenProp = NativeStackScreenProps<
  MoreStackParams,
  'EditTransfer'
>;

const EditTransferScreen = ({ route, navigation }: EditTransferScreenProp) => {
  const accounts = route.params?.accounts || [];
  const transfer = route.params?.transfer || {
    id: 0,
    fromAccountId: 0,
    toAccountId: 0,
    amount: 0.0,
    date: '',
  };

  const [fromAccountId, setFromAccountId] = useState(transfer.fromAccountId);
  const [toAccountId, setToAccountId] = useState(transfer.toAccountId);
  const [amount, setAmount] = useState(transfer.amount);
  const [date, setDate] = useState(new Date(transfer.date));

  const [deleteTranfer, { isLoading }] = useDeleteTransferMutation();

  const renderDeleteButton = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <MaterialCommunityIcons name="delete" color="#1F41BB" size={24} />
      </TouchableOpacity>
    );
  };

  const handleDelete = () => {
    //TODO - add validation
    deleteTranfer({
      id: transfer.id,
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
      {isLoading && <LoaderScreen message="Deleting" color={Colors.grey40} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditTransferScreen;
