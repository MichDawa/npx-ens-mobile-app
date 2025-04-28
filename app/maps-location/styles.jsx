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
  loadingMarker: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingMarkerText: {
    color: '#ffffff',
    marginTop: 5,
    fontSize: 12,
  },
  warningMarker: {
    backgroundColor: 'rgba(255, 59, 48, 0.8)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
  },
  warningMarkerText: {
    color: '#ffffff',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: 'bold',
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