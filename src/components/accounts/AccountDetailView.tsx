import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker, TextField } from 'react-native-ui-lib';

const accountTypes = [
  { label: 'Bank', value: 'Bank' },
  { label: 'Cash', value: 'Cash' },
  { label: 'Credit Card', value: 'CreditCard' },
];

export type AccountDetailViewProps = {
  accountType: string;
  accountName: string;
  initialAmount: string;
  onChangeAccountType: (text: string) => void;
  onChangeAccountName: (text: string) => void;
  onChangeInitialValue: (text: string) => void;
};

const AccountDetailView: React.FC<AccountDetailViewProps> = ({
  accountType,
  accountName,
  initialAmount,
  onChangeAccountType,
  onChangeAccountName,
  onChangeInitialValue,
}) => {
  return (
    <View style={styles.container}>
      <TextField
        placeholder={'Account Name'}
        value={accountName}
        onChangeText={onChangeAccountName}
        floatingPlaceholder
      />
      <Picker
        placeholder={'Account Type'}
        value={accountType}
        onChange={(val) => onChangeAccountType(val as string)}
        floatingPlaceholder>
        {accountTypes.map((option) => (
          <Picker.Item
            key={option.value}
            value={option.value}
            label={option.label}
          />
        ))}
      </Picker>
      <TextField
        placeholder={'Initial Amount'}
        defaultValue={initialAmount}
        onChangeText={onChangeInitialValue}
        keyboardType="number-pad"
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

export { AccountDetailView };
