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
  },
});
