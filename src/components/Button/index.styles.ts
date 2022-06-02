import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    margin: 12,
    width: 300,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c3c3c3',
    borderRadius: 24,
    paddingHorizontal: 24,
    shadowColor: '#8b8b8b',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  text: {
    fontSize: 20,
  },
});
