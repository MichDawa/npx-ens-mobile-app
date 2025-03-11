import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import styles from "./styles";

const LoginPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("+63 ");
  const [isPressed, setIsPressed] = useState(false);

  const handlePhoneNumberChange = (newValue) => {
    if (!newValue.startsWith("+63 ")) return;
    
    const numbers = newValue.slice(4).replace(/[^0-9]/g, "");
    if (numbers.length <= 10) {
      setPhoneNumber(`+63 ${numbers}`);
    }
  };

  const nextPage = () => {
    router.push("/");
    console.log("next page pressed");
  };

  const signUp = () => {
    router.push("/sign-up");
    console.log("sign up page pressed");
  };

  return (
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
        <Text style={[
          styles.signUpSubtitle,
          isPressed && styles.signUpSubtitlePressed
        ]}>
          Don't have an account?{"\n"}Sign up here
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default LoginPage;