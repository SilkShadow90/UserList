import * as React from 'react';
import { SafeAreaView, StatusBar, useColorScheme, StyleSheet } from 'react-native';

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { HomeScreen, DetailsScreen } from './src/screens';
import { NavigationScreens, RootStackParamList } from './src/types';
import { Strings } from './src/resources';
import store from './src/redux';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.wrapper}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
          <RootStack.Navigator screenOptions={{ headerBackTitle: Strings.global.back }}>
            <RootStack.Screen
              name={NavigationScreens.Home}
              component={HomeScreen}
              options={{ title: Strings.screenNames.Home }}
            />
            <RootStack.Screen
              name={NavigationScreens.Details}
              component={DetailsScreen}
              options={{ title: Strings.screenNames.Details }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
