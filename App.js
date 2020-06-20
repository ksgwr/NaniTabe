import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { YellowBox } from 'react-native';
import { Provider } from "unstated";

import useCachedResources from 'app/hooks/useCachedResources';
import BottomTabNavigator from 'app/navigation/BottomTabNavigator';
import LinkingConfiguration from 'app/navigation/LinkingConfiguration';
import GlobalContainer from 'app/containers/GlobalContainer';


const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  /*
  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);
  */

  if (!isLoadingComplete) {
    return null;
  } else {
    const container = new GlobalContainer();
    container.load();
    return (
      <Provider inject={[container]}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});