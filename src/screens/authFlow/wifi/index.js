import {StyleSheet} from 'react-native';
import React from 'react';
import {totalSize} from 'react-native-dimension';
import {Icons, Text, Wrapper} from '../../../components';
import {Icon} from '@rneui/themed';

export default function Wifi() {
  return (
    <Wrapper isGradient style={styles.Grad}>
      <Icon type="material-community" name="wifi-off" size={totalSize(33)} />
      <Text isXXLTitle>Not Connected</Text>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  Grad: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
