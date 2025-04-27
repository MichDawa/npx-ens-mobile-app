import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 50,
    fontFamily: 'Poppins-Bold',
    flexDirection: 'row',
    color: '#004AAD',
  },
  buttonContainer: {
    flexDirection: 'col',
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: 300,
    backgroundColor: '#004AAD',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
  },
  nextColor: {
    color: 'white',
  },
  inputContainer: {
    position: 'relative',
    marginVertical: 20,
    width: 300,
  },
  inputLabel: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#004AAD',
    fontFamily: 'Poppins-Regular',
    zIndex: 1,
  },
  inputField: {
    borderWidth: 2,
    borderColor: '#004AAD',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  signUpSubtitle: {
    marginTop: 20,
    fontSize: 12,
    color: '#004AAD',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    alignSelf: 'center',
  },
  signUpSubtitlePressed: {
    color: '#003077',
  },
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
  disabledButton: {
    backgroundColor: '#CCCCCC',
    opacity: 0.7,
  },
});
