import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  NavigationScreens,
  RootStackParamList,
} from '../../shared/navigationScreens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { styles } from './index.styles';

type Props = NativeStackScreenProps<RootStackParamList, NavigationScreens.Home>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text>Home Screen</Text>
      <Pressable onPress={() => navigation.navigate(NavigationScreens.Details)}>
        <Text>Details</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
