import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Transfer,
  useGetAccountsQuery,
  useGetTransfersQuery,
} from '../../store';
import { TransferListView } from './TransferListView';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MoreStackParams } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { ErrorView } from '../common/ErrorView';

const TransferScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MoreStackParams>>();

  const {
    data: transdersData,
    error,
    isFetching: isTransfersFetching,
    refetch,
  } = useGetTransfersQuery();

  const { data: accountsData, isFetching: isAccountsFetching } =
    useGetAccountsQuery();

  const isFetching = isTransfersFetching || isAccountsFetching;

  const renderAddButton = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={handlleAddIncome}>
        <MaterialCommunityIcons name="plus" color="#1F41BB" size={24} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddButton(),
    });
  });

  const handlleAddIncome = () => {
    if (accountsData) {
      navigation.navigate('AddTransfer', { accounts: accountsData });
    }
  };

  const handleOnSelectIncome = (transfer: Transfer) => {
    if (accountsData) {
      navigation.navigate('EditTransfer', {
        accounts: accountsData,
        transfer: transfer,
      });
    }
  };

  return (
    <View style={styles.container}>
      {error && <ErrorView message="Unable to fetch transfers" />}
      {transdersData && accountsData && (
        <TransferListView
          transfers={transdersData}
          accounts={accountsData}
          onSelect={handleOnSelectIncome}
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

export default TransferScreen;
