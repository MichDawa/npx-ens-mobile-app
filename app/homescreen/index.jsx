import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles';

const HomePage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
    console.log('SignUp pressed');
  };

  const handleSignUp = () => {
    console.log('SignUp pressed');
  };

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

export default HomePage;