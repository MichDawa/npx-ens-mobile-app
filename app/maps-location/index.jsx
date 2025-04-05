import {
  View,
  Platform,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Pressable,
  StatusBar,
  SafeAreaView,
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

// others
import Header from '../components/header/index';
import MapPingDialog from '../components/ping-dialog/index';
import MapLegendDialog from '../components/map-legend-dialog';
import EmergencyAlertDialog from '../components/emergency-alert-dialog';

// Standard zoom level for all regions
const STANDARD_ZOOM = {
  latitudeDelta: 0.07,
  longitudeDelta: 0.07,
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
    setShowEmergencyAlert 
  } = useMapsUIState();

  const mapRef = useRef(null);
  const timeoutRef = useRef(null);
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (showEmergencyAlert) {
      timeoutRef.current = setTimeout(() => {
        setShowEmergencyAlert(false);
      }, 3000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [showEmergencyAlert]);

  const handleYesPress = () => {
    setPingConfirm(false);
    
    if (mapRef?.current && location?.coords) {
      // Unified animation for both platforms
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: STANDARD_ZOOM.latitudeDelta * 0.2,
        longitudeDelta: STANDARD_ZOOM.longitudeDelta * 0.2,
      }, 1000);
  
      setTimeout(() => {
        setShowEmergencyAlert(true);
      }, 1000);
    } else {
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

  const renderContent = () => (
    <>
      <Header 
        setShowLegend={setShowLegend} 
        showLegend={showLegend} 
        setPingConfirm={setPingConfirm}
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

      {pingConfirm && (
        <Pressable style={styles.overlay} onPress={() => setPingConfirm(false)}>
          <MapPingDialog 
            onYesPress={handleYesPress}
            onNoPress={() => setPingConfirm(false)}
          />
        </Pressable>
      )}

      {showLegend && (
        <Pressable style={styles.overlay} onPress={() => setShowLegend(false)}>
          <MapLegendDialog />
        </Pressable>
      )}

      {showEmergencyAlert && (
        <Pressable style={[styles.overlay, styles.emergencyOverlay]}>
          <EmergencyAlertDialog />
        </Pressable>
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
        translucent={Platform.OS === 'ios'}
        backgroundColor="#051B45"
        barStyle="light-content"
      />
      {Platform.OS === 'ios' ? (
        <View style={styles.absoluteFill}>
          <SafeAreaView 
            style={styles.iosContainer}
            edges={['top', 'left', 'right']}
          >
            {renderContent()}
          </SafeAreaView>
        </View>
      ) : (
        <View style={styles.androidContainer}>
          {renderContent()}
        </View>
      )}
    </>
  );
};

export default MapLocation;