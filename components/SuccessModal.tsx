import React from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import normalize from '../styles/normalize';

import GlobalStyles from '../styles';
import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants';
import {
  CloseIcon,
  ConfirmTransactionIcon,
  OnBoard1,
  SuccessIcon,
} from '../assets/svgs';
import Globalstyles from '../styles';
import {Button, InactiveButton} from '.';

export default function SuccessModal(props: any) {
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

          <Text style={styles.darktext20green}>
            {props.successText ? props.successText : `Success!`}
          </Text>
          <View style={Globalstyles.tiny15Gap} />
          <Text style={styles.darktext15green}>{props.text}</Text>
          <View style={Globalstyles.smallGap25} />
          <SuccessIcon
            height={normalize(168, 'height')}
            width={normalize(211, 'width')}
          />
          <View style={Globalstyles.smallGap} />
          <Button
            title={'Continue'}
            baseBold
            onPress={props.continuePress}
            width={normalize(225, 'width')}
          />
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
    height: normalize(440, 'height'),
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
    fontWeight: '500',
    letterSpacing: -1.15,
  },
  darktext15green: {
    fontSize: normalize(15.461, 'width'),
    color: Colors.darkText,
    fontFamily: 'Lato-Regular',
    fontWeight: '500',
    textAlign: 'center',
  },
});
