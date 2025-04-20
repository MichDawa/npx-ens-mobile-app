import React from "react";
import { View, Text, TouchableOpacity, TextInput, StatusBar, SafeAreaView, Platform } from "react-native";
import styles from "./styles";
import { useLoginNavigation } from "../../store/state/login-state";
import MobileAppApiService from "../../services/mobile-app-api.service";

const LoginPage = () => {
  const {
    phoneNumber,
    isPressed,
    handlePhoneNumberChange,
    handlePressState,
    navigateTo
  } = useLoginNavigation();

  const param = {
    value: "test frontend"
  };

  const Content = (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={async () => {
            try {
              await MobileAppApiService.addTest( param );
              navigateTo('/otp');
            } catch (error) {
              console.error('API Error:', error);
              alert('Failed to submit test data');
            }
          }}
        >
          <Text style={styles.buttonText}>
            <Text style={styles.nextColor}>Next</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPressIn={() => handlePressState(true)}
        onPressOut={() => handlePressState(false)}
        onPress={() => navigateTo('/sign-up')}
      >
        <Text style={[
          styles.signUpSubtitle,
          isPressed && styles.signUpSubtitlePressed
        ]}>
          Don't have an account?{"\n"}Sign up here
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
        {Platform.OS === "ios" ? (
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

export default LoginPage;