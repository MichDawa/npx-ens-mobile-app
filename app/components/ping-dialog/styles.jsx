import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  dialogContainer: {
    width: 295,
    height: 190,
    backgroundColor: '#FFFFFFCF',
    borderRadius: 20,
    padding: 15,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 15,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  italicUnderlineText: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  pingText: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    color: '#333333',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    height: 35,
    marginHorizontal: -15,
    marginBottom: -15,
  },
  button: {
    flex: 1,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noButton: {
    backgroundColor: '#E5685C',
    borderBottomLeftRadius: 20,
  },
  yesButton: {
    backgroundColor: '#00DA8A',
    borderBottomRightRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});