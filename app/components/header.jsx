import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import styles from './styles';
import BackIcon from '../../assets/icons/back-icon';

const Header = () => {
  return (
    <View style={styles.container}>
      <StatusBar 
        backgroundColor="#051B45" 
        barStyle="light-content" 
      />
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <BackIcon />
          <Text style={styles.title}>Map</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;