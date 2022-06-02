import React from 'react';
import { Text, View } from 'react-native';
import { Strings } from '../../resources';
import { styles } from './index.styles';

export const EmptyWrapper = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{Strings.global.noData}</Text>
    </View>
  );
};
