import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Account, Transfer } from '../../store';
import { extractAccountNames } from '../../utils';

export type TransferListViewProps = {
  transfers: Transfer[];
  accounts: Account[];
  refreshing: boolean;
  onSelect: (transfer: Transfer) => void;
  onRefresh: () => void;
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);

  var options: any = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
};

const TransferListView: React.FC<TransferListViewProps> = ({
  transfers,
  refreshing,
  accounts,
  onSelect,
  onRefresh,
}) => {
  const accountNames = extractAccountNames(accounts);

  const renderItem = ({ item }: { item: Transfer }) => {
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => onSelect(item)}>
        <View style={styles.headerContainer}>
          <Text style={styles.accountName}>{`${
            accountNames[item.fromAccountId]
          } -> ${accountNames[item.toAccountId]}`}</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.amount}>{item.amount} Taka</Text>
          <Text style={styles.date}>{formatDate(item.date)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={transfers}
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
    fontSize: 16,
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
});

export { TransferListView };
