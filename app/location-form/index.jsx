import React from "react";
import { View, Text, TouchableOpacity, TextInput, StatusBar, SafeAreaView, Platform } from "react-native";
import styles from "./styles";
import { useLocationFormNavigation } from "../../store/state/location-form-state";

const LocationForm = () => {
  const {
    address1,
    address2,
    city,
    province,
    postalCode,
    country,
    isPressed,
    setAddress1,
    setAddress2,
    setCity,
    setProvince,
    setPostalCode,
    setCountry,
    handlePressState,
    navigateTo
  } = useLocationFormNavigation();

  const Content = (
    <View style={styles.container}>
      <Text style={styles.title}>Location</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Address 1</Text>
        <TextInput
          style={styles.inputField}
          value={address1}
          onChangeText={setAddress1}
          keyboardType="default"
          placeholder="Street Address"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Address 2</Text>
        <TextInput
          style={styles.inputField}
          value={address2}
          onChangeText={setAddress2}
          keyboardType="default"
          placeholder="Street Address Line 2"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>City</Text>
        <TextInput
          style={styles.inputField}
          value={city}
          onChangeText={setCity}
          keyboardType="default"
          placeholder="City"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Province</Text>
        <TextInput
          style={styles.inputField}
          value={province}
          onChangeText={setProvince}
          keyboardType="default"
          placeholder="Province"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Postal/Zip Code</Text>
        <TextInput
          style={styles.inputField}
          value={postalCode}
          onChangeText={setPostalCode}
          keyboardType="default"
          placeholder="Postal/Zip Code"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Country</Text>
        <TextInput
          style={styles.inputField}
          value={country}
          onChangeText={setCountry}
          keyboardType="default"
          placeholder="Country"
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

export default LocationForm;