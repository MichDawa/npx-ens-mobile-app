import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useSignUpNavigation } from "../../store/state/sign-up-state";
import styles from "./styles";

const SignUpPage = () => {
  const {
    phoneNumber,
    username,
    isPressed,
    setUsername,
    handlePhoneNumberChange,
    handlePressState,
    navigateTo
  } = useSignUpNavigation();

  return (
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigateTo('/maps-location')}
        >
          <Text style={styles.buttonText}>
            <Text style={styles.nextColor}>Sign Up</Text>
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
  );
};

export default SignUpPage;