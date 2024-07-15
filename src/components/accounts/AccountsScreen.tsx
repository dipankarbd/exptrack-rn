import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Account, useGetAccountsQuery } from '../../store';
import { AccountListView } from './AccountListView';
import { LoadingView } from './LoadingView';
import { ErrorView } from '../common/ErrorView';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MoreStackParams } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AccountsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MoreStackParams>>();

  const { data, error, isLoading, isFetching, refetch } = useGetAccountsQuery();

  const renderAddButton = () => {
    return (
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddAccount')}>
        <MaterialCommunityIcons name="plus" color="#1F41BB" size={24} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddButton(),
    });
  });

  const handleOnSelectAccount = (account: Account) => {
    navigation.navigate('EditAccount', { account: account });
  };

  return (
    <View style={styles.container}>
      {error && <ErrorView message="Unable to fetch accounts" />}
      {isLoading && <LoadingView />}
      {data && (
        <AccountListView
          accounts={data}
          onSelect={handleOnSelectAccount}
          onRefresh={refetch}
          refreshing={isFetching}
        />
      )}
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

export default AccountsScreen;
