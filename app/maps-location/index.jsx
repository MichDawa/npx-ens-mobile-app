import {
  View,
  Platform,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Pressable,
  StatusBar,
  SafeAreaView,
  Animated,
} from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useRef, useState } from 'react';

// svg
import { Svg, Image as ImageSvg } from 'react-native-svg';

// styles and assets
import styles from './styles';
import mapStyle from '../../assets/map-styles';
import evacuationCenters from '../../assets/evacuation-centers';
import closedRoads from '../../assets/closed-roads';

// icons
import LocationIcon from '../../assets/icons/location-icon';
import LandmarkIcon from '../../assets/icons/landmark-icon';
import SmallLandmarkIcon from '../../assets/icons/small-landmark-icon';
import ClosedRoadIcon from '../../assets/icons/closed-road-icon';
import PingingIcon from '../../assets/icons/pinging-icon';
import AlertMarkIcon from '../../assets/icons/alert-mark-icon';

// state
import useMapsLocationState from '../../store/state/maps-location-state';
import useMapsUIState from '../../store/state/maps-ui-state';
import { useDashboardState } from "../../store/state/dashboard-state";

// others
import Header from '../components/header/index';
import MapPingDialog from '../components/ping-dialog/index';
import MapLegendDialog from '../components/map-legend-dialog';
import EmergencyAlertDialog from '../components/emergency-alert-dialog';
import { useLocalSearchParams } from "expo-router";

const STANDARD_ZOOM = {
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const MapLocation = () => {
  const {
    location,
    errorMsg,
    refreshLocation
  } = useMapsLocationState();
  const { 
    pingConfirm, 
    setPingConfirm, 
    showLegend, 
    setShowLegend,
    showEmergencyAlert,
    setShowEmergencyAlert,
    emergencyCoordinates,
    setEmergencyCoordinates
  } = useMapsUIState();

  const mapRef = useRef(null);
  const timeoutRef = useRef(null);

  const [isPingDialogMounted, setIsPingDialogMounted] = useState(false);
  const pingConfirmOpacity = useRef(new Animated.Value(0)).current;

  const [isLegendMounted, setIsLegendMounted] = useState(false);
  const legendOpacity = useRef(new Animated.Value(0)).current;

  const [isEmergencyMounted, setIsEmergencyMounted] = useState(false);
  const emergencyOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (pingConfirm) {
      setIsPingDialogMounted(true);
      Animated.timing(pingConfirmOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(pingConfirmOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsPingDialogMounted(false));
    }
  }, [pingConfirm]);
  
  useEffect(() => {
    if (showLegend) {
      setIsLegendMounted(true);
      Animated.timing(legendOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(legendOpacity, {
        toValue: 0,
              duration: 300,
        useNativeDriver: true,
      }).start(() => setIsLegendMounted(false));
    }
  }, [showLegend]);

  useEffect(() => {
    if (showEmergencyAlert) {
      setIsEmergencyMounted(true);
      Animated.timing(emergencyOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(emergencyOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsEmergencyMounted(false));
    }
  }, [showEmergencyAlert]);
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (showEmergencyAlert) {
      timeoutRef.current = setTimeout(() => {
        setShowEmergencyAlert(false);
        // setTimeout(() => setPingConfirm(true), 300);
      }, 3000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [showEmergencyAlert]);

  const handleYesPress = () => {
    setPingConfirm(false);
    
    if (mapRef?.current && location?.coords) {
      const currentCoords = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      };
      
      mapRef.current.animateToRegion({
        latitude: currentCoords.lat,
        longitude: currentCoords.lng,
        latitudeDelta: STANDARD_ZOOM.latitudeDelta * 0.2,
        longitudeDelta: STANDARD_ZOOM.longitudeDelta * 0.2,
      }, 1000);
  
      setTimeout(() => {
        setShowEmergencyAlert(true);
        setEmergencyCoordinates(
          `${currentCoords.lat.toFixed(6)}, ${currentCoords.lng.toFixed(6)}`
        );
      }, 1000);
    } else if (location?.coords) {
      setEmergencyCoordinates(
        `${location.coords.latitude.toFixed(6)}, ${location.coords.longitude.toFixed(6)}`
      );
      setShowEmergencyAlert(true);
    }
  };

  const getInitialRegion = () => {
    if (location?.coords) {
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        ...STANDARD_ZOOM,
      };
    }
    return null;
  };

  const params = useLocalSearchParams();
  const dashboardDataLogin = params.loginFormData ? params.loginFormData : null;

  console.log('dashboardDataLogin', dashboardDataLogin);
  const renderContent = () => (
    <>
      <Header 
        setShowLegend={setShowLegend} 
        showLegend={showLegend} 
        setPingConfirm={setPingConfirm}
        red={showEmergencyAlert}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        customMapStyle={mapStyle}
        initialRegion={getInitialRegion()}
        mapType="hybrid"
        showsUserLocation={false}
        showsMyLocationButton
        showsPointsOfInterest={false}
        showsBuildings={false}
        minZoomLevel={Platform.OS === 'ios' ? 10 : undefined}
        maxZoomLevel={Platform.OS === 'ios' ? 18 : undefined}
      >
        {location?.coords && (
          showEmergencyAlert ? (
            Platform.OS === 'android' ? (
              <Marker
                key="emergency-android"
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                anchor={{ x: 0.5, y: 1 }}
              >
                <LocationIcon width={48} height={59} red />
              </Marker>
            ) : (
              <Marker
                key="emergency-ios"
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              >
                <View style={{position: 'absolute', top: -70, left: -90}}>
                  <AlertMarkIcon width={170} height={170} />
                </View>
              </Marker>
            )
          ) : (
            <Marker
              key="user-location"
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              anchor={{ x: 0.5, y: 1 }}
              onPress={refreshLocation}
            >
              <LocationIcon width={48} height={59} />
            </Marker>
          )
        )}

        {evacuationCenters.map((center) => (
          <Marker
            key={center.id}
            coordinate={center.coordinate}
            title={center.title}
            description={center.descriptionAndroid}
            anchor={{ x: 0.5, y: 1 }}
          >
            <LandmarkIcon width={50} height={50} />
            {Platform.OS === "ios" && (
              <Callout tooltip style={styles.customCallout}>
                <View style={styles.calloutContainer}>
                  <View style={styles.calloutRow}>
                    <SmallLandmarkIcon width={20} height={20} style={styles.icon} />
                    <Text style={styles.calloutTitle}>{center.title}</Text>
                  </View>
                  <Svg width={240} height={120}>
                    <ImageSvg
                      width="100%"
                      height="100%"
                      preserveAspectRatio="xMidYMid slice"
                      href={{ uri: center.descriptionIOS }}
                    />
                  </Svg>
                </View>
              </Callout>
            )}
          </Marker>
        ))}

        {closedRoads.map((road) => (
          <Marker
            key={road.id}
            coordinate={road.coordinate}
            title={road.title}
            description={road.description}
            anchor={{ x: 0.5, y: 1 }}
          >
            <ClosedRoadIcon width={50} height={50} />
          </Marker>
        ))}
      </MapView>

      {!showEmergencyAlert && (
        <View style={styles.pingContainer}>
          <TouchableOpacity onPress={() => {
            setPingConfirm(!pingConfirm);
            setShowLegend(false);
          }}>
            <PingingIcon width={65} height={65} />
          </TouchableOpacity>
        </View>
      )}

      {/* Ping Dialog */}
      {isPingDialogMounted && (
        <Animated.View style={[styles.overlay, { opacity: pingConfirmOpacity }]}>
          <Pressable 
            style={[styles.absoluteFill, { 
              justifyContent: 'center', 
              alignItems: 'center' 
            }]} 
            onPress={() => setPingConfirm(false)}
          >
            <MapPingDialog
              onYesPress={handleYesPress}
              onNoPress={() => setPingConfirm(false)}
            />
          </Pressable>
        </Animated.View>
      )}

      {/* Legend Dialog */}
      {isLegendMounted && (
        <Animated.View style={[styles.overlay, { opacity: legendOpacity }]}>
          <Pressable
            style={[styles.absoluteFill, { 
              justifyContent: 'center', 
              alignItems: 'center' 
            }]}
            onPress={() => setShowLegend(false)}
          >
            <MapLegendDialog />
          </Pressable>
        </Animated.View>
      )}

      {/* Emergency Alert */}
      {isEmergencyMounted && (
        <Animated.View style={[styles.overlay, styles.emergencyOverlay, { opacity: emergencyOpacity }]}>
            <EmergencyAlertDialog />
        </Animated.View>
      )}
    </>
  );

  if (errorMsg) return (
    <View style={styles.centeredContainer}>
      <Text style={styles.errorText}>{errorMsg}</Text>
    </View>
  );

  if (!location) return (
    <View style={styles.centeredContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>Getting your location...</Text>
    </View>
  );

  return (
    <>
      <StatusBar
        translucent={Platform.OS === 'ios' || showEmergencyAlert}
        backgroundColor={
          showEmergencyAlert
            ? '#922418'
            : '#051B45'
        }
        barStyle="light-content"
      />
      {Platform.OS === 'ios' ? (
        <View
          style={[
            styles.absoluteFill,
            { backgroundColor: showEmergencyAlert
              ? '#922418'
              : '#051B45'
            }
          ]}
        >
          <SafeAreaView 
            style={styles.iosContainer}
            edges={['top', 'left', 'right']}
          >
            {renderContent()}
          </SafeAreaView>
        </View>
      ) : (
        <View style={[
          styles.androidContainer,
          showEmergencyAlert && styles.androidEmergencyContainer
        ]}>
          {renderContent()}
        </View>
      )}
    </>
  );
};

export default MapLocation;