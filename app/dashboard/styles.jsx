import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#051B45', // Updated to match requested color
    padding: 20,
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#051B45',
  },
  iosContainer: {
    flex: 1,
    backgroundColor: '#051B45',
  },
  androidContainer: {
    flex: 1,
    backgroundColor: '#051B45',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    padding: 10,
    zIndex: 10,
    display: 'none'
  },
  backButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    marginTop: 40,
    paddingLeft: 10,
  },
  locationName: {
    fontSize: 40,
    fontWeight: '400',
    color: 'white',
    fontFamily: 'Poppins',
    letterSpacing: 0.5,
    lineHeight: 45,
  },
  countryName: {
    fontSize: 40,
    fontWeight: 'regular',
    color: 'white',
    fontFamily: 'Poppins',
    letterSpacing: 0.5,
    lineHeight: 45,
  },
  date: {
    fontSize: 14,
    color: '#ffffff80',
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
  mainWeather: {
    marginTop: 10,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: 'rgba(237, 85, 59, 0.6)',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  errorText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  weatherDisplay: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
  },
  weatherIconContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherIconLarge: {
    marginBottom: -10,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperatureContainer: {
    width: '50%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  tempSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  temperatureWrapper: {
    alignItems: 'center',
    marginTop: -20,
  },
  temperature: {
    fontSize: 90,
    fontWeight: 'bold',
    color: 'white',
  },
  conditionContainer: {
    position: 'absolute',
    bottom: -40,
    width: '100%',
    alignItems: 'center',
  },
  condition: {
    fontSize: 24,
    color: 'white',
  },
  degreeSymbol: {
    fontSize: 30,
    color: 'white',
    marginTop: 15,
  },
  riskContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  riskIndicator: {
    backgroundColor: '#ED553B',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  riskTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  floodIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: 'white',
  },
  riskText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  riskLevel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    marginTop: 15,
    backgroundColor: '#002f6c',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statIcon: {
    width: 25,
    height: 25,
    marginRight: 8,
    tintColor: 'white',
  },
  statValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  hourlyForecastContainer: {
    marginTop: 15,
    paddingBottom: 20,
    backgroundColor: '#002f6c',
    borderRadius: 20,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  hourlyForecastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  hourlyForecastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  hourlyForecastDate: {
    fontSize: 18,
    color: 'white',
  },
  hourlyForecastContent: {
    paddingHorizontal: 5,
  },
  hourlyForecastCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  hourlyForecastCard: {
    width: '23%',
    height: 150,
    backgroundColor: '#00397d',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  hourlyForecastCardActive: {
    backgroundColor: '#0056c7',
    borderWidth: 2,
    borderColor: '#4080f0',
  },
  hourlyForecastTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  hourlyForecastIconContainer: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourlyForecastTime: {
    fontSize: 16,
    color: 'white',
    marginTop: 2,
  },
  hourlyIconContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourlyItem: {
    backgroundColor: '#00397d',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    width: 80,
    height: 120,
    justifyContent: 'space-between',
  },
  hourlyItemActive: {
    backgroundColor: '#0056c7',
  },
  hourlyTemp: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  hourlyTime: {
    color: 'white',
    fontSize: 14,
  },
  hourlyTextActive: {
    fontWeight: 'bold',
  },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  locationButtonBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#539DF3', // Main blue color from the image
  },
  locationButtonIcon: {
    width: 32,
    height: 32,
    tintColor: 'white',
  },
});

export default styles; 