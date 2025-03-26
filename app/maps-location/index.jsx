// react
import React, { useState } from 'react';
import { View, Platform, ActivityIndicator, Text, TouchableOpacity, Dimensions, Pressable, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// styles and assets
import styles from './styles';
import mapStyle from '../../assets/map-styles';
import evacuationCenters from '../../assets/evacuation-centers';
import closedRoads from '../../assets/closed-roads';

// icons
import LocationIcon from '../../assets/icons/location-icon';
import LandmarkIcon from '../../assets/icons/landmark-icon';
import ClosedRoadIcon from '../../assets/icons/closed-road-icon';
import PingingIcon from '../../assets/icons/pinging-icon';

// state
import useMapsLocationState from '../../store/state/maps-location-state';

// others
import Header from '../components/header/index';
import MapPingDialog from '../components/ping/index';
import MapLegendDialog from '../components/map-legend-dialog';

const MapLocation = () => {
  const { location, errorMsg } = useMapsLocationState();
  const [pingConfirm, setPingConfirm] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  
  const { width, height } = Dimensions.get('window');

  if (errorMsg) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header 
        setShowLegend={setShowLegend} 
        showLegend={showLegend} 
        setPingConfirm={setPingConfirm}
      />
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? 'google' : undefined}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="hybrid" //note to have this be to toggled either hybrid or standard map
        showsUserLocation={false}
        showsMyLocationButton={true}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsIndoors={false}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Your Location"
          description="You are here"
          anchor={{ x: 0.5, y: 1 }}
        >
          <LocationIcon width={48} height={59} />
        </Marker>

        {evacuationCenters.map((center) => (
          <Marker
            key={center.id}
            coordinate={center.coordinate}
            title={center.title}
            description={center.description}
            anchor={{ x: 0.5, y: 1 }}
          >
            <LandmarkIcon width={50} height={50} />
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
      <View style={styles.pingContainer}>
        <TouchableOpacity onPress={() => {
          setPingConfirm(!pingConfirm);
          setShowLegend(false);
        }}>
          <PingingIcon width={65} height={65} />
        </TouchableOpacity>
      </View>
      {pingConfirm && (
        <Pressable 
          style={styles.overlay} 
          onPress={() => setPingConfirm(false)}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <MapPingDialog />
          </TouchableWithoutFeedback>
        </Pressable>
      )}
      {showLegend && (
        <Pressable 
          style={styles.overlay} 
          onPress={() => setShowLegend(false)}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <MapLegendDialog />
          </TouchableWithoutFeedback>
        </Pressable>
      )}
    </View>
  );
};

export default MapLocation;