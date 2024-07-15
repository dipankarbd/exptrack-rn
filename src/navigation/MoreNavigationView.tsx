import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MoreStackParams } from './types';
import MenuScreen from '../components/more/MenuScreen';
import AccountsScreen from '../components/accounts/AccountsScreen';
import AddAccountScreen from '../components/accounts/AddAccountScreen';
import EditAccountScreen from '../components/accounts/EditAccountScreen';
import TransferScreen from '../components/transfer/TransferScreen';
import AddTransferScreen from '../components/transfer/AddTransferScreen';
import EditTransferScreen from '../components/transfer/EditTransferScreen';
import ResetPasswordScreen from '../components/settings/ChangePasswordScreen';

const MoreStack = createNativeStackNavigator<MoreStackParams>();

const MoreNavigationView = () => {
  return (
    <MoreStack.Navigator
      initialRouteName="MoreMenu"
      screenOptions={{
        headerShown: true,
      }}>
      <MoreStack.Screen
        name="MoreMenu"
        component={MenuScreen}
        options={{ title: 'More Options' }}
      />
      <MoreStack.Screen
        name="Accounts"
        component={AccountsScreen}
        options={{ title: 'Accounts' }}
      />
      <MoreStack.Screen
        name="AddAccount"
        component={AddAccountScreen}
        options={{ title: 'New Account' }}
      />
      <MoreStack.Screen
        name="EditAccount"
        component={EditAccountScreen}
        options={{ title: 'Edit Account' }}
      />
      <MoreStack.Screen
        name="Transfer"
        component={TransferScreen}
        options={{ title: 'Transfers' }}
      />
      <MoreStack.Screen
        name="AddTransfer"
        component={AddTransferScreen}
        options={{ title: 'New Transfer' }}
      />
      <MoreStack.Screen
        name="EditTransfer"
        component={EditTransferScreen}
        options={{ title: 'Edit Transfer' }}
      />
      <MoreStack.Screen
        name="ChangePassword"
        component={ResetPasswordScreen}
        options={{ title: '' }}
      />
    </MoreStack.Navigator>
  );
};

export default MoreNavigationView;
