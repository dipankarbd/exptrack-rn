import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface LinkButtonProps {
  title: string;
  style?: ViewStyle;
  color?: string;
  disabled?: boolean;
  onPress?: () => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  title,
  color = '#1F41BB',
  disabled = false,
  style = {},
  onPress,
}) => {
  const styles = stylesFn(color, disabled);
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const stylesFn = (color: string, disabled: boolean) => {
  return StyleSheet.create({
    container: {},
    text: {
      color: disabled ? 'gray' : color,
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center',
    },
  });
};

export { LinkButton };
