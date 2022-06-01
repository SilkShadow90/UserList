import * as React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import {
  NavigationScreens,
  RootStackParamList,
} from './src/shared/navigationScreens';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name={NavigationScreens.Home}
            component={HomeScreen}
            options={{ title: 'Список пользователей' }}
          />
          <RootStack.Screen
            name={NavigationScreens.Details}
            component={DetailsScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
