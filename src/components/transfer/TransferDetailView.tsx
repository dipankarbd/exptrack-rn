import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DateTimePicker, Picker, TextField } from 'react-native-ui-lib';
import { Account } from '../../store';

export type TransferDetailViewProps = {
  accounts: Account[];
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  date: Date;
  onChangeFromAccountId: (fromAccountId: number) => void;
  onChangeToAccountId: (toAccountId: number) => void;
  onChangeAmount: (amount: number) => void;
  onChangeDate: (date: Date) => void;
};

const TransferDetailView: React.FC<TransferDetailViewProps> = ({
  accounts,
  fromAccountId,
  toAccountId,
  amount,
  date,
  onChangeFromAccountId,
  onChangeToAccountId,
  onChangeAmount,
  onChangeDate,
}) => {
  return (
    <View style={styles.container}>
      <Picker
        placeholder={'From Account'}
        value={fromAccountId}
        onChange={(val) => onChangeFromAccountId(val as number)}
        floatingPlaceholder>
        {accounts.map((acc) => (
          <Picker.Item key={acc.id} value={acc.id} label={acc.name} />
        ))}
      </Picker>
      <Picker
        placeholder={'To Account'}
        value={toAccountId}
        onChange={(val) => onChangeToAccountId(val as number)}
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

export { TransferDetailView };
