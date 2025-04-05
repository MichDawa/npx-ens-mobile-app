import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 65 : 124,
    left: 0,
    right: 0,
    bottom: 0,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    padding: 20,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  pingContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 1,
    elevation: Platform.OS === 'android' ? 50 : 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyOverlay: {
    justifyContent: 'flex-end',
  },
  calloutContainer: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    marginBottom: -100,
  },
  calloutTitle: {
    fontFamily: 'SF-Pro-Display-Regular',
    fontWeight: '500',
    fontSize: 15,
  },
  customCallout: {
    padding: 0,
    margin: 0,
  },
  icon: {
    marginRight: 10,
  },
  calloutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iosContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  androidContainer: {
    flex: 1,
    backgroundColor: '#051B45',
  },
  androidEmergencyContainer: {
    backgroundColor: '#922418',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});