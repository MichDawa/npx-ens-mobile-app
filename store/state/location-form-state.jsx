import { useState } from 'react';
import { useRouter } from 'expo-router';

export const useLocationFormNavigation = () => {
  const router = useRouter();
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [isPressed, setIsPressed] = useState(false);

  const handlePressState = (pressed) => setIsPressed(pressed);
  const navigateTo = (route) => router.push(route);

  return {
    address1,
    address2,
    city,
    province,
    postalCode,
    country,
    isPressed,
    setAddress1,
    setAddress2,
    setCity,
    setProvince,
    setPostalCode,
    setCountry,
    handlePressState,
    navigateTo
  };
};
