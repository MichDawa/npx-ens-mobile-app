import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import styles from "./styles";

const otpPage = () => {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [expiryTime, setExpiryTime] = useState(300);
  const [resendTime, setResendTime] = useState(5);
  const [showResend, setShowResend] = useState(false);
  
  const otpInputs = Array(6).fill().map(() => useRef(null));

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

  const handleResend = () => {
    setExpiryTime(300);
    setResendTime(5);
    setShowResend(false);
    setOtpDigits(['', '', '', '', '', '']);
    otpInputs[0].current.focus();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextPage = () => router.push("/");
  const signUp = () => router.push("/sign-up");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP</Text>

      <View style={styles.otpContainer}>
        {otpDigits.map((digit, index) => (
          <TextInput
            key={index}
            ref={otpInputs[index]}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(value) => handleOtpChange(index, value)}
            value={digit}
          />
        ))}
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          Expires after ({formatTime(expiryTime)}s)
        </Text>
        {showResend && (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendText}>Resend</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={nextPage}>
          <Text style={styles.buttonText}>
            <Text style={styles.nextColor}>Next</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={signUp}
      >
        <Text style={[styles.otp, isPressed && styles.otpPressed]}>
          Don't have an account?{"\n"}Sign up here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default otpPage;