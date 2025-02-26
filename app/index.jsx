import LoginPage from './login';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const getFonts = () =>
  Font.loadAsync({
    'AbrilFatface-Regular': require('../assets/fonts/AbrilFatface-Regular.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading 
        startAsync={getFonts} 
        onFinish={() => setFontsLoaded(true)}
        onError={(error) => console.error('Error loading fonts:', error)}
      />
    );
  }

  return <LoginPage />;
}
