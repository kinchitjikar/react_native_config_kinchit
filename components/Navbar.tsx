import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants';
import {BackArrowIcon} from '../assets/svgs';
import GlobalStyles from '../styles';
import normalize from '../styles/normalize';
import Globalstyles from '../styles';

export default function Navbar(props: any) {
  let iconSize = 33.06;
  let titleFont = props.titleFont
    ? props.titleFont
    : normalize(26.624, 'width');
  //   let textColor = '#4AB945';
  //   if (props.modal) {
  //     iconSize = 16;
  //     titleFont = props.titleFont ? props.titleFont : 18;
  //     textColor = Colors.darktextColor;
  //   }

  const getImage = (imageName: string) => {
    switch (imageName) {
      case 'darkClose':
        return (
          <BackArrowIcon
            width={normalize(iconSize, 'width')}
            height={normalize(iconSize, 'width')}
          />
        );
      //   case 'leftArrow':
      //     return (
      //       <LeftArrowIcon
      //         width={normalize(iconSize, 'width')}
      //         height={normalize(iconSize, 'width')}
      //       />
      //     );
      //   case 'lightClose':
      //     return (
      //       <TransparentClose
      //         width={normalize(iconSize, 'width')}
      //         height={normalize(iconSize, 'height')}
      //       />
      //     );
      //   case 'history':
      //     return (
      //       <HistoryIcon
      //         width={normalize(24, 'width')}
      //         height={normalize(24, 'width')}
      //       />
      //     );
      default:
        return null;
    }
  };

  const renderIcon = (icon: any, _onPress: any, side: string) => {
    return (
      <TouchableOpacity
        style={[
          styles.iconContainer,
          // side === 'left' ? {marginRight: 25} : {marginLeft: 10},
          {position: 'absolute', left: normalize(20, 'width')},
        ]}
        onPress={
          icon === 'darkClose'
            ? () => {
                props.navigation.goBack();
              }
            : _onPress
        }>
        {getImage(icon)}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container]}>
      <View
        style={[
          Globalstyles.row,
          {
            width: props.textOnLeft ? normalize(330, 'width') : DEVICE_WIDTH,
            justifyContent: props.textOnLeft ? 'flex-start' : 'center',
          },
        ]}>
        {props.leftIcon &&
          renderIcon(props.leftIcon, props.leftOnPress, 'left')}
        <View>
          <Text
            style={[
              {
                fontSize: normalize(titleFont, 'width'),
                color: Colors.mainBgColor,
                // lineHeight: 32,
                fontFamily: 'Lato-Regular',
                fontWeight: '500',
                textAlign: 'center',
                letterSpacing: -1.15,
              },
            ]}>
            {props.title}
            <Text style={{color: Colors.darkText}}>{props.linkText}</Text>
          </Text>
          <View style={{height: normalize(13.59, 'height')}} />
          {props.subText && (
            <Text
              style={[
                styles.darkText15,
                props.isSubTextBlack && styles.darkTextBlack,
                // {
                //   width: props.subText.length > 60 ? '80%' : undefined,
                //   alignSelf: 'center',
                // },
              ]}>
              {props.subText}
            </Text>
          )}
        </View>
      </View>
      {/* {props.rightIcon &&
        renderIcon(props.rightIcon, props.rightOnPress, 'right')}
      {props.rightButton && props.rightButton}
      {props.rightButton2 && props.rightButton2} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: DEVICE_WIDTH,
  },
  darkText15: {
    fontSize: normalize(15, 'width'),
    lineHeight: 18,
    fontFamily: 'Lato-Regular',
    fontWeight: '500',
    color: Colors.darkText,
    width: '100%',
    textAlign: 'center',
  },
  darkTextBlack: {
    color: Colors.gray,
  },
});
