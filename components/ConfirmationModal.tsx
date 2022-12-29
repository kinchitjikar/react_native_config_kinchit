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
import {CloseIcon, ConfirmTransactionIcon} from '../assets/svgs';
import Globalstyles from '../styles';
import {Button, InactiveButton} from '.';

export default function ConfirmationModal(props: any) {
  if (props.differentCustomModal) {
    return (
      <Modal
        transparent
        onRequestClose={props.onRequestClose}
        animationType="slide"
        visible={props.visible}>
        <View style={styles.container}>
          <View
            style={[
              styles.customLoaderView,
              {
                justifyContent: props.loader ? 'center' : 'flex-start',
                minHeight: props.loader ? 430 : undefined,
              },
            ]}>
            {props.loader ? (
              <ActivityIndicator size="large" color={Colors.mainBgColor} />
            ) : (
              <>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: normalize(22.33, 'width'),
                    top: normalize(22.33, 'width'),
                    zIndex: 1000,
                  }}
                  onPress={props.onRequestClose}>
                  <CloseIcon />
                </TouchableOpacity>
                {props.title && (
                  <>
                    <View style={Globalstyles.bigGap50} />
                    <Text style={styles.darktext20green}>{props.title}</Text>
                    <View style={Globalstyles.smallGap25} />
                  </>
                )}
                {props.confirmIcon && (
                  //  <ConfirmTransactionIcon
                  //     height={normalize(98, 'height')}
                  //     width={normalize(259, 'height')}
                  //   />
                  <>
                    {props.confirmIcon}
                    <View style={Globalstyles.tiny15Gap} />
                  </>
                )}
                {props.customText && props.customText}
                {/* <View style={Globalstyles.smallGap25} /> */}
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
              </>
            )}
          </View>
        </View>
      </Modal>
    );
  } else {
    return (
      <Modal
        transparent
        onRequestClose={props.onRequestClose}
        animationType="slide"
        visible={props.visible}>
        <View style={styles.container}>
          <View
            style={[
              styles.loaderView,
              {
                height: props.differentText
                  ? normalize(400, 'height')
                  : normalize(430, 'height'),
                justifyContent: props.loader ? 'center' : 'flex-start',
              },
            ]}>
            {props.loader ? (
              <ActivityIndicator size="large" color={Colors.mainBgColor} />
            ) : (
              <>
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
                {props.customText ? (
                  props.customText
                ) : (
                  <>
                    <Text style={{textAlign: 'center', width: '95%'}}>
                      {props.differentText ? (
                        <Text style={[styles.darktext18gray]}>
                          You’re about to withdraw{' '}
                          <Text
                            style={{
                              color: '#277424',
                            }}>{`\n₦${props.amt}`}</Text>{' '}
                          to your bank account{' '}
                          <Text style={{color: '#277424'}}>
                            {props.duration}
                          </Text>
                          {props.duration ? '.' : ''}
                        </Text>
                      ) : (
                        <Text style={styles.darktext18gray}>
                          You’re about to save{' '}
                          <Text style={{color: '#277424'}}>₦{props.amt}</Text>{' '}
                          for{' '}
                          <Text style={{color: '#277424'}}>
                            {props.duration}
                          </Text>
                          .
                        </Text>
                      )}
                      {props.hideSubText ? (
                        <> </>
                      ) : (
                        <Text style={[styles.darktext14gray]}>
                          {props.darktext14gray
                            ? `\n${props.darktext14gray}`
                            : `\nYour funds are locked until the due date.`}
                        </Text>
                      )}
                      {/* You will not be able to withdraw your \nmoney until the due date. */}
                    </Text>
                  </>
                )}
                <View style={Globalstyles.smallGap25} />
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
              </>
            )}
          </View>
        </View>
      </Modal>
    );
  }
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
    height: normalize(430, 'height'),
    width: normalize(330, 'width'),
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  customLoaderView: {
    // height: normalize(430, 'height'),
    width: normalize(330, 'width'),
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 30,
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
});
