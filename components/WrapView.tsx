import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import normalize from '../../src/styles/normalize';
import Globalstyles from '../styles';

const WrapLayout = props => {
  return <View style={styles.wrapView}>{props.children}</View>;
};

export default WrapLayout;

const styles = StyleSheet.create({
  wrapView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: normalize(330, 'width'),
  },
});
