import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground,
} from 'react-native';

import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants';
import {BackArrowIcon} from '../assets/svgs';
import GlobalStyles from '../styles';
import normalize from '../styles/normalize';
import LinearGradient from 'react-native-linear-gradient';
import texts from '../styles/texts';
import Globalstyles from '../styles';

export default function TreeList(props: any) {
  let treeImageView = {...styles.treeImageView};
  if (props.height) {
    treeImageView.height = props.height;
  }

  if (props.width) {
    treeImageView.width = props.width;
  }

  if (props.paddingLeft) {
    treeImageView.paddingLeft = props.paddingLeft;
  }
  return (
    <>
      <TouchableOpacity onPress={props.onPress}>
        <ImageBackground
          source={require('../assets/treeHome.png')}
          style={treeImageView}
          resizeMode="contain"
          key={props.item.id}>
          <View style={{width: '100%'}}>
            <Text
              style={
                props.bigText ? texts.lighttext16black : texts.lighttext14black
              }>
              {props.treeText}
            </Text>
            <Text
              style={
                props.bigText ? texts.lighttext11green : texts.lighttext10green
              }>
              {props.percent}
            </Text>
            <Text
              style={
                props.bigText ? texts.lighttext11brown : texts.lighttext10brown
              }>
              {props.months}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  treeImageView: {
    width: normalize(160, 'width'),
    height: normalize(84, 'height'),
    // marginLeft: normalize(25, 'width'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: normalize(70, 'width'),
    paddingTop: 10,
  },
});
