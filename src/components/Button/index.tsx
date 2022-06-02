import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './index.styles';

type Props = {
  title: string;
  opPress(): void;
};

export const Button = ({ title, opPress }: Props) => {
  return (
    <TouchableOpacity onPress={opPress} style={styles.wrapper}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
