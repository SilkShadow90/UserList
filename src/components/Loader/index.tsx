import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

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
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" />
    </View>
  );
};
