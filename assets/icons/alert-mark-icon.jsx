import React, { useRef, useEffect } from 'react';
import { Animated, Easing, View } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop, G } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AlertMarkIcon = ({
  width = 170,
  height = 170,
  style,
}) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [progress]);

  const r2 = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [15, 30, 50, 50],
  });
  const o2 = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [1, 0.2, 0.2, 0.2],
  });

  const r3 = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [15, 15, 30, 0],
  });
  const o3 = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [1, 1, 0.2, 0],
  });

  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 170 170"
        fill="none"
      >
        <Circle cx={85} cy={85} r={15} fill="#E52626" />
        <AnimatedCircle cx={85} cy={85} r={r2} fill="#E52626" fillOpacity={o2} />
        <AnimatedCircle cx={85} cy={85} r={r3} fill="#E52626" fillOpacity={o3} />

        <G transform="translate(67 40)">
          <Svg 
            width={48}
            height={59}
            viewBox="0 0 65 65"
          >
            <Path
              d="M19.7243 54.1698L20.3395 54.67L20.3781 54.7087L20.5415 54.8331C21.5353 55.5895 22.7498 56 24 56C25.2502 56 26.4647 55.5895 27.4585 54.8331L27.6222 54.7085L27.6478 54.6828C27.8752 54.5045 28.0994 54.3221 28.3204 54.1358L28.3253 54.1316C31.1526 51.7379 33.75 49.0833 36.0835 46.2028L36.0894 46.1954C40.212 41.0735 45 33.2484 45 24.0779C45 18.4919 42.7906 13.132 38.8538 9.17818C34.9166 5.22387 29.5737 3 24 3C18.4263 3 13.0834 5.22387 9.14618 9.17818C5.20936 13.132 3 18.4919 3 24.0779C3 33.2485 7.7881 41.0738 11.915 46.1965L11.9201 46.2028C14.2536 49.0833 16.851 51.7379 19.6783 54.1316L19.7011 54.151L19.7243 54.1698ZM24.9142 26.3186C24.624 26.4394 24.3134 26.5013 24 26.5013C23.3677 26.5013 22.7586 26.2492 22.3075 25.7961C21.856 25.3426 21.6 24.7248 21.6 24.0779C21.6 23.4311 21.856 22.8133 22.3075 22.3598C22.7586 21.9067 23.3677 21.6546 24 21.6546C24.3134 21.6546 24.624 21.7165 24.9142 21.8373C25.2045 21.958 25.469 22.1354 25.6925 22.3598C25.916 22.5842 26.0939 22.8514 26.2156 23.1463C26.3372 23.4413 26.4 23.7579 26.4 24.0779C26.4 24.398 26.3372 24.7146 26.2156 25.0096C26.0939 25.3045 25.916 25.5717 25.6925 25.7961L27.8184 27.9129L25.6925 25.7961C25.469 26.0205 25.2045 26.1979 24.9142 26.3186Z"
              fill="url(#paint0_linear_red)"
              stroke="white"
              strokeWidth="4.5"
              vectorEffect="non-scaling-stroke"
            />
            <Defs>
              <LinearGradient 
                id="paint0_linear_red" 
                x1="24" 
                y1="6" 
                x2="24" 
                y2="53" 
                gradientUnits="userSpaceOnUse"
              >
                <Stop stopColor="#EF311D" />
                <Stop offset="1" stopColor="#CB483C" />
              </LinearGradient>
            </Defs>
          </Svg>
        </G>
      </Svg>
    </View>
  );
};

export default AlertMarkIcon;