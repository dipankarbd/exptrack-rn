import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Alert } from 'react-native';
import { RootStackParams } from '../../navigation/types';
import { BigFilledButton } from '../common/BigFilledButton';
import { LinkButton } from '../common/LinkButton';
import { useRegisterMutation } from '../../store';

const CreateAccountScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = () => {
    register({
      email,
      password,
      firstName,
      lastName,
    })
      .unwrap()
      .then(() => handleAuthSuccess())
      .catch((error) => {
        showErrorAlert(error);
      });
  };

  const handleAuthSuccess = () => {
    navigation.pop();
  };

  const showErrorAlert = (error: any) => {
    console.log(error);
    const errorMessage = error.data.error ? error.data.error : 'Unknown error';
    Alert.alert('Error Occured!', errorMessage, [
      { text: 'OK', onPress: () => {} },
    ]);
  };

  const passwordMatches = password === confirmPassword;
  const signUpDisabled = isLoading || !passwordMatches;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Create Account</Text>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          defaultValue={email}
          onChangeText={(txt) => setEmail(txt)}
        />
        <TextInput
          style={styles.input}
          placeholder="First name"
          defaultValue={email}
          onChangeText={(txt) => setFirstName(txt)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          defaultValue={email}
          onChangeText={(txt) => setLastName(txt)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          defaultValue={password}
          onChangeText={(txt) => setPassword(txt)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          defaultValue={confirmPassword}
          onChangeText={(txt) => setConfirmPassword(txt)}
          secureTextEntry
        />
      </View>
      {!passwordMatches && (
        <Text style={styles.passwordsDoNotMatch}>Passwords do not match</Text>
      )}
      <View style={styles.buttons}>
        <BigFilledButton
          title="Sign up"
          onPress={handleRegister}
          disabled={signUpDisabled}
        />
        <LinkButton
          title="Already have an account"
          color="#494949"
          onPress={() => navigation.pop()}
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
    marginTop: 72,
    marginBottom: 16,
    height: 320,
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
    marginTop: 40,
    height: 96,
    justifyContent: 'space-between',
  },
  passwordsDoNotMatch: {
    paddingHorizontal: 10,
    color: 'red',
  },
});

export default CreateAccountScreen;
