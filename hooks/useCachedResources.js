import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { AsyncStorage } from 'react-native';

import Categories from 'app/constants/Categories';
import Dishes from 'app/constants/Dishes';
import 'app/global.js';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        const fontFuture = Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        // initialzie global
        const categoriesFuture = AsyncStorage.getItem('categories');
        const dishesFuture = AsyncStorage.getItem('dishes');

        global.categories = await categoriesFuture || Categories;
        global.dishes = await dishesFuture || Dishes;

        // wait all
        await fontFuture;
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
