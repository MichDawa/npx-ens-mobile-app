import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles from "./styles";

const otpPage = () => {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);

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

export default otpPage;