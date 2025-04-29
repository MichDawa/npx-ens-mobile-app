import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import styles from "./styles";
import BackIcon from "../../../assets/icons/back-icon";
import LegendIcon from "../../../assets/icons/legend-icon";
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get("window");

const HeaderFloodWarning = ({ 
  setShowLegend, 
  showLegend, 
  setPingConfirm, 
  red,
  customColor,
  style
}) => {
  const router = useRouter();

  const navigateTo = (route) => router.push(route);

  return (
    <View style={[styles.container, style]}>
      <View 
        style={[
          styles.header,
          red && { backgroundColor: "#CB483C" },
          customColor && { backgroundColor: customColor }
        ]}
      >
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => navigateTo("/dashboard")}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.title}>Flood Possibility Warning</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderFloodWarning;
