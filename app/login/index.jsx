import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import MobileNumberInput from './MobileNumberInput';
import WeatherDashboard from '../dashboard';

const LoginPage = () => {
  const [showMobileInput, setShowMobileInput] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleLogin = () => {
    setShowMobileInput(true);
  };

  const handleSignUp = () => {
    console.log('SignUp pressed');
  };

  const handleMobileSubmit = (mobileNumber) => {
    console.log('Mobile number submitted:', mobileNumber);
    // Here you would handle the authentication with the mobile number
    
    // Navigate to dashboard
    setShowDashboard(true);
    setShowMobileInput(false);
  };

  const handleBack = () => {
    if (showDashboard) {
      setShowDashboard(false);
    } else if (showMobileInput) {
      setShowMobileInput(false);
    }
  };

  // If dashboard is shown, render that
  if (showDashboard) {
    return <WeatherDashboard onBack={handleBack} />;
  }

  // If mobile input screen is shown, render that
  if (showMobileInput) {
    return <MobileNumberInput 
      onSubmit={handleMobileSubmit} 
      onSignup={handleSignUp}
      onBack={handleBack}
    />;
  }

  // Otherwise render the initial login screen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.eLetter}>E</Text>
        <Text style={styles.nLetter}>N</Text>
        <Text style={styles.sLetter}>S</Text>
      </Text>
      <Text style={styles.subtitle}>Mobile Service</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            <Text style={styles.loginColor}>Login using mobile number</Text>
            </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.signUpButton]} 
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>
            <Text style={styles.SignUpColor}>Sign Up</Text>
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;
