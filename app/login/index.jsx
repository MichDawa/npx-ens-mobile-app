import { View, Text, TouchableOpacity, TextInput, StatusBar, SafeAreaView, Platform } from "react-native";
import styles from "./styles";
import { useLoginNavigation } from "../../store/state/login-state";
import mobileAppApiService from "../../services/mobile-app-api.service";

const LoginPage = () => {
  const {
    phoneNumber,
    isPressed,
    isLogging,
    setIsLogging,
    loginApiResponse,
    setLoginApiResponse,
    handlePhoneNumberChange,
    handlePressState,
    navigateTo
  } = useLoginNavigation();

  const strippedPhoneNumber = phoneNumber.replace("+63 ", "");
  const isPhoneValid = strippedPhoneNumber.length === 10;
  
  const loginApiCall = async () => {
    if (isLogging) return;
    setIsLogging(true);
    try {
      let retries = 0;
      let success = false;
      
      while (retries < 3 && !success) {
        try {
          const response = await mobileAppApiService.login({ phoneNumber: strippedPhoneNumber });
          setLoginApiResponse(response.data);
          console.log('Login Success:', response.data);
          navigateTo({
            pathname: '/dashboard',
            params: { loginApiResponse: JSON.stringify(response.data) }
          });
          success = true;
        } catch (error) {
          retries++;
          if (retries >= 3) {
            throw error;
          }
        }
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('Failed to login, please try again');
    } finally {
      setIsLogging(false);
    }
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
          style={[styles.button, (isLogging || !isPhoneValid) && styles.disabledButton]} 
          onPress={loginApiCall}
          disabled={isLogging || !isPhoneValid}
        >
          <Text style={styles.buttonText}>
            <Text style={styles.nextColor}>
              {isLogging ? "Logging in..." : "Next"}
            </Text>
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
  );

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