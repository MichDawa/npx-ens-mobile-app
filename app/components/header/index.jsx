import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import styles from "./styles";
import BackIcon from "../../../assets/icons/back-icon";
import LegendIcon from "../../../assets/icons/legend-icon";

const { width, height } = Dimensions.get("window");

const Header = ({ 
  setShowLegend, 
  showLegend, 
  setPingConfirm, 
  red
}) => {
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.header,
          red && { backgroundColor: "#CB483C" }
        ]}
      >
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
          {red
            ? <LegendIcon red />
            : <LegendIcon />
          }
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;