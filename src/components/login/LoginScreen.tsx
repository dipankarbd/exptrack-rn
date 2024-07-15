import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import { RootStackParams } from '../../navigation/types';
import { useAppDispatch } from '../../hooks';
import {
  updateAuthToken,
  useAuhenticateMutation,
  AuthResponse,
} from '../../store';
import { LoginView, LoginInputParams } from './LoginView';

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useAppDispatch();
  const [authenticate, { isLoading }] = useAuhenticateMutation();

  const handleLogin = (params: LoginInputParams) => {
    authenticate(params)
      .unwrap()
      .then((payload) => handleAuthSuccess(payload))
      .catch((error) => {
        showErrorAlert(error);
      });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleAuthSuccess = (resp: AuthResponse) => {
    dispatch(updateAuthToken(resp));
    navigation.navigate('Home');
  };

  const showErrorAlert = (error: any) => {
    const errorMessage = error.data.error ? error.data.error : 'Unknown error';
    Alert.alert('Error Occured!', errorMessage, [
      { text: 'OK', onPress: () => {} },
    ]);
  };

  return (
    <LoginView
      disableLogin={isLoading}
      onPressLogin={handleLogin}
      onPressRegister={handleRegister}
    />
  );
};

export default LoginScreen;
