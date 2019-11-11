import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

import { AnimatedContainer } from './styles';

export default function Animation({ animation, size, autoplay, loop }) {
  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useState(new Animated.Value(0));

  Animation.defaultProps = {
    size: 300,
    autoplay: true,
    loop: true,
  };

  Animation.propTypes = {
    animation: PropTypes.oneOfType([PropTypes.object]).isRequired,
    loop: PropTypes.bool,
    size: PropTypes.number,
    autoplay: PropTypes.bool,
  };

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
  });

  return (
    <AnimatedContainer>
      <LottieView
        source={animation}
        expansion={progress}
        width={size}
        height={size}
        autoPlay={autoplay}
        loop={loop}
      />
    </AnimatedContainer>
  );
}
