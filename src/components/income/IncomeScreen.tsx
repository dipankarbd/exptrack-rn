import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Income, useGetAccountsQuery, useGetIncomesQuery } from '../../store';
import { IncomeListView } from './IncomeListView';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IncomeStackParams } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { ErrorView } from '../common/ErrorView';

const IncomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<IncomeStackParams>>();

  const {
    data: incomeData,
    error,
    isFetching: isIncomeFetching,
    refetch,
  } = useGetIncomesQuery();

  const { data: accountsData, isFetching: isAccountsFetching } =
    useGetAccountsQuery();

  const isFetching = isIncomeFetching || isAccountsFetching;

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
      navigation.navigate('AddIncome', { accounts: accountsData });
    }
  };

  const handleOnSelectIncome = (income: Income) => {
    if (accountsData) {
      navigation.navigate('EditIncome', {
        accounts: accountsData,
        income: income,
      });
    }
  };

  return (
    <View style={styles.container}>
      {error && <ErrorView message="Unable to fetch incomes" />}
      {incomeData && accountsData && (
        <IncomeListView
          incomes={incomeData}
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

export default IncomeScreen;
