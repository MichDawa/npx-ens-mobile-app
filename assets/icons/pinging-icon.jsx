import React from 'react';
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const PingingIcon = (props) => {
  const { width = 64, height = 64, style } = props;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <Rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="31"
        fill="white"
      />
      <Rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="31"
        fill="url(#pingingGradient)"
      />
      <Rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="31"
        stroke="white"
        strokeWidth="2"
      />
      <Path
        d="M21.1818 44V40.9412H23.6545L26.7068 30.8853C26.9129 30.2225 27.2931 29.6939 27.8474 29.2993C28.4017 28.9047 29.0132 28.7069 29.6818 28.7059H34.3182C34.9879 28.7059 35.5999 28.9037 36.1542 29.2993C36.7085 29.6949 37.0882 30.2236 37.2932 30.8853L40.3455 40.9412H42.8182V44H21.1818ZM30.4545 25.6471V18H33.5455V25.6471H30.4545ZM39.65 29.4324L37.4477 27.2529L42.9341 21.8618L45.0977 24.0029L39.65 29.4324ZM41.2727 36.3529V33.2941H49V36.3529H41.2727ZM24.35 29.4324L18.9023 24.0029L21.0659 21.8618L26.5523 27.2529L24.35 29.4324ZM15 36.3529V33.2941H22.7273V36.3529H15Z"
        fill="white"
      />
      <Defs>
        <LinearGradient
          id="pingingGradient"
          x1="32"
          y1="2"
          x2="32"
          y2="62"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#EF311D" />
          <Stop offset="1" stopColor="#CB483C" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default PingingIcon;