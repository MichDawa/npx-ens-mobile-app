import React from 'react';
import { View, Platform, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles';
import useMapsLocationState from '../../store/state/maps-location-state';
import mapStyle from '../../assets/map-styles';
import evacuationCenters from '../../assets/evacuation-centers';
import closedRoads from '../../assets/closed-roads';
import LocationIcon from '../../assets/icons/location-icon';
import LandmarkIcon from '../../assets/icons/landmark-icon';
import ClosedRoadIcon from '../../assets/icons/closed-road-icon';

const MapLocation = () => {
  const { location, errorMsg } = useMapsLocationState();

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
        mapType="hybrid" //note to have this be disabled to toggle satellite and default map
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
            <LandmarkIcon width={65} height={65} />
          </Marker>
        ))}

        {closedRoads.map((center) => (
          <Marker
            key={center.id}
            coordinate={center.coordinate}
            title={center.title}
            description={center.description}
            anchor={{ x: 0.5, y: 1 }}
          >
            <ClosedRoadIcon width={65} height={65} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default MapLocation;