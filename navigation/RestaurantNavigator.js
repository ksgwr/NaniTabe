import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import MainScreen from '../screens/MainScreen';
import FilterScreen from '../screens/FilterScreen';

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Restaurant';

export default function StackNavigator({ navigation, route }) {
    navigation.setOptions({
        header: null,
        headerTitleStyle: { flex: 1, textAlign: 'center' }
    });

    return (
        <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <Stack.Screen name="Restaurant" options={{ title: '外食' }} >
                {props => <MainScreen {...props} target="外食" />}
            </Stack.Screen>
            <Stack.Screen name="Filter" component={FilterScreen} options={{ title: '絞り込み条件' }} />
        </Stack.Navigator>
    );
}