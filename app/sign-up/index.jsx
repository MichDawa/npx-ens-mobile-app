import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import styles from "./styles";

const SignUpPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("+63 ");
  const [username, setUsername] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  const nextPage = () => {
    router.push("/");
    console.log("signup page pressed");
  };

  const login = () => {
    router.push("/login");
    console.log("login page pressed");
  };

  const handlePhoneNumberChange = (newValue) => {
    if (!newValue.startsWith("+63 ")) return;
    
    const numbers = newValue.slice(4).replace(/[^0-9]/g, "");
    if (numbers.length <= 10) {
      setPhoneNumber(`+63 ${numbers}`);
    }
  };

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
        <TouchableOpacity style={styles.button} onPress={nextPage}>
          <Text style={styles.buttonText}>
            <Text style={styles.nextColor}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={login}
      >
        <Text style={[
          styles.signUpSubtitle,
          isPressed && styles.signUpSubtitlePressed
        ]}>
          Already registered?{"\n"}Log in here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpPage;