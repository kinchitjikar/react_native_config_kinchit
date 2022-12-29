import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import {Colors} from '../constants';
import GlobalStyles from '../styles';
import normalize from '../styles/normalize';

export default function InputBox(props: any) {
  let boxStyle = {...styles.box};
  let placeholdeStyles = {...styles.placeholderStyle};
  let textInputStyles = {...styles.textInputStyle};
  const [focus, setFocus] = useState(false);

  if (props.height) {
    boxStyle.height = props.height;
  }

  if (props.borderRadius) {
    boxStyle.borderRadius = props.borderRadius;
  }

  if (props.multiline) {
    textInputStyles.textAlignVertical = 'top';
    placeholdeStyles.textAlignVertical = 'top';
  }

  if (props.backgroundColor) {
    boxStyle.backgroundColor = props.backgroundColor;
    boxStyle.borderWidth = 1;
    boxStyle.borderColor = '#ECECEC';
  }

  if (focus) {
    textInputStyles.color = '#5A5656';
    placeholdeStyles.color = '#5A5656';
  }

  if (!focus) {
    textInputStyles.color = '#B8B8B8';
    placeholdeStyles.color = '#B8B8B8';
  }
  // if (props.placeHolderheight) {
  //   placeholdeStyles.height =
  //     Platform.OS == 'ios' ? props.placeHolderheight : undefined;
  //   textInputStyles.height =
  //     Platform.OS == 'ios' ? props.textInputHeight : undefined;
  // }
  if (props.width) {
    boxStyle.width = props.width;
  }
  if (props.leftButton) {
    placeholdeStyles.width = '100%';
  }
  if (props.star) {
    textInputStyles.top = '1%';
    // placeholdeStyles.top = '1%';
  }
  if (props.rightButton) {
    textInputStyles.paddingRight = normalize(25, 'width');
  }

  return (
    <View
      style={[
        boxStyle,
        // {alignItems: props.isMultine ? 'flex-start' : 'center'},
      ]}>
      {props.leftButton && (
        <TouchableOpacity
          style={styles.leftButton}
          onPress={props.leftOnPress}
          disabled={!props.leftOnPress}>
          {props.leftButton}
        </TouchableOpacity>
      )}
      <TextInput
        style={props.value ? textInputStyles : placeholdeStyles}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.placeholderTextColor}
        secureTextEntry={props.secureText}
        onChangeText={props.onChangeText}
        maxLength={props.maxLength}
        keyboardType={props.keyboardType}
        value={props.value}
        multiline={props.multiLine}
        onKeyPress={props.onKeyPress}
        editable={props.editable}
        autoFocus={props.autoFocus}
        selectionColor={
          props.baseSelect ? '#ECECEC' : Colors.placeholderTextColor
        }
        returnKeyType={props.returnKeyType}
        autoCapitalize={'none'}
        autoComplete={'off'}
        onSubmitEditing={props.onSubmitEditing}
        onBlur={() => {
          props.useBlur ? props.onBlur() : {};
          setFocus(false);
        }}
        onFocus={() => {
          // Alert.alert('call');
          setFocus(true);
        }}
      />
      {props.rightButton && (
        <TouchableOpacity
          style={styles.rightButton}
          onPress={props.rightOnPress}>
          {props.rightButton}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    borderRadius: normalize(3.312, 'width'),
    backgroundColor: '#ECECEC',
    paddingVertical: Platform.OS === 'android' ? 0 : normalize(14, 'width'),
    paddingHorizontal: normalize(12.14, 'width'),
    width: normalize(320, 'width'),
  },
  textInputStyle: {
    fontSize: normalize(15.46, 'width'),
    color: '#B8B8B8',
    fontFamily: 'Lato-Regular',
    alignSelf: 'flex-start',
    flex: 1,
    // lineHeight: 18.55,
    fontWeight: '900',

    // height:'20%'
  },
  placeholderStyle: {
    fontSize: normalize(15.46, 'width'),
    color: '#B8B8B8',
    fontFamily: 'Lato-Regular',
    width: '100%',
    flex: 1,
    fontWeight: '900',
  },
  rightButton: {
    // marginLeft: normalize(10, 'width'),
    alignSelf: 'center',
    position: 'absolute',
    right: normalize(10, 'width'),
  },
  leftButton: {
    alignSelf: 'center',
    // position: 'absolute',
    // left: normalize(10, 'width'),
  },
});
