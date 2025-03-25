import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  dialogContainer: {
    width: 295,
    height: 190,
    backgroundColor: '#FFFFFFCF',
    borderRadius: 20,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendText: {
    marginLeft: 3,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    color: '#333333',
  },
});