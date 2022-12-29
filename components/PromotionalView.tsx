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
import LinearGradient from 'react-native-linear-gradient';
import texts from '../styles/texts';
import Globalstyles from '../styles';

export default function PromotionalView(props: any) {
  return (
    <>
      {!props.disabledText && <View style={Globalstyles.smallGap22} />}
      <TouchableOpacity
        key={props.item.id}
        style={styles.promotionalView}
        onPress={props.onPress}>
        <View>
          {!props.disabledText && (
            <Text style={texts.darkText15}>{props.item.text}</Text>
          )}
          <Text
            style={
              props.disabledText ? texts.text11gray : texts.lighttext13green
            }>
            {props.item.desc}
          </Text>
        </View>
        <View
          style={{
            bottom: normalize(0.8, 'height'),
            position: 'absolute',
            right: props.indexNumber === 1 ? 0 : props.disabledText ? 0 : 10,
          }}>
          {props.item.svgIcon}
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  promotionalView: {
    width: normalize(330, 'width'),
    height: normalize(78, 'height'),
    backgroundColor: '#DFF2D6',
    borderRadius: 7,
    // marginTop: normalize(22, 'height'),
    padding: 14,
    justifyContent: 'center',
  },
});
