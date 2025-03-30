import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "./styles";
import BackIcon from "../../../assets/icons/back-icon";
import LegendIcon from "../../../assets/icons/legend-icon";

const { width, height } = Dimensions.get("window");

const Header = ({ setShowLegend, showLegend, setPingConfirm }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <View style={styles.leftContainer}>
            <BackIcon />
            <Text style={styles.title}>Map</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setShowLegend(!showLegend);
              setPingConfirm(false);
            }}
          >
            <LegendIcon />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;
