import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  isVisible: boolean;
};

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 100,
  },
});

export const Loader = ({ isVisible }: Props) => {
  const theme = useTheme();
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={theme.loader.color} />
    </View>
  );
};
