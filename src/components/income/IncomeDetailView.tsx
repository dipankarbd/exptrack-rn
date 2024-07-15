import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DateTimePicker, Picker, TextField } from 'react-native-ui-lib';
import { Account } from '../../store';

const incomeSources = [
  { label: 'Salary', value: 'Salary' },
  { label: 'Interest', value: 'Interest' },
  { label: 'Profit', value: 'Profit' },
  { label: 'Other', value: 'Other' },
];

export type IncomeDetailViewProps = {
  accounts: Account[];
  accountId: number;
  amount: number;
  source: string;
  date: Date;
  onChangeAccountId: (text: number) => void;
  onChangeAmount: (text: number) => void;
  onChangeSource: (text: string) => void;
  onChangeDate: (text: Date) => void;
};

const IncomeDetailView: React.FC<IncomeDetailViewProps> = ({
  accounts,
  accountId,
  amount,
  source,
  date,
  onChangeAccountId,
  onChangeAmount,
  onChangeSource,
  onChangeDate,
}) => {
  return (
    <View style={styles.container}>
      <Picker
        placeholder={'Income Source'}
        value={source}
        onChange={(val) => onChangeSource(val as string)}
        floatingPlaceholder>
        {incomeSources.map((option) => (
          <Picker.Item
            key={option.value}
            value={option.value}
            label={option.label}
          />
        ))}
      </Picker>

      <TextField
        placeholder={'Amount'}
        defaultValue={`${amount}`}
        onChangeText={(val) => onChangeAmount(parseFloat(val))}
        keyboardType="number-pad"
        floatingPlaceholder
      />
      <Picker
        placeholder={'Account'}
        value={accountId}
        onChange={(val) => onChangeAccountId(val as number)}
        floatingPlaceholder>
        {accounts.map((acc) => (
          <Picker.Item key={acc.id} value={acc.id} label={acc.name} />
        ))}
      </Picker>
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

export { IncomeDetailView };
