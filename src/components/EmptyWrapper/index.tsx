import React from 'react';
import { Text, View } from 'react-native';
import { Strings } from '../../resources';
import { styles } from './index.styles';
import { useTheme } from '../../hooks/useTheme';

export const EmptyWrapper = () => {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[theme.title, styles.text]}>{Strings.global.noData}</Text>
    </View>
  );
};
