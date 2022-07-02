import { View, Text } from 'react-native';
import React from 'react';

const WeatherInfoCard = ({ temp, country, city, state, weatherType }) => {
  return (
    <React.Fragment>
      <View style={{  justifyContent: 'center', alignItems: 'center' }}>
        <View style={{position: 'relative',}}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 40
            }}>{temp}</Text>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 100,
              backgroundColor: '#fff',
              position: 'absolute',
              right: -5,
              top: 0,
            }}
          />
        </View>
      </View>
      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
          fontWeight: '100',
          fontSize: 40,
        }}>
        {weatherType}
      </Text>
      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
          fontWeight: '100',
          fontSize: 30,
          marginTop: 15,
        }}>
        {city}, {state}, {country}
      </Text>
    </React.Fragment>
  );
};

export default WeatherInfoCard;
