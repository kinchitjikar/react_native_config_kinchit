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
import Globalstyles from '../styles';

export default function InactiveButton(props: any) {
  let buttonStyle = {...styles.buttonContainer, ...props.style};

  //   if (props.height) {
  //     buttonStyle.height = props.height;
  //   }

  if (props.width) {
    buttonStyle.width = props.width;
  }
  if (props.borderRadius) {
    buttonStyle.borderRadius = props.borderRadius;
  }

  //   if (props.borderColor) {
  //     buttonStyle.borderColor = props.borderColor;
  //     buttonStyle.borderWidth = 1;
  //   }

  if (props.backgroundColor) {
    buttonStyle.backgroundColor = props.backgroundColor;
  }

  let textStyle = {...styles.textStyle};
  let linkStyle = {...styles.linkStyle};
  if (props.nobold) {
    textStyle.fontWeight = '500';
    linkStyle.fontWeight = '500';
  }

  if (props.titleFontSize) {
    linkStyle.fontSize = props.titleFontSize;
  }
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

      <Text style={textStyle}>
        {props.title ? props.title : ''}
        <Text style={[linkStyle]}>{props.linkText}</Text>{' '}
      </Text>
      {props.rightButton && (
        <TouchableOpacity
          style={[styles.rightButton]}
          onPress={props.rightOnPress}>
          {props.rightButton}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: normalize(320, 'width'),
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1.10106,
    borderColor: Colors.primaryButtonColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: normalize(16, 'width'),
    color: '#8A8A8A',
    fontFamily: 'Lato-Regular',
    fontWeight: '900',
  },
  buttonIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginRight: 5,
  },
  linkStyle: {
    textAlign: 'center',
    fontSize: normalize(16, 'width'),
    color: Colors.primaryButtonColor,
    fontFamily: 'Lato-Regular',
    fontWeight: '900',
  },
  rightButton: {
    alignSelf: 'center',
    position: 'absolute',
    right: normalize(5, 'width'),
  },
});
