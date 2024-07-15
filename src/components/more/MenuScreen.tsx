import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { LinkButton } from '../common/LinkButton';
import { MoreStackParams } from '../../navigation/types';

const MenuScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MoreStackParams>>();

  const handleTapAccounts = () => {
    navigation.navigate('Accounts');
  };

  const handleTapTransfer = () => {
    navigation.navigate('Transfer');
  };

  const handleTapChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  return (
    <View style={styles.container}>
      <LinkButton
        style={styles.link}
        title="Accounts"
        onPress={handleTapAccounts}
      />
      <LinkButton
        style={styles.link}
        title="Transfer"
        onPress={handleTapTransfer}
      />
      <LinkButton
        style={styles.link}
        title="Change Password"
        onPress={handleTapChangePassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    paddingTop: 16,
  },

  link: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default MenuScreen;
