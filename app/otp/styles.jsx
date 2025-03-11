import { StyleSheet } from 'react-native';

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
  signUpSubtitlePressed: {
    color: '#003077',
  },
});
