import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

export const useOtpNavigation = () => {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [expiryTime, setExpiryTime] = useState(300);
  const [resendTime, setResendTime] = useState(5);
  const [showResend, setShowResend] = useState(false);
  const otpInputs = Array(6).fill().map(() => useRef(null));

  // Timer effects
  useEffect(() => {
    if (expiryTime > 0) {
      const timer = setInterval(() => {
        setExpiryTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [expiryTime]);

  useEffect(() => {
    if (resendTime > 0) {
      const timer = setInterval(() => {
        setResendTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setShowResend(true);
    }
  }, [resendTime]);

  // OTP handling
  const handleOtpChange = (index, value) => {
    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    if (value && index < 5) {
      otpInputs[index + 1].current.focus();
    }

    if (!value && index > 0) {
      otpInputs[index - 1].current.focus();
    }
  };

  // Resend functionality
  const handleResend = () => {
    setExpiryTime(300);
    setResendTime(5);
    setShowResend(false);
    setOtpDigits(['', '', '', '', '', '']);
    otpInputs[0].current.focus();
  };

  // Helpers
  const handlePressState = (pressed) => setIsPressed(pressed);
  const navigateTo = (route) => router.push(route);
  const formatTime = (seconds) => 
    `${Math.floor(seconds/60)}:${(seconds%60).toString().padStart(2,'0')}`;

  return {
    isPressed,
    otpDigits,
    expiryTime,
    showResend,
    otpInputs,
    handleOtpChange,
    handleResend,
    handlePressState,
    navigateTo,
    formatTime
  };
};