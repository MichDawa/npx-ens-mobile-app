import React from "react";
import { View, Text, TouchableOpacity, TextInput, StatusBar, SafeAreaView, Platform } from "react-native";
import { useOtpNavigation } from "../../store/state/otp-state";
import styles from "./styles";

const OtpPage = () => {
  const {
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
  } = useOtpNavigation();

  const Content = (
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
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigateTo('/')}
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
        <Text style={[styles.otp, isPressed && styles.otpPressed]}>
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

export default OtpPage;