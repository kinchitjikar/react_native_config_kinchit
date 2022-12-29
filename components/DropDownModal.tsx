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

export default function DropDownModal(props: any) {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedItem, setItem] = useState(null);
  const [selectedID, setSelectedID] = useState(null);
  const onSelect = async () => {
    closeModal();
    await props.onSelect(selectedItem);

    setTimeout(() => {
      setSelectedID(null);
      setItem(null);
    }, 1000);
  };

  const openModal = () => setOptionsVisible(true);
  const closeModal = () => setOptionsVisible(false);

  return (
    <Modal
      transparent
      onRequestClose={props.onRequestClose}
      animationType="fade"
      visible={props.visible}>
      <View style={styles.container}>
        <View
          style={[
            styles.loaderView,
            {
              height: props.small ? undefined : normalize(440, 'height'),
            },
          ]}>
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
          <ScrollView
            contentContainerStyle={{
              width: normalize(320, 'width'),
              alignItems: 'center',
              paddingBottom: '10%',
            }}
            showsVerticalScrollIndicator={false}>
            {props.item.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={async () => {
                    setItem(item);
                    setSelectedID(
                      props.showValue === 'text' ? item.value : item.id,
                    );
                    // selectedItem === null ? {} : onSelect();
                  }}
                  style={[
                    styles.touchStyle,
                    {
                      backgroundColor:
                        props.showValue === 'text'
                          ? selectedID === item.value
                            ? Colors.backgroundLightGreen
                            : 'white'
                          : selectedID === item.id
                          ? Colors.backgroundLightGreen
                          : 'white',
                    },
                  ]}>
                  <Text style={styles.darktext15green}>
                    {props.showValue === 'text' ? item.text : item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* <Text style={styles.darktext20green}>Success!</Text>
          <View style={Globalstyles.tiny15Gap} />
          <Text style={styles.darktext15green}>{props.text}</Text>
          <View style={Globalstyles.smallGap25} />
          <OnBoard1
            height={normalize(168, 'height')}
            width={normalize(211, 'width')}
          />*/}
          {/* <View style={Globalstyles.smallGap} /> */}
          <Button
            title={'Select'}
            baseBold
            onPress={() => {
              selectedItem === null ? {} : onSelect();
            }}
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
    lineHeight: 32,
    fontWeight: '500',
    letterSpacing: -1.15,
  },

  darktext15green: {
    fontSize: normalize(15.461, 'width'),
    color: Colors.darkText,
    fontFamily: 'Lato-Regular',
    lineHeight: 18,
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
