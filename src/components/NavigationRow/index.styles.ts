import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    flex: 1,
    height: 60,
    alignItems: 'center',
    marginVertical: 6,
    borderRadius: 24,
    paddingLeft: 24,
    paddingRight: 16,
  },
  textItem: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightItem: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
