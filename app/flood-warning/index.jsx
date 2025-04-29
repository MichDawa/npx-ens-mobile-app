import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Platform, StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import styles from './styles';
import { useLocalSearchParams } from 'expo-router';
import { useDashboardState } from "../../store/state/dashboard-state";
import { useLoginNavigation } from "../../store/state/login-state";
import HeaderFloodWarning from "../components/header-floodwarning";
import hardwareData from "../../assets/hardware-data";
import { LinearGradient } from 'expo-linear-gradient';

// Import icons - fixed paths
const mapPinIcon = require('../../assets/images/map-pin.png');
const floodIcon = require('../../assets/images/icons/flood.png');

const FloodWarningScreen = () => {
  const { navigateTo, weatherData } = useDashboardState();
  const { loginApiResponse } = useLoginNavigation();
  const params = useLocalSearchParams();
  const loginFormData = loginApiResponse || params.loginApiResponse;
  const [showLegend, setShowLegend] = useState(false);
  const [pingConfirm, setPingConfirm] = useState(false);
  
  // Get data from hardware and weather
  const sensorData = hardwareData[0]; // Using the first item for this example
  const location = sensorData.location; // Get location from hardware data
  const city = weatherData?.location?.split(',')[0] || "Surigao";
  const country = weatherData?.location?.split(',')[1]?.trim() || "Philippines";
  
  const renderContent = () => (
    <View style={{ flex: 1 }}>
      <HeaderFloodWarning
        setShowLegend={setShowLegend}
        showLegend={showLegend}
        setPingConfirm={setPingConfirm}
        customColor="rgba(0, 0, 0, 0.7)"
        style={{ borderRadius: 0 }}
      />
      
      <LinearGradient
        colors={['#051B45', '#0B42AB']}
        style={{ 
          flex: 1, 
          borderRadius: 0,
          marginTop: -10
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <ScrollView style={[styles.container, { backgroundColor: 'transparent' }]}>
          {/* Your location label */}
          <Text style={contentStyles.locationLabel}>Your location:</Text>
          
          {/* Location name (Barangay) */}
          <Text style={contentStyles.barangayName}>{location}</Text>
          
          {/* City, Country */}
          <Text style={contentStyles.cityCountry}>{city}, {country}</Text>
          
          {/* Sensor ID */}
          <Text style={contentStyles.sensorId}>SENSOR ID: {sensorData.id}</Text>
          
          {/* First row of info boxes */}
          <View style={contentStyles.infoRow}>
            {/* Flood Risk Box - Updated styling */}
            <View style={contentStyles.floodRiskBox}>
              <View style={contentStyles.floodRiskHeader}>
                <Image source={floodIcon} style={contentStyles.floodIcon} />
                <Text style={contentStyles.floodRiskTitle}>Flood Risk Level</Text>
              </View>
              <View style={contentStyles.floodRiskValueContainer}>
                <Text style={contentStyles.floodRiskValue}>{sensorData.sensorValue}</Text>
              </View>
            </View>
            
            {/* Impact Time Box */}
            <View style={contentStyles.infoBox}>
              <Text style={contentStyles.infoBoxTitle}>Impact Time</Text>
              <Text style={contentStyles.infoBoxValue}>1 hour</Text>
            </View>
          </View>
          
          {/* Second row of info boxes */}
          <View style={contentStyles.infoRow}>
            {/* Weather Box */}
            <View style={contentStyles.infoBox}>
              <Text style={contentStyles.infoBoxTitle}>Weather</Text>
              <Text style={contentStyles.infoBoxValue}>{weatherData.condition || "Rainy"}</Text>
            </View>
            
            {/* Water Level Box */}
            <View style={contentStyles.infoBox}>
              <Text style={contentStyles.infoBoxTitle}>Water Level</Text>
              <Text style={contentStyles.infoBoxValue}>4.5 m</Text>
            </View>
          </View>
          
          {/* Additional info section */}
          <View style={contentStyles.additionalInfoSection}>
            <Text style={contentStyles.sectionTitle}>Recent Updates</Text>
            <Text style={contentStyles.sectionContent}>
              Water levels continue to rise in the area. Residents are advised to stay alert
              and follow evacuation instructions if provided by local authorities.
            </Text>
          </View>
          
          {/* Shelter info section */}
          <View style={contentStyles.additionalInfoSection}>
            <Text style={contentStyles.sectionTitle}>Nearby Shelters</Text>
            <Text style={contentStyles.sectionContent}>
              Nearest evacuation center: Surigao City Sports Complex
              Alternative shelter: Surigao State College Gymnasium
            </Text>
          </View>
          
          {/* Spacer for bottom padding */}
          <View style={{height: 100}} />
        </ScrollView>
      </LinearGradient>
      
      {/* Location button positioned absolutely */}
      <TouchableOpacity 
        style={styles.locationButton} 
        onPress={() => navigateTo({
          pathname: '/maps-location',
          params: { 
            loginFormData
          }
        })}
      >
        <View style={styles.locationButtonBackground}>
          <Image source={mapPinIcon} style={styles.locationButtonIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar
        translucent={Platform.OS === 'ios'}
        backgroundColor="#051B45"
        barStyle="light-content"
      />
      {Platform.OS === 'ios' ? (
        <View style={styles.absoluteFill}>
          <SafeAreaView style={[styles.iosContainer, { backgroundColor: 'transparent' }]}>
            <LinearGradient
              colors={['#051B45', '#0B42AB']}
              style={{ 
                flex: 1, 
                borderRadius: 0,
                marginTop: -10
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              {renderContent()}
            </LinearGradient>
          </SafeAreaView>
        </View>
      ) : (
        <LinearGradient
          colors={['#051B45', '#0B42AB']}
          style={{ 
            flex: 1, 
            borderRadius: 0,
            marginTop: -10
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={[styles.androidContainer, { backgroundColor: 'transparent' }]}>
            {renderContent()}
          </View>
        </LinearGradient>
      )}
    </>
  );
};

// Specific styles for this screen's content
const contentStyles = StyleSheet.create({
  locationLabel: {
    marginTop: 80,
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 9,
    lineHeight: 11,
    color: '#E0E0E0',
  },
  barangayName: {
    alignSelf: 'center',
    marginTop: 5,
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 40,
    lineHeight: 48,
    textAlign: 'center',
    color: '#F2F2F2',
  },
  cityCountry: {
    alignSelf: 'center',
    marginTop: 10,
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: '#F2F2F2',
  },
  sensorId: {
    alignSelf: 'center',
    marginTop: 30,
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 9,
    lineHeight: 11,
    color: '#E0E0E0',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  infoBox: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 15,
    height: 102,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floodRiskBox: {
    width: '48%', 
    height: 102,
    backgroundColor: '#E74C3C',
    borderRadius: 20,
    overflow: 'hidden',
  },
  floodRiskHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    height: 34,
    gap: 5,
  },
  floodIcon: {
    width: 24,
    height: 24,
    tintColor: '#F2F2F2',
  },
  floodRiskTitle: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    color: '#FFFFFF',
  },
  floodRiskValueContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floodRiskValue: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 24,
    color: '#FFFFFF',
  },
  infoBoxTitle: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 16,
    color: '#F2F2F2',
    marginBottom: 10,
  },
  infoBoxValue: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 24,
    color: '#F2F2F2',
  },
  additionalInfoSection: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 18,
    color: '#F2F2F2',
    marginBottom: 10,
  },
  sectionContent: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 14,
    color: '#F2F2F2',
    lineHeight: 20,
  }
});

export default FloodWarningScreen; 