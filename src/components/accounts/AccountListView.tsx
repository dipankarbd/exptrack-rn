import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Account, AccountsResponse } from '../../store';

export type AccountListViewProps = {
  accounts: AccountsResponse;
  refreshing: boolean;
  onSelect: (account: Account) => void;
  onRefresh: () => void;
};

const AccountListView: React.FC<AccountListViewProps> = ({
  accounts,
  refreshing,
  onSelect,
  onRefresh,
}) => {
  const renderItem = ({ item }: { item: Account }) => {
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => onSelect(item)}>
        <Text style={styles.accountTitle}>{item.name}</Text>
        <View style={styles.subHeader}>
          <Text style={styles.balanceText}>{item.currentBalance} Taka</Text>
          <View style={styles.typeContainer}>
            <Text style={styles.type}>{item.accountType}</Text>
            <Text style={styles.state}>{item.accountState}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={accounts}
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
  accountTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F41BB',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceText: {
    fontSize: 16,
    color: '#222',
  },
  typeContainer: {
    flexDirection: 'row',
  },
  state: {
    fontSize: 10,
    borderWidth: 1,
    borderColor: '#673ab7',
    color: '#7e57c2',
    borderRadius: 4,
    padding: 4,
  },
  type: {
    fontSize: 10,
    borderWidth: 1,
    borderColor: '#90caf9',
    color: '#42a5f5',
    borderRadius: 4,
    padding: 4,
    marginRight: 4,
  },
});

export { AccountListView };
