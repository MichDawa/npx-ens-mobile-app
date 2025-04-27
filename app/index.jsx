import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, Platform, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import HomePage from './homescreen/index';

const { width, height } = Dimensions.get('window');

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
    <Stack.Screen 
      name="maps-location/index"
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="location-form/index"
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="dashboard/index"
      options={{ headerShown: false }}
    />
  </Stack>
);

const loadFonts = async () => {
  await Font.loadAsync({
    'AbrilFatface-Regular': require('../assets/fonts/AbrilFatface-Regular.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'SF-Pro-Display-Regular': require('../assets/fonts/SF-Pro-Display-Regular.otf'),
    'SF-Pro-Display-Bold': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
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

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.absoluteFill}>
        {Platform.OS === 'ios' ? (
          <SafeAreaView style={styles.iosSafeArea}>
            <HomePage />
          </SafeAreaView>
        ) : (
          <HomePage />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F5FCFF',
  },
  iosSafeArea: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: Platform.OS === 'ios' ? 16 : 0,
  },
});