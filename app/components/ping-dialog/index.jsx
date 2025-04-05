import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import SmallPingingIcon from '../../../assets/icons/small-pinging-icon';
import styles from './styles';

const { width, height } = Dimensions.get('window');

const MapPingDialog = ({ onYesPress, onNoPress }) => {
  return (
    <View style={styles.dialogContainer}>
      <View style={styles.header}>

        <SmallPingingIcon color="black" />
        <Text style={styles.pingText}>Emergency Alert</Text>
        <SmallPingingIcon color="black" />

      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>
          Would you like to <Text style={styles.boldText}>PING</Text> your location as a{' '}
          <Text style={styles.italicUnderlineText}>distress signal</Text> for emergency assistance?
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.noButton]}
          onPress={onNoPress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.yesButton]}
          onPress={onYesPress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapPingDialog;