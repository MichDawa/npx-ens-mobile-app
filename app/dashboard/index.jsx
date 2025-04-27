import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Platform, StatusBar, SafeAreaView } from 'react-native';
import { 
  CloudWithLightning, 
  PartlyCloudy, 
  LightRain, 
  HeavyRain, 
  Thunderstorm,
  CloudyNight 
} from './WeatherIcons';
import styles from './styles';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDashboardState } from "../../store/state/dashboard-state";
import { useLoginNavigation } from "../../store/state/login-state";

// Import icons
const floodIcon = require('../../assets/images/icons/flood.png');
const rainDropsIcon = require('../../assets/images/icons/rain-drops.png');
const temperatureIcon = require('../../assets/images/icons/temperature.png');
const windIcon = require('../../assets/images/icons/winds.png');
const mapPinIcon = require('../../assets/images/map-pin.png');

const WeatherDashboard = () => {
  const { weatherData, navigateTo } = useDashboardState();
  const { loginApiResponse } = useLoginNavigation();
  const params = useLocalSearchParams();
  const loginFormData = loginApiResponse || params.loginApiResponse;

  console.log('loginFormData', loginFormData);
  // Move helper functions inside the component
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
    
    return <CloudWithLightning size={180} />;
  };

  const renderWeatherIcon = (iconType, size = 40) => {
    switch(iconType) {
      case 'partly-cloudy': return <PartlyCloudy size={size} />;
      case 'light-rain': return <LightRain size={size} />;
      case 'heavy-rain': return <HeavyRain size={size} />;
      case 'thunderstorm': return <Thunderstorm size={size} />;
      case 'cloudy-night': return <CloudyNight size={size} />;
      default: return <PartlyCloudy size={size} />;
    }
  };

  const renderContent = () => (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigateTo('/')}
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
      <TouchableOpacity 
        style={styles.locationButton} 
        onPress={() => navigateTo({
          pathname: '/maps-location',
          params: { 
            loginFormData
          }
        })}
      >
        <View style={styles.locationButtonBackground}>
          <Image source={mapPinIcon} style={styles.locationButtonIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar
        translucent={Platform.OS === 'ios'}
        backgroundColor="#051B45"
        barStyle="light-content"
      />
      {Platform.OS === 'ios' ? (
        <View style={styles.absoluteFill}>
          <SafeAreaView style={styles.iosContainer}>
            {renderContent()}
          </SafeAreaView>
        </View>
      ) : (
        <View style={styles.androidContainer}>
          {renderContent()}
        </View>
      )}
    </>
  );
};

export default WeatherDashboard; 