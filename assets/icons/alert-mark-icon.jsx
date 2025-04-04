import React, { useState, useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";

const AlertMarkIcon = () => {
  const [index, setIndex] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;

  const svgs = [
    <Svg key="0" width="170" height="170" viewBox="0 0 170 170" fill="none">
      <Circle cx="85" cy="85" r="15" fill="#E52626" />
      <Circle cx="85" cy="85" r="15" fill="#E52626" />
      <Circle cx="85" cy="85" r="15" fill="#E52626" />
    </Svg>,
    <Svg key="1" width="170" height="170" viewBox="0 0 170 170" fill="none">
      <Circle cx="85" cy="85" r="15" fill="#E52626" />
      <Circle cx="85" cy="85" r="30" fill="#E52626" fillOpacity="0.2" />
      <Circle cx="85" cy="85" r="15" fill="#E52626" />
    </Svg>
  ];

  useEffect(() => {
    let timeoutId;

    const startAnimation = () => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev + 1) % svgs.length);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          timeoutId = setTimeout(startAnimation, 850);
        });
      });
    };

    startAnimation();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      opacity.stopAnimation();
    };
  }, [opacity, svgs.length]);

  return (
    <View>
      <Animated.View style={{ opacity }}>
        {svgs[index]}
      </Animated.View>
    </View>
  );
};

export default AlertMarkIcon;