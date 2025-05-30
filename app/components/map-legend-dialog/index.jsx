import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import styles from './styles';
import ClosedRoadIcon from '../../../assets/icons/closed-road-icon';
import LandmarkIcon from '../../../assets/icons/landmark-icon';

const MapLegendDialog = () => {
  return (
    <View style={styles.dialogContainer}>
      <View style={styles.header}>

        <View style={styles.leftContainer}>
          <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <Path
              d="M20.8125 25.5L15.1875 23.5121L11.4769 24.9604C11.2369 25.0507 11.0141 25.0245 10.8084 24.8819C10.6028 24.7392 10.5 24.5386 10.5 24.2798V12.7028C10.5 12.5336 10.5406 12.3793 10.6219 12.2399C10.7031 12.1004 10.8212 12.0035 10.9762 11.9493L15.1875 10.5L20.8125 12.4879L24.5231 11.0396C24.7631 10.9493 24.9859 10.9664 25.1916 11.0907C25.3972 11.215 25.5 11.4005 25.5 11.6473V23.3701C25.5 23.5512 25.4503 23.7084 25.3509 23.8415C25.2522 23.9753 25.1191 24.0694 24.9516 24.1236L20.8125 25.5ZM20.3438 24.3451V13.2698L15.6562 11.6179V22.6933L20.3438 24.3451ZM21.2812 24.3451L24.5625 23.2537V12.0363L21.2812 13.2707V24.3451ZM11.4375 23.9636L14.7188 22.6933V11.6179L11.4375 12.7463V23.9636Z"
              fill="#333333"
            />
          </Svg>
          <Text style={styles.legendText}>Map Legend</Text>
        </View>

      </View>

      <View style={styles.iconsContainer}>
        <View style={styles.iconRow}>
          <LandmarkIcon width={60} height={60} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Evacuation Centers</Text>
            <Text style={styles.description}>
              Facilities that provide safe refuge and support during emergencies.
            </Text>
          </View>
        </View>

        <View style={styles.iconRow}>
          <ClosedRoadIcon width={60} height={60} style={styles.iconMgn}/>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Flooded Areas</Text>
            <Text style={styles.description}>
              Flooded or unsafe areas to travel.
            </Text>
          </View>
        </View>
      </View>
      
    </View>
  );
};

export default MapLegendDialog;