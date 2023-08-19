import React, {Component} from 'react';
import {Wrapper, Text} from '../../../components';
import {appStyles} from '../../../services';
import {StyleSheet} from 'react-native';

function Splash() {
  return (
    <Wrapper isGradient style={styles.Grad}>
      <Text isXLTitle>
        Mr. Abubakar's
      </Text>
      <Text isXLTitle>
        Portfolio
      </Text>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  Grad: {
    justifyContent: 'center',
    alignItems: "center"
  },
});

export default Splash;
