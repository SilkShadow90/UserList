import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    paddingVertical: 12,
    fontSize: 24,
  },
  buttonWrapper: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    bottom: 20,
    alignItems: 'center',
  },
});
