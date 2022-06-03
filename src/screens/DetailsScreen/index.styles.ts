import { Dimensions, StyleSheet } from 'react-native';

const size = Dimensions.get('window').width - 180;

export const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  avatarWrapper: {
    margin: 24,
    borderWidth: 4,
    borderColor: '#b2b2b222',
    backgroundColor: '#b2b2b222',
    shadowColor: '#8b8b8b',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    height: size + 4,
    width: size + 4,
    borderRadius: size / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: size,
    width: size,
    borderRadius: size / 2,
  },
  notAvatarText: {
    fontSize: 78,
    color: '#333333',
  },
  email: {
    fontSize: 20,
    color: '#317e9b',
  },
  placeHolder: {
    fontSize: 20,
    color: '#8b8b8b',
  },
});
