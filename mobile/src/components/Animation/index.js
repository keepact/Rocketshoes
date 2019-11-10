import React, { useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

import { AnimatedContainer } from './styles';

export default function Animation({ animation, size, expansion, autoplay }) {
  const [progress, setProgress] = useState(new Animated.Value(0));

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
      />
    </AnimatedContainer>
  );
}
