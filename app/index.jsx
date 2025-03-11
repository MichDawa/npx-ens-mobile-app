import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import HomePage from './homescreen/index';

const StackNavigator = () => (
  <Stack>
    <Stack.Screen 
      name="homescreen/index"
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="login/index"
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="sign-up/index"
      options={{ headerShown: false }}
    />
  </Stack>
);

const loadFonts = async () => {
  await Font.loadAsync({
    'AbrilFatface-Regular': require('../assets/fonts/AbrilFatface-Regular.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });
};

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return <HomePage />;
}