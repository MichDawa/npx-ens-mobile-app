import React from 'react';
import Svg, { Path } from 'react-native-svg';

const BackIcon = (props) => {
  const { width = 32, height = 32, style } = props;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <Path
        d="M20.5467 9.88L18.6667 8L10.6667 16L18.6667 24L20.5467 22.12L14.44 16L20.5467 9.88Z"
        fill="#F2F2F2"
      />
    </Svg>
  );
};

export default BackIcon;