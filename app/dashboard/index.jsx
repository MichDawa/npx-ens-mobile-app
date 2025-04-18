import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CloudWithLightning, PartlyCloudy, LightRain, HeavyRain } from './WeatherIcons';

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
      { time: '18.00', temp: '23°C', icon: 'partly-cloudy' }
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
            {renderWeatherIcon(hour.icon, 40)}
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
      default:
        return <PartlyCloudy size={size} />;
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
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
      
      {/* Location and Date */}
      <View style={styles.header}>
        <Text style={styles.location}>{weatherData.location}</Text>
        <Text style={styles.date}>{weatherData.date}</Text>
      </View>

      {/* Main Weather Display */}
      <View style={styles.mainWeather}>
        <View style={styles.weatherDisplay}>
          <View style={styles.weatherIconLarge}>
            <CloudWithLightning size={200} />
          </View>
          
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

      {/* Flood Risk Indicator */}
      <View style={styles.riskContainer}>
        <View style={styles.riskIndicator}>
          <Text style={styles.riskText}>Flood Risk Level</Text>
          <Text style={styles.riskLevel}>{weatherData.floodRisk.level}</Text>
        </View>
      </View>

      {/* Weather Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>💧</Text>
          <Text style={styles.statValue}>{weatherData.stats.humidity}</Text>
        </View>
        <View style={styles.statDivider}></View>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>🌡️</Text>
          <Text style={styles.statValue}>{weatherData.stats.pressure}</Text>
        </View>
        <View style={styles.statDivider}></View>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>💨</Text>
          <Text style={styles.statValue}>{weatherData.stats.windSpeed}</Text>
        </View>
      </View>

      {/* Hourly Forecast */}
      <View style={styles.hourlyContainer}>
        <View style={styles.hourlyHeader}>
          <Text style={styles.hourlyTitle}>Today</Text>
          <Text style={styles.hourlyDate}>Mar, 9</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
          <View style={styles.hourlyItems}>
            {renderHourlyForecast()}
          </View>
        </ScrollView>
      </View>

      {/* Location Button */}
      <TouchableOpacity style={styles.locationButton}>
        <Text style={styles.locationIcon}>📍</Text>
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
  },
  backButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    marginTop: 40,
  },
  location: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  date: {
    fontSize: 16,
    color: '#ffffff90',
    fontFamily: 'Poppins-Regular',
  },
  mainWeather: {
    marginTop: 20,
  },
  weatherDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherIconLarge: {
    width: 200,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  tempSection: {
    alignItems: 'flex-start',
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
    marginTop: 30,
    alignItems: 'center',
  },
  riskIndicator: {
    backgroundColor: '#ED553B',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
    marginTop: 20,
    backgroundColor: '#00397d',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    fontSize: 18,
    marginBottom: 5,
  },
  statValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#ffffff50',
  },
  hourlyContainer: {
    marginTop: 20,
    flex: 1,
  },
  hourlyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  hourlyTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hourlyDate: {
    color: 'white',
    fontSize: 18,
  },
  hourlyScroll: {
    
  },
  hourlyItems: {
    flexDirection: 'row',
    paddingBottom: 10,
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
  hourlyIconContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2596be',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 24,
  },
});

export default WeatherDashboard; 