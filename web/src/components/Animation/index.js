/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

export default function LottieControl({ animation, size, loop, autoplay }) {
  LottieControl.defaultProps = {
    size: 300,
    loop: true,
    autoplay: true,
  };

  LottieControl.propTypes = {
    animation: PropTypes.oneOfType([PropTypes.object]).isRequired,
    size: PropTypes.number,
    loop: PropTypes.bool,
    autoplay: PropTypes.bool,
  };

  const [isStopped, setStopped] = useState(false);
  const [isPaused, setPaused] = useState(false);

  const defaultOptions = {
    loop,
    autoplay,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      isStopped={isStopped}
      isClickToPauseDisabled
      isPaused={isPaused}
      height={size}
      width={size}
    />
  );
}
