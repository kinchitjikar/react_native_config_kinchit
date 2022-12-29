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
import {navigate} from '../../navigation.service';

export default function WalletView(props: any) {
  return (
    <LinearGradient
      style={styles.linearGradientView}
      colors={['#EEEEEE', '#D8D8D8']}>
      <TouchableOpacity
        onPress={() => navigate('Mainsavings')}
        style={{alignItems: 'center', width: '100%'}}>
        <View style={{height: normalize(11, 'height')}} />
        <Text style={texts.text13gray}>Total Balance</Text>
        <Text style={texts.title36green}>₦ {props.amt}</Text>
        <View style={{height: normalize(13, 'height')}} />
      </TouchableOpacity>

      <View
        style={{
          width: normalize(283, 'width'),
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          borderTopWidth: 1,
          marginHorizontal: 1,
          borderColor: Colors.darkGrayText,
        }}>
        <TouchableOpacity onPress={props.onLeftPress}>
          <Text
            style={[
              texts.darkText14height32,
              {marginVertical: normalize(4, 'height')},
            ]}>
            {props.leftButtonText}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: 1,
            marginVertical: normalize(7, 'height'),
            backgroundColor: Colors.darkGrayText,
          }}
        />
        <TouchableOpacity onPress={props.onRightPress}>
          <Text
            style={[
              texts.darkText14height32,
              {marginVertical: normalize(4, 'height')},
            ]}>
            {props.rightbuttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradientView: {
    width: normalize(283, 'width'),
    backgroundColor: '#D8D8D8',
    borderRadius: 4.416,
    alignItems: 'center',
    elevation: 5,
    borderColor: '#D8D8D8',
    shadowColor: 'black',
    shadowOffset: {width: 10, height: 50},
    shadowOpacity: 1.0,
    borderWidth: 1,
    justifyContent: 'center',
  },
});
