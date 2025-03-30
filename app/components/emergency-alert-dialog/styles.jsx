import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '90%',
    height: 194,
  },
  gradientContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    backgroundColor: '#EF311D',
    backgroundImage: 'linear-gradient(180deg, #EF311D 0%, #CB483C 100%)',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'SF-Pro-Display-Bold',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'SF-Pro-Display-Regular',
    textAlign: 'center',
    marginHorizontal: Platform.OS === 'android' ? 25 : 50,
  },
  boldText: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: 'bold',
  },
});
