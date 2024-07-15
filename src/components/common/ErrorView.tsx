import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export type ErrorViewProps = {
  message: string;
};
const ErrorView: React.FC<ErrorViewProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffcdd2',
    borderRadius: 10,
    padding: 12,
    justifyContent: 'space-between',
  },
});

export { ErrorView };
