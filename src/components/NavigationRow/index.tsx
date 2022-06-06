import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { NavigationScreens, RootStackParamList } from '../../types';
import { Images } from '../../resources';
import { styles } from './index.styles';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  text: string;
  isLoading: boolean;
  navigateScreen: NavigationScreens;
  onPress?(): void;
};

export type NavigationRowRef = {
  handle(): void;
};

const renderNavigationRow = forwardRef<NavigationRowRef, Props>(
  ({ text, navigateScreen, isLoading, onPress }: Props, ref) => {
    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
    const theme = useTheme();

    useImperativeHandle(
      ref,
      () => ({
        handle: () => {
          navigate(navigateScreen);
        },
      }),
      [navigate, navigateScreen],
    );

    const toDetails = useCallback(() => {
      if (onPress) {
        onPress();
      } else {
        navigate(navigateScreen);
      }
    }, [onPress, navigate, navigateScreen]);

    return (
      <TouchableOpacity style={[theme.shadow, theme.buttonColor, styles.item]} onPress={toDetails}>
        <View style={styles.textItem}>
          <Text style={theme.text}>{text}</Text>
          <View style={styles.rightItem}>
            {isLoading ? (
              <ActivityIndicator color={theme.loader.color} />
            ) : (
              <Image source={Images.chevron_forward} style={theme.icon} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

export const NavigationRow = React.memo(renderNavigationRow);
