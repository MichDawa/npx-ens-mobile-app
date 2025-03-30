import React from 'react';
import { View, Text } from 'react-native';
import SmallPingingIcon from '../../../assets/icons/small-pinging-icon';
import styles from './styles';

const EmergencyAlertDialog = () => {
  return (
    <View style={styles.container}>
      <View style={styles.gradientContainer}>
        <View style={styles.headerContainer}>
          <SmallPingingIcon color="white" size={50} />
          <Text style={styles.headerText}>Emergency Alert</Text>
          <SmallPingingIcon color="white" size={50} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>Hello World</Text>
        </View>
      </View>
    </View>
  );
};

export default EmergencyAlertDialog;
