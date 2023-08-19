import React, {useEffect, useState} from 'react';

import {Splash} from '../screens/authFlow';

import {Home} from '../screens/appFlow';

export default function Navigation() {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  });

  if (loading) return <Splash />;
  else return <Home />;
}
