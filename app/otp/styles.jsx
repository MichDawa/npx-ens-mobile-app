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
  otp: {
    marginTop: 20,
    fontSize: 12,
    color: '#004AAD',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    alignSelf: 'center',
  },
  otpPressed: {
    color: '#003077',
  },
  timer: {
    fontSize: 12,
    color: '#004AAD',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    alignSelf: 'center',
  },
  resetPressed: {
    color: '#003077',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  otpInput: {
    width: 35,
    borderWidth: 1,
    borderColor: '#004AAD',
    borderRadius: 5,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#004AAD',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 60,

  },
  timerText: {
    fontSize: 12,
    color: '#004AAD',
    fontFamily: 'Poppins-Regular',
  },
  resendText: {
    fontSize: 12,
    color: '#004AAD',
    fontFamily: 'Poppins-Bold',
    marginTop: 5,
    textDecorationLine: 'underline',
    marginBottom: 30,
  },
  resendCooldown: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
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
});
