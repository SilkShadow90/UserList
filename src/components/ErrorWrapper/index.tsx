import React from 'react';
import { Text, View } from 'react-native';
import { Strings } from '../../resources';
import { Button } from '../Button';
import { styles } from './index.styles';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  retry?(): void;
};

export const ErrorWrapper = ({ retry }: Props) => {
  const theme = useTheme();

  return (
    <View style={theme.centeredWrapper}>
      <Text style={[styles.errorText, theme.title]}>{Strings.errors.someError}</Text>
      {!!retry && (
        <View style={styles.buttonWrapper}>
          <Button title={Strings.global.retry} opPress={retry} />
        </View>
      )}
    </View>
  );
};
