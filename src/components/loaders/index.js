import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Icon} from '@rneui/base';
import {height, totalSize, width} from 'react-native-dimension';
import {colors, appStyles, sizes} from '../../services';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import Wrapper from '../wrapper';
import Text from '../text';
import Spacer from '../spacer';

export const Primary = ({}) => {
  return (
    <Wrapper isMain>
      <Wrapper
        flex={1}
        style={[{justifyContent: 'center', backgroundColor: 'transparent'}]}>
        <Wrapper style={[appStyles.center, {backgroundColor: 'transparent'}]}>
          <MaterialIndicator color={colors.appColor1} size={sizes.icons.xxl} />
          {/* <Spacer isBasic /> */}
          <Spacer isBasic />
          {/* <Text isRegular isLightGray style={[appStyles.textLightGray]}>
            Loading
          </Text> */}
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export const Secondary = ({isVisible}) => {
  return (
    <>
      {isVisible ? (
        <Wrapper
          isAbsoluteFill
          animation="fadeIn"
          style={[
            {
              justifyContent: 'center',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: colors.appBgColor1 + 'BF',
            },
          ]}>
          <Wrapper style={[appStyles.center, {backgroundColor: 'transparent'}]}>
            <BallIndicator color={colors.appColor1} size={sizes.icons.xxl} />
            <Spacer isBasic />
            <Text isRegular>Loading</Text>
          </Wrapper>
        </Wrapper>
      ) : null}
    </>
  );
};

export const Tertiary = ({}) => {
  return (
    <Wrapper justifyContentCenter flex={1}>
      <Wrapper style={[appStyles.center]}>
        <UIActivityIndicator color={colors.appColor1} size={totalSize(20)} />
        <Spacer isBasic />
        {/* <Text isSmallTitle isLightGray style={[appStyles.textLightGray]}>
          Connecting
        </Text> */}
      </Wrapper>
    </Wrapper>
  );
};
