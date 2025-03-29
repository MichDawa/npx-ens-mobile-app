import { StyleSheet, Dimensions } from 'react-native';
import { Platform } from 'react-native';
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
    flex: 1,
    width: '100%',
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
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 999,
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
});