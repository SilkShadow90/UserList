import { StyleSheet, useColorScheme } from 'react-native';
import { useMemo } from 'react';

export const useTheme = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = useMemo(
    () =>
      ({
        wrapper: {
          flex: 1,
        },
        centeredWrapper: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        shadow: {
          shadowColor: '#8b8b8b',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,

          elevation: 4,
        },
        title: {
          color: isDarkMode ? '#f3f3f3' : '#333333',
          fontSize: 24,
        },
        text: {
          color: isDarkMode ? '#f3f3f3' : '#333333',
          fontSize: 20,
        },
        placeholder: {
          color: isDarkMode ? '#f3f3f340' : '#8b8b8b',
          fontSize: 20,
        },
        placeholderBackground: {
          backgroundColor: isDarkMode ? '#b2b2b212' : '#b2b2b222',
        },
        buttonColor: {
          backgroundColor: isDarkMode ? '#0a78ffcc' : '#c3c3c3',
        },
        icon: {
          width: 30,
          height: 30,
          tintColor: isDarkMode ? '#f3f3f3' : '#333333',
        },
        loader: {
          color: isDarkMode ? '#f3f3f3' : '#333333',
        },
      } as const),
    [isDarkMode],
  );

  return StyleSheet.create(styles);
};
