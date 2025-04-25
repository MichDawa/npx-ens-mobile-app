import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// To use these icons, you'll need to add the image files to your assets directory
// You can download weather icons from sites like https://www.flaticon.com/free-icons/weather
// or create your own and place them in assets/images/weather/

// These are placeholder paths. You'll need to replace them with the actual images
const ICON_PATHS = {
  cloudLightning: require('../../assets/images/weather/cloud-lightning.png'),
  thunderstorm: require('../../assets/images/weather/thunderstorm.png'),
  cloudyRain: require('../../assets/images/weather/cloudy-rain.png'),
  cloudy: require('../../assets/images/weather/cloudy.png'),
  cloudyNight: require('../../assets/images/weather/cloudy-night.png'),
};

// Helper component to properly display weather icons with transparent background
const WeatherIcon = ({ source, size, style }) => {
  return (
    <View style={[
      styles.weatherIconWrapper,
      { width: size, height: size },
      style
    ]}>
      <Image
        source={source}
        style={{
          width: size,
          height: size,
          resizeMode: 'cover',
        }}
      />
    </View>
  );
};

export const CloudWithLightning = ({ size = 80 }) => {
  return (
    <WeatherIcon 
      source={ICON_PATHS.cloudLightning}
      size={size}
    />
  );
};

export const Thunderstorm = ({ size = 40 }) => {
  return (
    <WeatherIcon 
      source={ICON_PATHS.thunderstorm}
      size={size}
    />
  );
};

export const PartlyCloudy = ({ size = 40 }) => {
  return (
    <WeatherIcon 
      source={ICON_PATHS.cloudy}
      size={size}
    />
  );
};

export const LightRain = ({ size = 40 }) => {
  return (
    <WeatherIcon 
      source={ICON_PATHS.cloudyRain}
      size={size}
    />
  );
};

export const HeavyRain = ({ size = 40 }) => {
  return (
    <WeatherIcon 
      source={ICON_PATHS.cloudyRain}
      size={size}
    />
  );
};

export const CloudyNight = ({ size = 40 }) => {
  return (
    <WeatherIcon 
      source={ICON_PATHS.cloudyNight}
      size={size}
    />
  );
};

const styles = StyleSheet.create({
  weatherIconWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderRadius: 8,
  },
});

export default {
  CloudWithLightning,
  Thunderstorm,
  PartlyCloudy,
  LightRain,
  HeavyRain,
  CloudyNight,
}; 