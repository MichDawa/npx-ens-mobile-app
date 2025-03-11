import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import styles from "./styles";

const LoginPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("+63");
  const [isPressed, setIsPressed] = useState(false);

  const nextPage = () => {
    router.push("/");
    console.log("next page pressed");
  };

  const signUp = () => {
    router.push("/");
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
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
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