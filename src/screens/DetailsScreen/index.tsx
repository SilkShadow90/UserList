import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './index.styles';
import { useAppSelector } from '../../redux/hooks';

const DetailsScreen = () => {
  const { user } = useAppSelector(state => state.userState || {});

  return (
    <View style={styles.wrapper}>
      <Text>{user?.first_name}</Text>
      <Text>{user?.last_name}</Text>
      <Text>{user?.email}</Text>
    </View>
  );
};

export default DetailsScreen;
