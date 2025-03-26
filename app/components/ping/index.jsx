import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import styles from './styles';

const { width, height } = Dimensions.get('window');

const MapPingDialog = () => {
  return (
    <View style={styles.dialogContainer}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Svg width="40" height="40" viewBox="0 0 36 36" fill="none">
            <Path
              d="M11.6364 26V24.1176H13.0909L14.8864 17.9294C15.0076 17.5216 15.2312 17.1962 15.5573 16.9534C15.8833 16.7106 16.243 16.5889 16.6364 16.5882H19.3636C19.7576 16.5882 20.1176 16.71 20.4436 16.9534C20.7697 17.1969 20.993 17.5222 21.1136 17.9294L22.9091 24.1176H24.3636V26H11.6364ZM17.0909 14.7059V10H18.9091V14.7059H17.0909ZM22.5 17.0353L21.2045 15.6941L24.4318 12.3765L25.7045 13.6941L22.5 17.0353ZM23.4545 21.2941V19.4118H28V21.2941H23.4545ZM13.5 17.0353L10.2955 13.6941L11.5682 12.3765L14.7955 15.6941L13.5 17.0353ZM8 21.2941V19.4118H12.5455V21.2941H8Z"
              fill="#333333"
            />
          </Svg>
        </View>
        <Text style={styles.pingText}>Emergency Alert</Text>
        <View style={styles.iconPlaceholder} />
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
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.yesButton]}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapPingDialog;