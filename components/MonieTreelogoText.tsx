import React from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import normalize from '../styles/normalize';

import GlobalStyles from '../styles';
import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants';
import texts from '../styles/texts';

export default function MonieTreeLogoText(props: any) {
  return (
    <>
      <Text style={[texts.darktext20green, {fontWeight: 'bold'}]}>
        MonieTree
      </Text>
      {props.noGap ? <></> : <View style={GlobalStyles.tiny15Gap} />}
    </>
  );
}

const styles = StyleSheet.create({});
