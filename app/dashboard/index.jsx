import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { 
  CloudWithLightning, 
  PartlyCloudy, 
  LightRain, 
  HeavyRain, 
  Thunderstorm,
  CloudyNight 
} from './WeatherIcons';
import styles from './styles';

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

export default WeatherDashboard; 