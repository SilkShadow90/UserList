/**
 * @name useTheme
 * @description хук для получения основных стилей приложения и реакции на смену темы
 */

import { Platform, StyleSheet, useColorScheme } from 'react-native';
import { useMemo } from 'react';
import { Colors, ColorSchemes } from '../resources';

export const useTheme = () => {
  const mode: ColorSchemes = useColorScheme() === 'dark' ? ColorSchemes.dark : ColorSchemes.default;

  const styles = useMemo(
    () =>
      ({
        wrapper: {
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 0 : 56,
          overflow: 'visible',
        },
        centeredWrapper: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        shadow: {
          shadowColor: Colors[mode].placeholder,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,

          elevation: 4,
        },
        title: {
          color: Colors[mode].primary,
          fontSize: 24,
        },
        text: {
          color: Colors[mode].primary,
          fontSize: 20,
        },
        placeholder: {
          color: Colors[mode].placeholder,
          fontSize: 20,
        },
        placeholderBackground: {
          backgroundColor: Colors[mode].placeholderBackground,
        },
        buttonColor: {
          backgroundColor: Colors[mode].accent,
        },
        icon: {
          width: 30,
          height: 30,
          tintColor: Colors[mode].primary,
        },
        loader: {
          color: Colors[mode].primary,
        },
        link: {
          color: Colors[mode].link,
        },
      } as const),
    [mode],
  );

  return StyleSheet.create(styles);
};
