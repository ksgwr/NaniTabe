import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Text } from 'react-native-elements';

import SettingScreen from 'app/screens/SettingScreen';
import DishesSettingScreen from 'app/screens/DishesSettingScreen';
import AddDishScreen from 'app/screens/AddDishScreen';
import UpdateDishScreen from 'app/screens/UpdateDishScreen';
import CategoriesSettingScreen from 'app/screens/CategoriesSettingScreen';
import AddCategoryScreen from 'app/screens/AddCategoryScreen';
import UpdateCategoryScreen from 'app/screens/UpdateCategoryScreen';
import VersionScreen from 'app/screens/VersionScreen';

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Setting';

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <Stack.Screen name="Setting" component={SettingScreen} options={{ title: '設定' }} />
            <Stack.Screen name="DishesSetting" component={DishesSettingScreen} />
            <Stack.Screen name="AddDish" component={AddDishScreen} options={{ title: '料理追加' }} />
            <Stack.Screen name="UpdateDish" component={UpdateDishScreen} options={{ title: '料理編集' }} />
            <Stack.Screen name="CategoriesSetting" component={CategoriesSettingScreen} options={{ title: 'カテゴリ管理' }} />
            <Stack.Screen name="AddCategory" component={AddCategoryScreen} options={{ title: 'カテゴリ追加' }} />
            <Stack.Screen name="UpdateCategory" component={UpdateCategoryScreen} options={{ title: 'カテゴリ編集' }} />
            <Stack.Screen name="Version" component={VersionScreen} options={{ title: 'バージョン情報' }} />
        </Stack.Navigator>
    );
}