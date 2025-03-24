import { Platform } from 'react-native';

const mapStyle = Platform.select({
  android: [
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{ "visibility": "on" }]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [{ "visibility": "on" }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels",
      "stylers": [{ "visibility": "simplified" }]
    }
  ],
  ios: []
});

export default mapStyle;