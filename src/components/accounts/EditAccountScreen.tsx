import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AccountDetailView } from './AccountDetailView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MoreStackParams } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, LoaderScreen } from 'react-native-ui-lib';
import { useUpdateAccountMutation } from '../../store';

export type EditAccountScreenProp = NativeStackScreenProps<
  MoreStackParams,
  'EditAccount'
>;

const EditAccountScreen = ({ route, navigation }: EditAccountScreenProp) => {
  const account = route.params?.account || {
    id: 0,
    name: '',
    accountType: 'Bank',
    initialAmount: 0,
  };

  const [accountName, setAccountName] = useState(account.name);
  const [accountType, setAccountType] = useState(account.accountType);
  const [initialAmount, setInitialAmount] = useState(
    `${account.initialAmount}`,
  );

  const [updateAccount, { isLoading }] = useUpdateAccountMutation();

  const renderSaveButton = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={handleSave}>
        <MaterialCommunityIcons name="content-save" color="#1F41BB" size={24} />
      </TouchableOpacity>
    );
  };

  const handleSave = () => {
    //TODO - add validation
    updateAccount({
      id: account.id,
      name: accountName,
      accountType: accountType,
      initialAmount: parseFloat(initialAmount),
    })
      .unwrap()
      .then(() => handleUpdateAccount())
      .catch((error) => {
        showErrorAlert(error);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => renderSaveButton(),
    });
  });

  const handleUpdateAccount = () => {
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

export default EditAccountScreen;
