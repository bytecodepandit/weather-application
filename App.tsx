/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { View, Dimensions } from 'react-native';
import Home from './app/Home';
const { height, width } = Dimensions.get('window');

const App = () => {
  return <View style={{
    height: height,
    backgroundColor: '#191a1e',
  }}>
    <Home />
  </View>;
};


export default App;
