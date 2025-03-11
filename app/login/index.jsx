import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles';

const LoginPage = () => {
  const router = useRouter();

  const nextPage = () => {
    router.push('/');
    console.log('next page pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.signUpButton]} 
          onPress={nextPage}
        >
          <Text style={styles.buttonText}>
            <Text style={styles.SignUpColor}>Next</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;