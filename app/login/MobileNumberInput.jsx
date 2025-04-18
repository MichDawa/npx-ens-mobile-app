import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const MobileNumberInput = ({ onSubmit, onSignup, onBack }) => {
  const [mobileNumber, setMobileNumber] = useState('+63 9212 345 6789');

  const handleNext = () => {
    if (onSubmit) {
      onSubmit(mobileNumber);
    }
  };

  const handleSignup = () => {
    if (onSignup) {
      onSignup();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={handleBack}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Login</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
          autoFocus
        />
      </View>

      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Not have account?</Text>
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.signupLink}>Signup here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 25,
    padding: 10,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#004aad',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004aad', // Updated to match the image
    marginBottom: 60,
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
    marginTop: 80,
  },
  inputContainer: {
    marginTop: 70,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    borderBottomWidth: 1, // Only bottom border
    borderBottomColor: '#DDD',
    paddingVertical: 12,
    paddingHorizontal: 0, // No horizontal padding to match the image
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  nextButton: {
    backgroundColor: '#004aad', // Royal blue color matching the image
    borderRadius: 5, // Slightly rounded corners
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  signupText: {
    color: '#333',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  signupLink: {
    color: '#004aad', // Updated to match color scheme
    fontWeight: '600',
    marginLeft: 5,
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
});

export default MobileNumberInput; 