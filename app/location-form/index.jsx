import React from "react";
import { View, Text, TouchableOpacity, TextInput, StatusBar, SafeAreaView, Platform } from "react-native";
import styles from "./styles";
import { useLocationFormNavigation } from "../../store/state/location-form-state";
import { useLocalSearchParams } from "expo-router";
import { useSignUpNavigation } from "../../store/state/sign-up-state";
import mobileAppApiService from "../../services/mobile-app-api.service";

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
    navigateTo,
    isSubmitting,
    setIsSubmitting,
    locationFormData,
    setLocationFormData,
  } = useLocationFormNavigation();

  const { signUpApiResponse } = useSignUpNavigation();
  const params = useLocalSearchParams();
  const signUpData = signUpApiResponse || JSON.parse(params.signUpData);

  const isFormValid = () => {
    return (
      address1.trim() !== '' &&
      city.trim() !== '' &&
      postalCode.trim() !== '' &&
      country.trim() !== ''
    );
  };

  const handleLocationSubmit = async () => {
    if (!signUpData?.id) {
      alert('Missing user information. Please complete signup first.');
      navigateTo('/sign-up');
      return;
    }

    if (isSubmitting || !isFormValid()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Processed signUpData:', signUpData);
      
      const data = {
        id: signUpData.id,
        address1: address1.trim(),
        address2: address2.trim(),
        city: city.trim(),
        zipcode: postalCode.trim(),
        country: country.trim()
      };

      let retries = 0;
      let success = false;
      
      while (retries < 3 && !success) {
        try {
          const response = await mobileAppApiService.location(data);

          setLocationFormData(response.data);
          console.log('Location submitted:', response.data);

          navigateTo({
            pathname: '/login',
            params: { locationFormData: JSON.stringify(response.data) }
          });
          success = true;
          return;
        } catch (error) {
          retries++;
          if (retries >= 3) {
            throw error;
          }
        }
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('Failed to save address. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          style={[
            styles.button, 
            (isSubmitting || !isFormValid()) && styles.disabledButton
          ]} 
          onPress={handleLocationSubmit}
          disabled={isSubmitting || !isFormValid()}
        >
          <Text style={styles.buttonText}>
            <Text style={styles.nextColor}>
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
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