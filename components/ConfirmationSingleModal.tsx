import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import normalize from '../styles/normalize';
import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants';
import {CloseIcon, ConfirmTransactionIcon} from '../assets/svgs';
import Globalstyles from '../styles';
import {Button, InactiveButton} from '.';

export default function ConfirmationSingleModal(props: any) {
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

          <Text style={styles.darktext20green}>Confirm Transaction</Text>
          <View style={Globalstyles.smallGap25} />
          <ConfirmTransactionIcon
            height={normalize(98, 'height')}
            width={normalize(259, 'height')}
          />
          <View style={Globalstyles.tiny15Gap} />
          <Text style={{textAlign: 'center'}}>
            <Text style={styles.darktext18gray}>
              You’re about to top up your {'\n'}savings with{' '}
              <Text style={styles.textHighlight}>₦{props.amt}</Text>
            </Text>
          </Text>
          <View style={Globalstyles.smallGap} />
          <View style={Globalstyles.centerRow}>
            <InactiveButton
              nobold
              linkText={'Cancel'}
              backgroundColor={'white'}
              onPress={props.onRequestClose}
              width={normalize(126, 'width')}
            />
            <View style={{width: normalize(10, 'width')}} />
            <Button
              title={'Confirm'}
              baseBold
              onPress={props.confirmPress}
              width={normalize(126, 'width')}
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
    height: normalize(380, 'height'),
    width: normalize(330, 'width'),
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  darktext20green: {
    fontSize: normalize(26.5054, 'width'),
    color: Colors.mainBgColor,
    fontFamily: 'Lato-Regular',
    lineHeight: 32,
    fontWeight: '500',
    letterSpacing: -1.15,
  },
  darktext18gray: {
    fontSize: normalize(18, 'width'),
    color: Colors.gray,
    fontFamily: 'Lato-Regular',
    lineHeight: 27,
    fontWeight: '500',
  },
  darktext14gray: {
    fontSize: normalize(14, 'width'),
    color: Colors.gray,
    fontFamily: 'Lato-Regular',
    lineHeight: 27,
    fontWeight: '500',
  },
  textHighlight: {
    color: Colors.darkText,
  },
});
