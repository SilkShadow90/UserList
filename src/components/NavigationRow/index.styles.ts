import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    flex: 1,
    height: 60,
    alignItems: 'center',
    marginVertical: 6,
    backgroundColor: '#c3c3c3',
    borderRadius: 24,
    paddingLeft: 24,
    paddingRight: 16,
    shadowColor: '#8b8b8b',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  textItem: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
  rightItem: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    width: 30,
    height: 30,
  },
});
