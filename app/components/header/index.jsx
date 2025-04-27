import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import styles from "./styles";
import BackIcon from "../../../assets/icons/back-icon";
import LegendIcon from "../../../assets/icons/legend-icon";
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get("window");

const Header = ({ 
  setShowLegend, 
  showLegend, 
  setPingConfirm, 
  red
}) => {
  const router = useRouter();

  const navigateTo = (route) => router.push(route);

  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.header,
          red && { backgroundColor: "#CB483C" }
        ]}
      >
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => navigateTo("/dashboard")}>
            <BackIcon />
          </TouchableOpacity>
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
