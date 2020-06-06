import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import HomeScreen from '../screens/HomeScreen';
import FilterScreen from '../screens/FilterScreen';

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function StackNavigator({ navigation, route }) {
    navigation.setOptions({
        header: null,
        headerTitleStyle: { flex: 1, textAlign: 'center' }
    });

    return (
        <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'お家' }} />
            <Stack.Screen name="Filter" component={FilterScreen} options={{ title: '絞り込み条件' }} />
        </Stack.Navigator>
    );
}