import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// To use these icons, you'll need to add the image files to your assets directory
// You can download weather icons from sites like https://www.flaticon.com/free-icons/weather
// or create your own and place them in assets/images/weather/

// These are placeholder paths. You'll need to replace them with the actual images
const ICON_PATHS = {
  cloudLightning: require('../../assets/images/weather/cloud-lightning.png'),
  // partlyCloudy: require('../../assets/images/weather/partly-cloudy.png'),
  // lightRain: require('../../assets/images/weather/light-rain.png'),
  // heavyRain: require('../../assets/images/weather/heavy-rain.png'),
};

export const CloudWithLightning = ({ size = 80 }) => {
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <Image
        source={ICON_PATHS.cloudLightning}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
};

export const PartlyCloudy = ({ size = 40 }) => {
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      {/* <Image
        source={ICON_PATHS.partlyCloudy}
        style={{ width: size, height: size }}
        resizeMode="contain"
      /> */}
    </View>
  );
};

export const LightRain = ({ size = 40 }) => {
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      {/* <Image
        source={ICON_PATHS.lightRain}
        style={{ width: size, height: size }}
        resizeMode="contain"
      /> */}
    </View>
  );
};

export const HeavyRain = ({ size = 40 }) => {
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      {/* <Image
        source={ICON_PATHS.heavyRain}
        style={{ width: size, height: size }}
        resizeMode="contain"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default {
  CloudWithLightning,
  PartlyCloudy,
  LightRain,
  HeavyRain,
}; 