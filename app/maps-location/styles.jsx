import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

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
});