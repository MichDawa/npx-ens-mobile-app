import React from "react";
import { View, Text, TouchableOpacity, TextInput, StatusBar, SafeAreaView, Platform } from "react-native";
import { useSignUpNavigation } from "../../store/state/sign-up-state";
import mobileAppApiService from "../../services/mobile-app-api.service";
import styles from "./styles";

const SignUpPage = () => {
  const {
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
    toggleAgreement,
    navigateTo
  } = useSignUpNavigation();

  const strippedPhoneNumber = phoneNumber.replace("+63 ", "");
  const isPhoneValid = strippedPhoneNumber.length === 10;
  const isUsernameValid = username.trim().length > 0;

  const signUpApiCall = async () => {
    setIsSigningUp(true);
    try {
      const response = await mobileAppApiService.signup({
        phoneNumber: strippedPhoneNumber,
        username: username.trim()
      });
      setSignUpApiResponse(response.data);
      console.log('Signup Success:', response.data);
      navigateTo('/location-form');
    } catch (error) {
      console.error('Signup Error:', error);
      alert('Signup failed. Please try again.');
    } finally {
      setIsSigningUp(false);
    }
  };

  const Content = (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Number</Text>
        <TextInput
          style={styles.inputField}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="phone-pad"
          maxLength={14}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          style={styles.inputField}
          value={username}
          onChangeText={setUsername}
          keyboardType="default"
          placeholder="example@123"
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity 
        style={styles.checkboxContainer}
        onPress={toggleAgreement}
      >
        <View style={[styles.checkboxBox, agreed && styles.checkedBox]}>
          {agreed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.checkboxText}>
          I agree to share my data with the app for better location experience
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, (!agreed || !isPhoneValid || !isUsernameValid || isSigningUp) && styles.disabledButton]} 
          onPress={signUpApiCall}
          disabled={!agreed || !isPhoneValid || !isUsernameValid || isSigningUp}
        >
          <Text style={styles.buttonText}>
            <Text style={styles.nextColor}>
              {isSigningUp ? "Signing up..." : "Next"}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPressIn={() => handlePressState(true)}
        onPressOut={() => handlePressState(false)}
        onPress={() => navigateTo('/login')}
      >
        <Text style={[
          styles.loginSubtitle,
          isPressed && styles.loginSubtitlePressed
        ]}>
          Already registered?{"\n"}Log in here
        </Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.absoluteFill}>
        {Platform.OS === 'ios' ? (
          <SafeAreaView style={styles.iosSafeArea}>
            {Content}
          </SafeAreaView>
        ) : (
          Content
        )}
      </View>
    </>
    
  );
};

export default SignUpPage;