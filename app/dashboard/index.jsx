import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { 
  CloudWithLightning, 
  PartlyCloudy, 
  LightRain, 
  HeavyRain, 
  Thunderstorm,
  CloudyNight 
} from './WeatherIcons';

// Import icons
const floodIcon = require('../../assets/images/icons/flood.png');
const rainDropsIcon = require('../../assets/images/icons/rain-drops.png');
const temperatureIcon = require('../../assets/images/icons/temperature.png');
const windIcon = require('../../assets/images/icons/winds.png');
const mapPinIcon = require('../../assets/images/map-pin.png');

const WeatherDashboard = ({ onBack }) => {
  // Mock data (would be fetched from API in real application)
  const weatherData = {
    location: 'Surigao, Philippines',
    date: 'Sun, March 9',
    temperature: 19,
    condition: 'Rainy',
    floodRisk: { level: 'High Risk' },
    stats: {
      humidity: '6%',
      pressure: '90%',
      windSpeed: '19 km/h'
    },
    hourlyForecast: [
      { time: '15.00', temp: '29°C', icon: 'partly-cloudy' },
      { time: '16.00', temp: '26°C', icon: 'light-rain' },
      { time: '17.00', temp: '24°C', icon: 'heavy-rain' },
      { time: '18.00', temp: '23°C', icon: 'cloudy-night' }
    ]
  };

  const renderHourlyForecast = () => {
    return weatherData.hourlyForecast.map((hour, index) => {
      const isActive = hour.time === '17.00'; // For highlighting the active hour
      return (
        <View 
          key={index} 
          style={[
            styles.hourlyItem, 
            isActive && styles.hourlyItemActive
          ]}
        >
          <Text style={[styles.hourlyTemp, isActive && styles.hourlyTextActive]}>{hour.temp}</Text>
          <View style={styles.hourlyIconContainer}>
            {renderWeatherIcon(hour.icon, 100)}
          </View>
          <Text style={[styles.hourlyTime, isActive && styles.hourlyTextActive]}>{hour.time}</Text>
        </View>
      );
    });
  };

  const renderWeatherIcon = (iconType, size = 40) => {
    switch(iconType) {
      case 'partly-cloudy':
        return <PartlyCloudy size={size} />;
      case 'light-rain':
        return <LightRain size={size} />;
      case 'heavy-rain':
        return <HeavyRain size={size} />;
      case 'thunderstorm':
        return <Thunderstorm size={size} />;
      case 'cloudy-night':
        return <CloudyNight size={size} />;
      default:
        return <PartlyCloudy size={size} />;
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  // Determine current weather icon based on condition
  const getMainWeatherIcon = () => {
    const condition = weatherData.condition.toLowerCase();
    
    if (condition.includes('rain') || condition.includes('rainy')) {
      return <CloudWithLightning size={180} />;
    }
    
    if (condition.includes('thunder') || condition.includes('lightning')) {
      return <Thunderstorm size={180} />;
    }
    
    if (condition.includes('cloud')) {
      return <PartlyCloudy size={180} />;
    }
    
    // Default
    return <CloudWithLightning size={180} />;
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={handleBack}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      
      {/* Location and Date - Updated to match the image */}
      <View style={styles.header}>
        <Text style={styles.locationName}>Surigao,</Text>
        <Text style={styles.countryName}>Philippines</Text>
        <Text style={styles.date}>{weatherData.date}</Text>
      </View>

      {/* Main Weather Display */}
      <View style={styles.mainWeather}>
        <View style={styles.weatherDisplay}>
          {/* Weather Icon - 50% width */}
          <View style={styles.weatherIconContainer}>
            <View style={styles.weatherIconLarge}>
              {getMainWeatherIcon()}
            </View>
          </View>
          
          {/* Temperature Section - 50% width */}
          <View style={styles.temperatureContainer}>
            <View style={styles.tempSection}>
              <View style={styles.tempContainer}>
                <View style={styles.temperatureWrapper}>
                  <Text style={styles.temperature}>{weatherData.temperature}</Text>
                  <View style={styles.conditionContainer}>
                    <Text style={styles.condition}>{weatherData.condition}</Text>
                  </View>
                </View>
                <Text style={styles.degreeSymbol}>°C</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Flood Risk Indicator - Updated to match image */}
      <View style={styles.riskContainer}>
        <View style={styles.riskIndicator}>
          <View style={styles.riskTextContainer}>
            <Image source={floodIcon} style={styles.floodIcon} />
            <Text style={styles.riskText}>Flood Risk Level</Text>
          </View>
          <Text style={styles.riskLevel}>{weatherData.floodRisk.level}</Text>
        </View>
      </View>

      {/* Weather Statistics - Updated to match image */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Image source={rainDropsIcon} style={styles.statIcon} />
          <Text style={styles.statValue}>{weatherData.stats.humidity}</Text>
        </View>
        <View style={styles.statItem}>
          <Image source={temperatureIcon} style={styles.statIcon} />
          <Text style={styles.statValue}>{weatherData.stats.pressure}</Text>
        </View>
        <View style={styles.statItem}>
          <Image source={windIcon} style={styles.statIcon} />
          <Text style={styles.statValue}>{weatherData.stats.windSpeed}</Text>
        </View>
      </View>

      {/* Hourly Forecast - Redesigned to match the image */}
      <View style={styles.hourlyForecastContainer}>
        <View style={styles.hourlyForecastHeader}>
          <Text style={styles.hourlyForecastTitle}>Today</Text>
          <Text style={styles.hourlyForecastDate}>Mar, 9</Text>
        </View>
        <View style={styles.hourlyForecastContent}>
          <View style={styles.hourlyForecastCards}>
            {weatherData.hourlyForecast.map((hour, index) => {
              const isActive = hour.time === '17.00';
              return (
                <View 
                  key={index} 
                  style={[
                    styles.hourlyForecastCard,
                    isActive && styles.hourlyForecastCardActive
                  ]}
                >
                  <Text style={styles.hourlyForecastTemp}>{hour.temp}</Text>
                  <View style={styles.hourlyForecastIconContainer}>
                    {renderWeatherIcon(hour.icon, 100)}
                  </View>
                  <Text style={styles.hourlyForecastTime}>{hour.time}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* Location Button */}
      <TouchableOpacity style={styles.locationButton}>
        <View style={styles.locationButtonBackground}>
          <Image source={mapPinIcon} style={styles.locationButtonIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00295c', // Dark blue background
    padding: 20,
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
  },
  temperature: {
    fontSize: 90,
    fontWeight: 'bold',
    color: 'white',
  },
  conditionContainer: {
    position: 'absolute',
    bottom: -25,
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
  
  // Hourly Forecast - New styles matching the image
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

export default WeatherDashboard; 