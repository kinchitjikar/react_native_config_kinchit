import React, {useState} from 'react';
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
  ScrollView,
} from 'react-native';
import normalize from '../styles/normalize';

import GlobalStyles from '../styles';
import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants';
import {CloseIcon, ConfirmTransactionIcon, OnBoard1} from '../assets/svgs';
import Globalstyles from '../styles';
import {Button, InactiveButton} from '.';

export default function ErrorModal(props: any) {
  return (
    <Modal
      transparent
      onRequestClose={props.onRequestClose}
      animationType="fade"
      visible={props.visible}>
      <View style={styles.container}>
        <View style={styles.loaderView}>
          <View style={Globalstyles.smallGap25} />

          <Text style={styles.darktext20green}>Oops!</Text>
          <View style={Globalstyles.tiny15Gap} />
          <Text style={styles.darktext15green}>{props.text}</Text>
          <View style={Globalstyles.smallGap25} />
          {/*<OnBoard1
            height={normalize(168, 'height')}
            width={normalize(211, 'width')}
          />*/}
          {/* <View style={Globalstyles.smallGap} /> */}
          <Button
            title={'OK'}
            baseBold
            onPress={props.onRequestClose}
            width={normalize(225, 'width')}
          />
          <View style={Globalstyles.tinyGap} />
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
    height: normalize(189, 'height'),
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
    color: '#F47458',
    fontFamily: 'Lato-Regular',

    fontWeight: '500',
  },

  touchStyle: {
    width: normalize(300, 'width'),
    paddingLeft: normalize(10, 'width'),
    paddingVertical: normalize(10, 'height'),
    borderWidth: 0.8,
    marginTop: normalize(5, 'height'),
    borderRadius: 6,
    ...GlobalStyles.shadowBox3,
    borderColor: '#fafafa',
  },
});
