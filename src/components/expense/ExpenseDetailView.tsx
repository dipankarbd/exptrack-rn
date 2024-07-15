import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Account } from '../../store';
import { DateTimePicker, Picker, TextField } from 'react-native-ui-lib';

export type ExpenseDetailViewProps = {
  accounts: Account[];
  categories: { label: string; value: number }[];
  accountId: number;
  categoryId: number;
  amount: number;
  date: Date;
  onChangeCategory: (categoryId: number) => void;
  onChangeAccount: (accountId: number) => void;
  onChangeAmount: (amount: number) => void;
  onChangeDate: (date: Date) => void;
};

const ExpenseDetailView: React.FC<ExpenseDetailViewProps> = ({
  categoryId,
  accountId,
  categories,
  accounts,
  amount,
  date,
  onChangeCategory,
  onChangeAccount,
  onChangeAmount,
  onChangeDate,
}) => {
  return (
    <View style={styles.container}>
      <Picker
        placeholder={'Category'}
        value={categoryId}
        onChange={(val) => onChangeCategory(val as number)}
        floatingPlaceholder>
        {categories.map((option) => (
          <Picker.Item
            key={option.value}
            value={option.value}
            label={option.label}
          />
        ))}
      </Picker>
      <Picker
        placeholder={'Account'}
        value={accountId}
        onChange={(val) => onChangeAccount(val as number)}
        floatingPlaceholder>
        {accounts.map((acc) => (
          <Picker.Item key={acc.id} value={acc.id} label={acc.name} />
        ))}
      </Picker>

      <TextField
        placeholder={'Amount'}
        defaultValue={`${amount}`}
        onChangeText={(val) => onChangeAmount(parseFloat(val))}
        keyboardType="number-pad"
        floatingPlaceholder
      />
      <DateTimePicker
        placeholder={'Date'}
        mode="date"
        value={date}
        onChange={onChangeDate}
        floatingPlaceholder
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
});

export { ExpenseDetailView };
