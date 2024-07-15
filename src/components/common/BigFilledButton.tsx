import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface BigFilledButtonProps {
  title: string;
  style?: ViewStyle;
  disabled?: boolean;
  onPress?: () => void;
}

const BigFilledButton: React.FC<BigFilledButtonProps> = ({
  title,
  disabled = false,
  style = {},
  onPress,
}) => {
  const styles = stylesFn(disabled);
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const stylesFn = (disabled: boolean) => {
  return StyleSheet.create({
    container: {
      backgroundColor: disabled ? '#bbdefb' : '#1F41BB',
      borderRadius: 10,
      padding: 12,
    },
    text: {
      color: disabled ? 'gray' : '#fff',
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
    },
  });
};

export { BigFilledButton };
