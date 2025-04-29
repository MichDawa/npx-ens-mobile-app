import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Platform, StatusBar, SafeAreaView, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
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
import hardwareData from "../../assets/hardware-data";
import { LinearGradient } from 'expo-linear-gradient';

// Import icons
const floodIcon = require('../../assets/images/icons/flood.png');
const rainDropsIcon = require('../../assets/images/icons/rain-drops.png');
const temperatureIcon = require('../../assets/images/icons/temperature.png');
const windIcon = require('../../assets/images/icons/winds.png');
const mapPinIcon = require('../../assets/images/map-pin.png');
const warningIcon = require('../../assets/images/icons/flood.png');

// FloodWarning component
const FloodWarning = ({ data, navigateTo }) => {
  // Find the highest risk area from hardware data
  const highRiskArea = data.find(area => area.sensorValue === "HIGH RISK") || data[0];
  
  return (
    <TouchableOpacity 
      style={styles.floodWarning.container}
      onPress={() => navigateTo('/flood-warning')}
    >
      <View style={styles.floodWarning.header}>
        <View style={styles.floodWarning.titleContainer}>
          <Image source={warningIcon} style={styles.floodWarning.warningIcon} />
          <Text style={styles.floodWarning.title}>Flood Possibility Warning</Text>
        </View>
        <Text style={styles.floodWarning.time}>
          {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </Text>
      </View>
      <View style={styles.floodWarning.body}>
        <Text style={styles.floodWarning.message}>
          <Text style={{fontWeight: 'bold'}}>{highRiskArea.location}</Text> is at high flood risk, with water levels rising and impact expected in 1 hour. 
          Residents should seek shelter at the nearest evacuation center and avoid other flooded areas near you.
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const WeatherDashboard = () => {
  const { weatherData, loading, error, refreshWeather, navigateTo, setSelectedStats } = useDashboardState();
  const { loginApiResponse } = useLoginNavigation();
  const params = useLocalSearchParams();
  const loginFormData = loginApiResponse || params.loginApiResponse;
  const [selectedForecastIndex, setSelectedForecastIndex] = useState(0);

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
    
    if (condition.includes('sunny')) {
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

  // Select a forecast and update its stats
  const handleForecastSelect = (forecast, index) => {
    setSelectedForecastIndex(index);
    if (forecast.stats) {
      setSelectedStats(forecast.stats);
    }
  };

  const renderContent = () => (
    <LinearGradient
      colors={['#051B45', '#0B42AB']}
      style={{ 
        flex: 1, 
        borderRadius: 0,
        marginTop: -10 
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView 
        style={[styles.container, { backgroundColor: 'transparent' }]}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refreshWeather}
            colors={['#fff']}
            tintColor="#fff"
          />
        }
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigateTo('/')}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.header}>
          {loading && !weatherData.location ? (
            <Text style={styles.locationName}>Loading location...</Text>
          ) : (
            <>
              {weatherData.location.includes(',') ? (
                <>
                  <Text style={styles.locationName}>{weatherData.location.split(',')[0]},</Text>
                  <Text style={styles.countryName}>{weatherData.location.split(',')[1].trim()}</Text>
                </>
              ) : (
                <Text style={styles.locationName}>{weatherData.location}</Text>
              )}
            </>
          )}
          <Text style={styles.date}>{weatherData.date}</Text>
        </View>

        <View style={styles.mainWeather}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            <View style={styles.weatherDisplay}>
              <View style={styles.weatherIconContainer}>
                <View style={styles.weatherIconLarge}>
                  {getMainWeatherIcon()}
                </View>
              </View>
              
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
          )}
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <FloodWarning data={hardwareData} navigateTo={navigateTo} />

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

        <View style={styles.hourlyForecastContainer}>
          <View style={styles.hourlyForecastHeader}>
            <Text style={styles.hourlyForecastTitle}>Today</Text>
            <Text style={styles.hourlyForecastDate}>
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </Text>
          </View>
          <View style={styles.hourlyForecastContent}>
            <View style={styles.hourlyForecastCards}>
              {weatherData.hourlyForecast.map((hour, index) => {
                const hourValue = parseInt(hour.time.split('.')[0]);
                
                const currentHour = new Date().getHours();
                
                let closestHourIndex = 0;
                let smallestDiff = 24;
                
                weatherData.hourlyForecast.forEach((forecast, idx) => {
                  const forecastHour = parseInt(forecast.time.split('.')[0]);
                  let diff = Math.abs(forecastHour - currentHour);
                  if (diff > 12) diff = 24 - diff;
                  
                  if (diff < smallestDiff) {
                    smallestDiff = diff;
                    closestHourIndex = idx;
                  }
                });
                
                const isActive = index === selectedForecastIndex || 
                  (selectedForecastIndex === null && index === closestHourIndex);
                
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={[
                      styles.hourlyForecastCard,
                      isActive && styles.hourlyForecastCardActive
                    ]}
                    onPress={() => handleForecastSelect(hour, index)}
                  >
                    <Text style={styles.hourlyForecastTemp}>{hour.temp}</Text>
                    <View style={styles.hourlyForecastIconContainer}>
                      {renderWeatherIcon(hour.icon, 60)}
                    </View>
                    <Text style={styles.hourlyForecastTime}>{hour.time}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

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
      </ScrollView>
    </LinearGradient>
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
          <SafeAreaView style={[styles.iosContainer, { backgroundColor: 'transparent' }]}>
            <LinearGradient
              colors={['#051B45', '#0B42AB']}
              style={{ flex: 1, borderRadius: 0 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              {renderContent()}
            </LinearGradient>
          </SafeAreaView>
        </View>
      ) : (
        <LinearGradient
          colors={['#051B45', '#0B42AB']}
          style={{ 
            flex: 1, 
            borderRadius: 0,
            marginTop: -10 
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={[styles.androidContainer, { backgroundColor: 'transparent' }]}>
            {renderContent()}
          </View>
        </LinearGradient>
      )}
    </>
  );
};

export default WeatherDashboard; 