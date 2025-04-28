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
// Removing the direct imports in favor of API calls
// import evacuationCenters from '../../assets/evacuation-centers';
// import closedRoads from '../../assets/closed-roads';

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

// others
import Header from '../components/header/index';
import MapPingDialog from '../components/ping-dialog/index';
import MapLegendDialog from '../components/map-legend-dialog';
import EmergencyAlertDialog from '../components/emergency-alert-dialog';
import { useLocalSearchParams, useRouter } from "expo-router";
import mobileAppApiService from "../../services/mobile-app-api.service";

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
  const router = useRouter();

  const [evacuationCenters, setEvacuationCenters] = useState([]);
  const [closedRoads, setClosedRoads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isPingDialogMounted, setIsPingDialogMounted] = useState(false);
  const pingConfirmOpacity = useRef(new Animated.Value(0)).current;

  const [isLegendMounted, setIsLegendMounted] = useState(false);
  const legendOpacity = useRef(new Animated.Value(0)).current;

  const [isEmergencyMounted, setIsEmergencyMounted] = useState(false);
  const emergencyOpacity = useRef(new Animated.Value(0)).current;

  const fetchData = async () => {
    try {
      setLoading(true);
      const [centersResponse, roadsResponse] = await Promise.all([
        mobileAppApiService.getEvacuationCenters(),
        mobileAppApiService.getClosedRoads()
      ]);
      
      console.log('Evacuation centers response:', centersResponse);
      console.log('Closed roads response:', roadsResponse);
      
      const centersData = centersResponse?.data || [];
      const roadsData = roadsResponse?.data || [];
      
      if (Array.isArray(centersData)) {
        console.log(`Got ${centersData.length} evacuation centers`);
        const transformedCenters = centersData.map(center => ({
          id: center.id,
          title: center.title,
          coordinate: { 
            latitude: Number(center.latitude), 
            longitude: Number(center.longitude) 
          },
          descriptionAndroid: center.description,
          descriptionIOS: center.descriptionImage
        }));
        console.log('Transformed centers:', transformedCenters);
        setEvacuationCenters(transformedCenters);
      } else {
        console.error('Invalid evacuation centers data format:', centersData);
        setEvacuationCenters([]);
      }
      
      if (Array.isArray(roadsData)) {
        console.log(`Got ${roadsData.length} closed roads`);
        const transformedRoads = roadsData.map(road => ({
          id: road.id,
          title: road.title,
          coordinate: { 
            latitude: Number(road.latitude), 
            longitude: Number(road.longitude) 
          },
          description: road.description || 'Road Closed'
        }));
        console.log('Transformed roads:', transformedRoads);
        setClosedRoads(transformedRoads);
      } else {
        console.error('Invalid closed roads data format:', roadsData);
        setClosedRoads([]);
      }
    } catch (error) {
      console.error('Failed to fetch map data:', error);
      import('../../assets/evacuation-centers').then(module => {
        console.log('Using fallback evacuation centers data');
        setEvacuationCenters(module.default);
      }).catch(err => console.error('Failed to load fallback evacuation centers:', err));
      
      import('../../assets/closed-roads').then(module => {
        console.log('Using fallback closed roads data');
        setClosedRoads(module.default);
      }).catch(err => console.error('Failed to load fallback closed roads:', err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      }, 10000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [showEmergencyAlert]);

  useEffect(() => {
    const sendEmergencyLocation = async (id, coordinates) => {
    try {
      const response = await mobileAppApiService.pinglocation({
        id: id,
        exactLocation: coordinates
      });
      console.log('Emergency location pinged successfully:', response.data);
    } catch (error) {
      console.error('API Error:', error);
      router.replace('/login');
    }
  };

    if (showEmergencyAlert) {
      const userData = JSON.parse(dashboardDataLogin);
      if (userData?.id && emergencyCoordinates) {
        sendEmergencyLocation(userData.id, emergencyCoordinates);
      }
    }
  }, [showEmergencyAlert, emergencyCoordinates, dashboardDataLogin]);

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

        {!loading && evacuationCenters && evacuationCenters.map((center) => {
          // Validate the center data has required properties
          if (!center || !center.coordinate) {
            console.error('Missing coordinate data for evacuation center:', center);
            return null;
          }
          
          // Validate coordinates are valid numbers and within reasonable range
          const lat = Number(center.coordinate.latitude);
          const lng = Number(center.coordinate.longitude);
          
          if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
            console.error(`Invalid coordinates for evacuation center: ${center.title}, lat: ${lat}, lng: ${lng}`);
            return null;
          }
          
          console.log(`Rendering evacuation center: ${center.title} at ${lat},${lng}`);
          
          return (
            <Marker
              key={center.id || `evacuation-${center.title}`}
              coordinate={{
                latitude: lat,
                longitude: lng
              }}
              title={center.title || 'Evacuation Center'}
              description={center.descriptionAndroid || ''}
              anchor={{ x: 0.5, y: 1 }}
            >
              <LandmarkIcon width={50} height={50} />
              {Platform.OS === "ios" && (
                <Callout tooltip style={styles.customCallout}>
                  <View style={styles.calloutContainer}>
                    <View style={styles.calloutRow}>
                      <SmallLandmarkIcon width={20} height={20} style={styles.icon} />
                      <Text style={styles.calloutTitle}>{center.title || 'Evacuation Center'}</Text>
                    </View>
                    {center.descriptionIOS && (
                      <Svg width={240} height={120}>
                        <ImageSvg
                          width="100%"
                          height="100%"
                          preserveAspectRatio="xMidYMid slice"
                          href={{ uri: center.descriptionIOS }}
                        />
                      </Svg>
                    )}
                  </View>
                </Callout>
              )}
            </Marker>
          );
        })}

        {!loading && closedRoads && closedRoads.map((road) => {
          // Validate the road data has required properties
          if (!road || !road.coordinate) {
            console.error('Missing coordinate data for closed road:', road);
            return null;
          }
          
          // Validate coordinates are valid numbers and within reasonable range
          const lat = Number(road.coordinate.latitude);
          const lng = Number(road.coordinate.longitude);
          
          if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
            console.error(`Invalid coordinates for closed road: ${road.title}, lat: ${lat}, lng: ${lng}`);
            return null;
          }
          
          console.log(`Rendering closed road: ${road.title} at ${lat},${lng}`);
          
          return (
            <Marker
              key={road.id || `road-${road.title}`}
              coordinate={{
                latitude: lat,
                longitude: lng
              }}
              title={road.title || 'Closed Road'}
              description={road.description || ''}
              anchor={{ x: 0.5, y: 1 }}
            >
              <ClosedRoadIcon width={50} height={50} />
            </Marker>
          );
        })}
        
        {loading && location?.coords && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            anchor={{ x: 0.5, y: 1 }}
          >
            <View style={styles.loadingMarker}>
              <ActivityIndicator size="small" color="#ffffff" />
              <Text style={styles.loadingMarkerText}>Loading map data...</Text>
            </View>
          </Marker>
        )}

        {!loading && (!evacuationCenters || evacuationCenters.length === 0) && (!closedRoads || closedRoads.length === 0) && location?.coords && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            anchor={{ x: 0.5, y: 1 }}
          >
            <View style={styles.warningMarker}>
              <Text style={styles.warningMarkerText}>No map data available</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={() => {
                  setLoading(true);
                  fetchData();
                }}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          </Marker>
        )}
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