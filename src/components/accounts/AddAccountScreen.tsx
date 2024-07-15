import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AccountDetailView } from './AccountDetailView';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MoreStackParams } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Colors, LoaderScreen } from 'react-native-ui-lib';
import { useAddAccountMutation } from '../../store';

const AddAccountScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MoreStackParams>>();

  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState('Bank');
  const [initialAmount, setInitialAmount] = useState('0.0');

  const [addAccount, { isLoading }] = useAddAccountMutation();

  const renderSaveButton = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={handleSave}>
        <MaterialCommunityIcons name="content-save" color="#1F41BB" size={24} />
      </TouchableOpacity>
    );
  };

  const handleSave = () => {
    //TODO - add validation
    addAccount({
      name: accountName,
      accountType: accountType,
      initialAmount: parseFloat(initialAmount),
    })
      .unwrap()
      .then(() => handleAddAccount())
      .catch((error) => {
        showErrorAlert(error);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => renderSaveButton(),
    });
  });

  const handleAddAccount = () => {
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
      <AccountDetailView
        accountName={accountName}
        accountType={accountType}
        initialAmount={initialAmount}
        onChangeAccountName={setAccountName}
        onChangeAccountType={setAccountType}
        onChangeInitialValue={setInitialAmount}
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

export default AddAccountScreen;
