import { Dimensions, StyleSheet } from 'react-native';

const defaultSize = Dimensions.get('window').width - 180;

export const getStyles = (size: number = defaultSize) =>
  StyleSheet.create({
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
