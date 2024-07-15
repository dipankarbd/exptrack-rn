import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Account, Income } from '../../store';
import { extractAccountNames } from '../../utils';

export type IncomeListViewProps = {
  incomes: Income[];
  accounts: Account[];
  refreshing: boolean;
  onSelect: (income: Income) => void;
  onRefresh: () => void;
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);

  var options: any = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
};

const IncomeListView: React.FC<IncomeListViewProps> = ({
  incomes,
  refreshing,
  accounts,
  onSelect,
  onRefresh,
}) => {
  const accountNames = extractAccountNames(accounts);

  const renderItem = ({ item }: { item: Income }) => {
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => onSelect(item)}>
        <View style={styles.headerContainer}>
          <Text style={styles.accountName}>{accountNames[item.accountId]}</Text>
          <Text style={styles.amount}>{item.amount} Taka</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.date}>{formatDate(item.date)}</Text>
          <Text style={styles.source}>{item.source}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={incomes}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    marginBottom: 12,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountName: {
    fontSize: 18,
    color: '#1F41BB',
  },
  amount: {
    fontSize: 16,
    color: 'brown',
    fontWeight: 'bold',
  },
  date: {
    color: 'gray',
  },
  source: {
    color: '#222',
  },
});

export { IncomeListView };
