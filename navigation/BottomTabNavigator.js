import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from 'app/components/TabBarIcon';
import HomeNavigator from 'app/navigation/HomeNavigator';
import RestaurantNavigator from 'app/navigation/RestaurantNavigator';
import SettingNavigator from 'app/navigation/SettingNavigator';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerShown: false
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          title: 'お家',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Restaurant"
        component={RestaurantNavigator}
        options={{
          title: '外食',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-restaurant" />,
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={SettingNavigator}
        options={{
          title: '設定',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-settings" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'お家';
    case 'Restaurant':
      return '外食';
    case 'Setting':
      return '設定'
  }
}
