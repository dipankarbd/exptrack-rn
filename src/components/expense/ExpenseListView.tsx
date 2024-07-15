import React from 'react';
import {
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Account, Expense } from '../../store';
import { extractAccountNames } from '../../utils';

export type ExpenseListViewProps = {
  expenses: Expense[];
  accounts: Account[];
  refreshing: boolean;
  onSelect: (expense: Expense) => void;
  onRefresh: () => void;
};

const formatDate = (date: Date): string => {
  var options: any = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
};

type ExpenseGroup = {
  title: string;
  data: Expense[];
};

const groupExpensesByDate = (expenses: Expense[]): ExpenseGroup[] => {
  const dic: any = {};
  const titles: string[] = [];

  const arr = expenses.map((exp) => {
    return {
      ...exp,
      dateObj: new Date(exp.date),
    };
  });

  arr.sort((a, b) => {
    return b.dateObj.getTime() - a.dateObj.getTime();
  });

  for (let i = 0; i < arr.length; i++) {
    const elm = arr[i];
    const title = formatDate(elm.dateObj);

    if (!(title in dic)) {
      dic[title] = [];
      titles.push(title);
    }

    const obj = {
      id: elm.id,
      categoryId: elm.categoryId,
      categoryTitle: elm.categoryTitle,
      accountId: elm.accountId,
      amount: elm.amount,
      date: elm.date,
    };

    dic[title] = [...dic[title], obj];
  }

  const res: ExpenseGroup[] = [];

  for (let title of titles) {
    const group = {
      title: title,
      data: dic[title],
    };

    res.push(group);
  }

  return res;
};

const ExpenseListView: React.FC<ExpenseListViewProps> = ({
  expenses,
  refreshing,
  accounts,
  onSelect,
  onRefresh,
}) => {
  const accountNames = extractAccountNames(accounts);
  const expenseGroups = groupExpensesByDate(expenses);

  const renderSectionTitle = (title: string) => {
    return <Text style={styles.sectionTitle}>{title}</Text>;
  };

  const renderItem = ({ item }: { item: Expense }) => {
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => onSelect(item)}>
        <Text style={styles.category}>{item.categoryTitle}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.amount}>{item.amount} Taka</Text>
          <Text>{accountNames[item.accountId]}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SectionList
      sections={expenseGroups}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) =>
        renderSectionTitle(title)
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 14,
    color: '#1F41BB',
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
    marginLeft: 4,
  },
  rowContainer: {
    marginBottom: 12,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 12,
  },
  category: {
    fontSize: 16,
    color: '#1F41BB',
  },
  bottomRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: 16,
    color: 'brown',
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountName: {
    fontSize: 18,
    color: '#1F41BB',
  },

  date: {
    color: 'gray',
  },
  source: {
    color: '#222',
  },
});

export { ExpenseListView };
