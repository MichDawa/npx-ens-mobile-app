import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useHomeNavigation } from '../../store/state/homescreen-state';

const HomePage = () => {
  const {
    navigateTo
  } = useHomeNavigation();

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
          onPress={() => navigateTo('/login')}
        >
          <Text style={styles.buttonText}>
            <Text style={styles.loginColor}>Login using mobile number</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.signUpButton]} 
          onPress={() => navigateTo('/sign-up')}
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