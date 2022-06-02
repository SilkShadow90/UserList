import React from 'react';
import { Text, View } from 'react-native';
import { Strings } from '../../resources';
import { Button } from '../Button';
import { styles } from './index.styles';

type Props = {
  retry(): void;
};

export const ErrorWrapper = ({ retry }: Props) => {
  return (
    <View style={styles.error}>
      <Text style={styles.errorText}>{Strings.errors.someError}</Text>
      <View style={styles.buttonWrapper}>
        <Button title={Strings.global.retry} opPress={retry} />
      </View>
    </View>
  );
};
