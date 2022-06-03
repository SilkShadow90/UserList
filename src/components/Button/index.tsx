import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './index.styles';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  title: string;
  opPress(): void;
};

export const Button = ({ title, opPress }: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={opPress} style={[theme.buttonColor, theme.shadow, styles.wrapper]}>
      <Text style={theme.text}>{title}</Text>
    </TouchableOpacity>
  );
};
