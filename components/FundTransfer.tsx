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
import {ActiveRadio, BackArrowIcon, InactiveRadios} from '../assets/svgs';
import GlobalStyles from '../styles';
import normalize from '../styles/normalize';
import LinearGradient from 'react-native-linear-gradient';
import texts from '../styles/texts';
import Globalstyles from '../styles';

export default function FundTansfer(props: any) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.hideBorder
          ? {}
          : {borderBottomWidth: 0.5, borderColor: 'rgba(151,151,151,0.2)'},
      ]}
      key={props.id}
      onPress={props.onPress}>
      <View style={[Globalstyles.centerRow]}>
        {props.selected ? <ActiveRadio /> : <InactiveRadios />}
        <View>
          <Text style={texts.lighttext19gray}>{props.type}</Text>
        </View>
      </View>
      <Text style={texts.lightGray13}>{props.desc}</Text>
      {props.selectedId === 1 && (
        <View style={{height: normalize(10, 'height')}} />
      )}
      <View style={{marginLeft: normalize(30, 'width')}}>
        {props.renderSelectedView}
      </View>

      {/* {props.index === props.selectedIndex && <>{props.renderSelectedView}</>} */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: normalize(330, 'width'),
    paddingVertical: normalize(30, 'width'),
  },
});
