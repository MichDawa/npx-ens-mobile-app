import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import mobileAppApiService from '../../services/mobile-app-api.service';
import * as Location from 'expo-location';

// Fallback static weather data
const defaultWeatherData = {
  location: 'Loading...',
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

export const useDashboardState = () => {
  const router = useRouter();
  const [weatherData, setWeatherData] = useState(defaultWeatherData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchWeatherData();
  }, []);
  
  const setSelectedStats = (stats) => {
    if (!stats) return;
    
    setWeatherData(prevData => ({
      ...prevData,
      stats
    }));
  };
  
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLoading(false);
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      
      const locationInfo = await getLocationName(latitude, longitude);
      
      const response = await mobileAppApiService.weather({
        latitude: latitude.toString(),
        longitude: longitude.toString()
      });
      
      if (response.data && response.data.success) {
        const forecasts = response.data.forecasts;
        
        const today = new Date();
        const options = { weekday: 'short', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-US', options);
        
        const currentHour = today.getHours();
        
        let relevantForecasts = [];
        
        const forecastsByHour = {};
        forecasts.forEach(forecast => {
          const forecastDate = new Date(forecast.date);
          const hour = forecastDate.getHours();
          forecastsByHour[hour] = forecast;
        });
        
        for (let i = 0; i < 24 && relevantForecasts.length < 4; i++) {
          const targetHour = (currentHour + i) % 24;
          if (forecastsByHour[targetHour]) {
            relevantForecasts.push({
              ...forecastsByHour[targetHour],
              hour: targetHour
            });
          }
        }
        
        if (relevantForecasts.length < 4) {
          const remainingNeeded = 4 - relevantForecasts.length;
          relevantForecasts = [
            ...relevantForecasts,
            ...forecasts.slice(0, remainingNeeded).map(f => {
              const forecastDate = new Date(f.date);
              return {
                ...f,
                hour: forecastDate.getHours()
              };
            })
          ];
        }
        
        relevantForecasts = relevantForecasts.slice(0, 4);
        
        const hourlyForecast = relevantForecasts.map((forecast, index) => {
          const formattedHour = `${forecast.hour}.00`;
          
          let icon = 'partly-cloudy';
          if (index > 0) {
            const tempDiff = forecast.temperature - relevantForecasts[index-1].temperature;
            if (tempDiff < -1) icon = 'light-rain';
            else if (tempDiff < -2) icon = 'heavy-rain';
            else if (forecast.hour >= 18 || forecast.hour < 6) icon = 'cloudy-night';
          } else if (forecast.hour >= 18 || forecast.hour < 6) {
            icon = 'cloudy-night';
          }
          
          return {
            time: formattedHour,
            temp: `${Math.round(forecast.temperature)}°C`,
            icon,
            stats: forecast.stats
          };
        });
        
        const currentTemp = Math.round(forecasts[0].temperature);
        
        const weatherStats = relevantForecasts[0]?.stats || {
          humidity: '6%',
          pressure: '90%',
          windSpeed: '19 km/h'
        };
        
        setWeatherData({
          ...weatherData,
          location: locationInfo,
          date: formattedDate,
          temperature: currentTemp,
          condition: determineCondition(currentTemp, forecasts),
          stats: weatherStats,
          hourlyForecast
        });
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };
  
  const getLocationName = async (latitude, longitude) => {
    try {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      
      if (reverseGeocode && reverseGeocode.length > 0) {
        const { city, region, country } = reverseGeocode[0];
        if (city) {
          return `${city}, ${country}`;
        } else if (region) {
          return `${region}, ${country}`;
        }
      }
      
      return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    } catch (error) {
      console.error('Error getting location name:', error);
      return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    }
  };
  
  const determineCondition = (temp, forecasts) => {
    const tempChanges = forecasts.slice(0, 8).map((f, i) => {
      if (i === 0) return 0;
      return f.temperature - forecasts[i-1].temperature;
    });
    
    const hasSignificantDrop = tempChanges.some(change => change < -3);
    
    if (hasSignificantDrop) return 'Rainy';
    if (temp > 32) return 'Sunny';
    if (temp > 28) return 'Partly Cloudy';
    return 'Cloudy';
  };
  
  return {
    weatherData,
    loading,
    error,
    refreshWeather: fetchWeatherData,
    setSelectedStats,
    navigateTo: (route) => router.push(route)
  };
}; 