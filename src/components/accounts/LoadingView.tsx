import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

const LoadingView = () => {
  const renderItem = () => {
    return <View style={styles.rowContainer} />;
  };

  const data = Array(5).fill(null);
  return <FlatList data={data} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  rowContainer: {
    marginBottom: 12,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 12,
  },
});

export { LoadingView };
