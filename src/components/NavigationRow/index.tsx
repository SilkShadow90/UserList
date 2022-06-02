import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NavigationScreens, RootStackParamList } from '../../types/navigationScreens';
import { Images } from '../../resources';
import { styles } from './index.styles';

type Props = {
  text: string;
  isLoading: boolean;
  navigateScreen: NavigationScreens;
  isSuccess?: boolean;
  onPress?(): void;
};

export const NavigationRow = ({ text, navigateScreen, isLoading, onPress, isSuccess }: Props) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (onPress && isSuccess) {
      navigate(navigateScreen);
    }
  }, [isSuccess, navigate, navigateScreen, onPress]);

  const toDetails = useCallback(() => {
    if (onPress && !isSuccess) {
      onPress();
    } else {
      navigate(navigateScreen);
    }
  }, [isSuccess, onPress, navigate, navigateScreen]);

  return (
    <TouchableOpacity style={styles.item} onPress={toDetails}>
      <View style={styles.textItem}>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.rightItem}>
          {isLoading ? (
            <ActivityIndicator color={'c3c3c3'} />
          ) : (
            <Image source={Images.chevron_forward} style={styles.loader} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
