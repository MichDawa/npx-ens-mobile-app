import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 150,
    fontFamily: 'AbrilFatface-Regular',
    flexDirection: 'row',
  },
  eLetter: {
    color: '#004aad',
  },
  nLetter: {
    color: '#5271ff',
  },
  sLetter: {
    color: '#38b6ff',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 40,
    marginTop: -30,
    fontFamily: 'Poppins-Regular',
    color: '#004aad',
  },
  buttonContainer: {
    flexDirection: 'col',
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 100,
    backgroundColor: '#5271ff',
  },
  signUpButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
    fontFamily: 'Poppins-Bold',
  },
  loginColor: {
    color: 'white',
  },
  SignUpColor: {
    color: 'black',
  },
});
