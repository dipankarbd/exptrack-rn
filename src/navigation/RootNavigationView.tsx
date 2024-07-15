import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from './types';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../components/login/LoginScreen';
import CreateAccountScreen from '../components/register/CreateAccountScreen';
import ResetPasswordScreen from '../components/settings/ChangePasswordScreen';
import TabNavigationView from './TabNavigationView';

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootNavigationView = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="Home" component={TabNavigationView} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Register" component={CreateAccountScreen} />
        <RootStack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigationView;
