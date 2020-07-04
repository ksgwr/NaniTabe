import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Text } from 'react-native-elements';

import SettingScreen from 'app/screens/SettingScreen';
import DishesSettingScreen from 'app/screens/DishesSettingScreen';
import AddDishScreen from 'app/screens/AddDishScreen';
import CategoriesSettingScreen from 'app/screens/CategoriesSettingScreen';
import VersionScreen from 'app/screens/VersionScreen';

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Setting';

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <Stack.Screen name="Setting" component={SettingScreen} options={{ title: '設定' }} />
            <Stack.Screen name="DishesSetting" component={DishesSettingScreen} />
            <Stack.Screen name="AddDish" component={AddDishScreen} options={{ title: '料理追加' }} />
            <Stack.Screen name="CategoriesSetting" component={CategoriesSettingScreen} options={{ title: 'カテゴリ管理' }} />
            <Stack.Screen name="Version" component={CategoriesSettingScreen} options={{ title: 'バージョン情報' }} />
        </Stack.Navigator>
    );
}