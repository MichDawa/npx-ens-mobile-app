import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, Pressable, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import BackIcon from '../../../assets/icons/back-icon';
import LegendIcon from '../../../assets/icons/legend-icon';
import MapLegendDialog from '../map-legend-dialog';

const { width, height } = Dimensions.get('window');

const Header = () => {
  const [showLegend, setShowLegend] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <View style={styles.leftContainer}>
            <BackIcon />
            <Text style={styles.title}>Map</Text>
          </View>
          <TouchableOpacity onPress={() => setShowLegend(!showLegend)}>
            <LegendIcon />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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

export default Header;