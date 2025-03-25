import { Platform } from 'react-native';

const mapStyle = Platform.select({
  android: [
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{ "visibility": "off" }]
    }
  ],
  ios: []
});

export default mapStyle;