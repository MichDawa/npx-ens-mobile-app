import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const SmallLandmarkIcon = (props) => (
  <Svg width={12} height={11} viewBox="0 0 12 11" fill="none" {...props}>
    <Path
      d="M4.83329 10.6667V7.16667H7.16663V10.6667H10.0833V6H11.8333L5.99996 0.75L0.166626 6H1.91663V10.6667H4.83329Z"
      fill="#F2F2F2"
    />
    <Path
      d="M4.83329 10.6667V7.16667H7.16663V10.6667H10.0833V6H11.8333L5.99996 0.75L0.166626 6H1.91663V10.6667H4.83329Z"
      fill="url(#paint0_linear)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1="5.99996"
        y1="0.75"
        x2="5.99996"
        y2="10.6667"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#00DA8A" />
        <Stop offset="1" stopColor="#00AA6C" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SmallLandmarkIcon;