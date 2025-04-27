import { useState } from 'react';
import { useRouter } from 'expo-router';

export const useLoginNavigation = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("+63 ");
  const [isPressed, setIsPressed] = useState(false);

  const handlePhoneNumberChange = (newValue) => {
    if (!newValue.startsWith("+63 ")) return;
    
    const numbers = newValue.slice(4).replace(/[^0-9]/g, "");
    if (numbers.length <= 11) {
      setPhoneNumber(`+63 ${numbers}`);
    }
  };

  const handlePressState = (pressed) => setIsPressed(pressed);

  const navigateTo = (route) => {
    router.push(route);
    console.log(`Navigating to ${route}`);
  };

  return {
    phoneNumber,
    isPressed,
    handlePhoneNumberChange,
    handlePressState,
    navigateTo
  };
};