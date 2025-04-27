import { useState } from 'react';
import { useRouter } from 'expo-router';

export const useSignUpNavigation = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("+63 ");
  const [username, setUsername] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signUpApiResponse, setSignUpApiResponse] = useState(null);

  const toggleAgreement = () => {
    setAgreed(prev => !prev);
  };

  const handlePhoneNumberChange = (newValue) => {
    if (!newValue.startsWith("+63 ")) return;
    const numbers = newValue.slice(4).replace(/[^0-9]/g, "");
    if (numbers.length <= 10) setPhoneNumber(`+63 ${numbers}`);
  };

  const handlePressState = (pressed) => setIsPressed(pressed);
  const navigateTo = (route) => router.push(route);

  return {
    phoneNumber,
    username,
    isPressed,
    isSigningUp,
    setIsSigningUp,
    signUpApiResponse,
    setSignUpApiResponse,
    agreed,
    setUsername,
    handlePhoneNumberChange,
    handlePressState,
    navigateTo,
    toggleAgreement,
  };
};