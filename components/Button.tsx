import React from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import normalize from '../styles/normalize';

import {Colors, DEVICE_HEIGHT} from '../constants';

export default function Button(props: any) {
  let buttonStyle = {...styles.buttonContainer, ...props.style};

  //   if (props.height) {
  //     buttonStyle.height = props.height;
  //   }

  if (props.width) {
    buttonStyle.width = props.width;
  }

  //   if (props.borderColor) {
  //     buttonStyle.borderColor = props.borderColor;
  //     buttonStyle.borderWidth = 1;
  //   }

  if (props.backgroundColor) {
    buttonStyle.backgroundColor = props.backgroundColor;
  }

  if (props.disabled) {
    buttonStyle.backgroundColor = '#BDB7B7';
  }

  let textStyle = {...styles.textStyle};
  if (props.nobold) {
    textStyle.fontWeight = '500';
  }

  if (props.baseBold) {
    textStyle.fontWeight = 'bold';
  }

  //   if (props.titleFontSize) {
  //     textStyle.fontSize = props.titleFontSize;
  //   }
  //   if (props.fontFamily) {
  //     textStyle.fontFamily = props.fontFamily;
  //   }

  //   if (props.disabled) {
  //     buttonStyle.backgroundColor = props.disableColor;
  //     textStyle.color = props.disableTextColor;
  //   } else {
  //     buttonStyle.backgroundColor = props.buttonColor;
  //     textStyle.color = props.textColor;
  //   }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={props.onPress}
      disabled={props.disabled}>
      {/* {props.buttonIcon && (
        <Image source={props.buttonIcon} style={styles.buttonIcon} />
      )} */}
      <Text style={textStyle}> {props.title} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: normalize(320, 'width'),
    height: 50,
    backgroundColor: Colors.primaryButtonColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: normalize(16, 'width'),
    color: 'white',
    fontFamily: 'Lato-Regular',
    fontWeight: '900',
  },
  buttonIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginRight: 5,
  },
});
