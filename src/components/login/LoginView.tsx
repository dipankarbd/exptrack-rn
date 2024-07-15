import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

import { BigFilledButton } from '../common/BigFilledButton';
import { LinkButton } from '../common/LinkButton';

export type LoginInputParams = {
  email: string;
  password: string;
};

export type LoginViewProps = {
  disableLogin: boolean;
  onPressLogin: (params: LoginInputParams) => void;
  onPressRegister: () => void;
};

const LoginView: React.FC<LoginViewProps> = ({
  disableLogin,
  onPressLogin,
  onPressRegister,
}) => {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = () => {
    onPressLogin({
      email,
      password,
    });
  };

  const handleRegister = () => {
    onPressRegister();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login here</Text>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(txt) => setEmail(txt)}
          defaultValue={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(txt) => setPassword(txt)}
          defaultValue={password}
          secureTextEntry
        />
      </View>
      <View style={styles.buttons}>
        <LinkButton
          style={styles.forgotPasswordButton}
          title="Forgot your password?"
          color="#1F41BB"
        />
        <BigFilledButton
          title="Sign in"
          disabled={disableLogin}
          onPress={handleLogin}
        />
        <LinkButton
          title="Create new account"
          color="#494949"
          onPress={handleRegister}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#fff',
  },

  headerText: {
    marginTop: 16,
    color: '#1F41BB',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputs: {
    marginTop: 120,
    marginBottom: 16,
    height: 130,
    justifyContent: 'space-between',
  },
  input: {
    height: 56,
    backgroundColor: '#F1F4FF',
    borderWidth: 2,
    borderColor: '#1F41BB',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  buttons: {
    height: 150,
    justifyContent: 'space-between',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
  },
});

export { LoginView };
