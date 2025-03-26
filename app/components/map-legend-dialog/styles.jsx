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
  iconsContainer: {
    marginTop: 5,
  },
  iconMgn: {
    marginLeft: 1.5,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: {
    marginLeft: 12,
    marginTop: -12,
  },
  title: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '700',
    fontSize: 14,
    color: '#333333',
  },
  description: {
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 12,
    color: '#333333',
    width: 170,
    textAlign: 'justify',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 14,
  },
  textContainer: {
    marginLeft: 12,
    marginTop: -12,
    flexShrink: 1,
  },
});