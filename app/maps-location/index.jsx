// react
import React from 'react';
import { View, Platform, ActivityIndicator, Text } from 'react-native';
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


const MapLocation = () => {
  const { location, errorMsg } = useMapsLocationState();

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
      <Header />
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
        <PingingIcon width={65} height={65} />
      </View>
    </View>
  );
};

export default MapLocation;