import { Image } from 'react-native';
import React from 'react';
const sunny = require('../assets/sunny.png');
const rainy = require('../assets/rainy.png');
const cloudy = require('../assets/cloudy.png');
const WeatherImage = ({ weatherType }: any) => {
  return (
    <Image
      source={
        weatherType === 'Clear'
          ? sunny
          : weatherType === 'Clouds'
            ? cloudy
            : rainy
      }
      style={{ position: 'absolute', top: 0, right: 0 }}
    />
  );
};

export default WeatherImage;
