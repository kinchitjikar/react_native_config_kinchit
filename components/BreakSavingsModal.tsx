import React from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import normalize from '../styles/normalize';

import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants';
import {CloseIcon} from '../assets/svgs';
import Globalstyles from '../styles';
import {Button, InactiveButton} from '.';

export default function BreakSavingsModal(props: any) {
  return (
    <Modal
      transparent
      onRequestClose={props.onRequestClose}
      animationType="slide"
      visible={props.visible}>
      <View style={styles.container}>
        <View style={styles.loaderView}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: normalize(22.33, 'width'),
              top: normalize(22.33, 'width'),
            }}
            onPress={props.onRequestClose}>
            <CloseIcon />
          </TouchableOpacity>
          <View style={Globalstyles.bigGap50} />

          <Text style={styles.darktext20green}>Break Savings</Text>
          <View style={Globalstyles.tiny15Gap} />
          <Text
            style={
              styles.darktext15green
            }>{`Breaking your savings before the maturity \ndate will attract a 50% penalty fee on \nyour interest accrued.`}</Text>
          <View style={Globalstyles.smallGap25} />
          <View style={styles.iconContainer}>
            <Image
              style={styles.iconStyle}
              source={require('../assets/brokenSafe.png')}
            />
          </View>
          <View style={Globalstyles.smallGap} />
          <View style={[Globalstyles.centerRowAlignEven, {width: '100%'}]}>
            <InactiveButton
              baseBold
              linkText={'Cancel'}
              backgroundColor={'white'}
              width={normalize(127, 'width')}
              onPress={props.onRequestClose}
            />
            <Button
              title={'Continue'}
              baseBold
              onPress={props.continuePress}
              width={normalize(127, 'width')}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1,1,1,0.5)',
    position: 'absolute',
    zIndex: 2000,
  },

  loaderView: {
    height: normalize(395, 'height'),
    width: normalize(338, 'width'),
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  darktext20green: {
    fontSize: normalize(26.5054, 'width'),
    color: Colors.red,
    fontFamily: 'Lato-Medium',
    letterSpacing: -1.15,
  },
  darktext15green: {
    fontSize: normalize(15.461, 'width'),
    color: Colors.darkText,
    fontFamily: 'Lato-Medium',
    textAlign: 'center',
  },
  iconContainer: {
    width: normalize(93.69, 'width'),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(50, 'width'),
    backgroundColor: Colors.redLight,
  },
  iconStyle: {
    width: normalize(54.91, 'width'),
    height: normalize(60.74, 'height'),
  },
});
