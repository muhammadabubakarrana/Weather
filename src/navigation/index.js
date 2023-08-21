import React, {useEffect, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {Splash, Home, Wifi} from '../screens';

export default function Navigation() {
  const [loading, setLoading] = useState(true);
  const net = useNetInfo();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  if (loading) {
    return <Splash />;
  } else {
    return net.isConnected ? <Home /> : <Wifi />;
  }
}
