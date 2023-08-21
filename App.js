import React from 'react';
import Navigation from './src/navigation';
import {RootSiblingParent} from 'react-native-root-siblings';
import {Wifi} from './src/screens';
export default function App() {
  return (
    <RootSiblingParent>
      <Navigation />
    </RootSiblingParent>
  );
}
