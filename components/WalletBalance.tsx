import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import {Colors} from '../constants';
import {MonieHarvest} from '../assets/svgs';
import GlobalStyles from '../styles';
import normalize from '../styles/normalize';
import texts from '../styles/texts';

export default function WalletBalance(props: any) {
  const {style, pressable, onPress, balance} = props;
  console.log(balance);
  return (
    <TouchableOpacity
      disabled={!pressable}
      style={[styles.container, style]}
      onPress={onPress}>
      <MonieHarvest />
      <Text
        style={[texts.darkText17Bold, styles.balance]}>{`₦ ${balance}`}</Text>
      <Text style={texts.darkGrayText10}>
        {props.addCurrent ? 'current wallet balance' : 'wallet balance'}
      </Text>
    </TouchableOpacity>
  );
}

WalletBalance.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
  pressable: PropTypes.bool,
  balance: PropTypes.number,
  onPress: PropTypes.func,
};

WalletBalance.defaultProps = {
  style: {},
  pressable: false,
  balance: 0,
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    width: normalize(270, 'width'),
    backgroundColor: Colors.backgroundLightGreen,
    alignItems: 'center',
    paddingVertical: normalize(8, 'height'),
    borderRadius: 2,
  },
  balance: {
    marginTop: normalize(5, 'height'),
  },
});
