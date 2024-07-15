import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Alert } from 'react-native';

import { BigFilledButton } from '../common/BigFilledButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MoreStackParams } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useUpdatePasswordMutation } from '../../store';

const ResetPasswordScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MoreStackParams>>();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleUpdatePassword = () => {
    updatePassword({
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
      .unwrap()
      .then((payload) => handleUpdateSuccess(payload))
      .catch((error) => {
        showErrorAlert(error);
      });
  };

  const handleUpdateSuccess = (success: boolean) => {
    if (success) {
      navigation.pop();
    } else {
      Alert.alert('Error Occured!', 'Unable to change password', [
        { text: 'OK', onPress: () => {} },
      ]);
    }
  };

  const showErrorAlert = (error: any) => {
    console.log(error);
    const errorMessage = error.data.error ? error.data.error : 'Unknown error';
    Alert.alert('Error Occured!', errorMessage, [
      { text: 'OK', onPress: () => {} },
    ]);
  };

  const passwordMatches = newPassword === confirmNewPassword;
  const updateDisabled = isLoading || !passwordMatches;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Change Password</Text>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          onChangeText={(txt) => setOldPassword(txt)}
          defaultValue={oldPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          onChangeText={(txt) => setNewPassword(txt)}
          defaultValue={newPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          onChangeText={(txt) => setConfirmNewPassword(txt)}
          defaultValue={confirmNewPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.buttons}>
        <BigFilledButton
          title="Update Password"
          onPress={handleUpdatePassword}
          disabled={updateDisabled}
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
    height: 200,
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
});

export default ResetPasswordScreen;
