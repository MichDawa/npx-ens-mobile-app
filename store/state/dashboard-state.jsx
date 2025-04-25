import { useRouter } from 'expo-router';

// Static weather data configuration
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

export const useDashboardState = () => {
  const router = useRouter();
  
  return {
    weatherData,
    navigateTo: (route) => router.push(route)
  };
}; 