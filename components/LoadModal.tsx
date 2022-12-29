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

export default function LoadModal(props: any) {
  return (
    <Modal
      transparent
      onRequestClose={props.onRequestClose}
      animationType="fade"
      visible={props.visible}>
      <View style={styles.container}>
        <View style={styles.loaderView}>
          <ActivityIndicator size="large" color={Colors.mainBgColor} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1,1,1,0.5)',
    position: 'absolute',
    zIndex: 2000,
  },

  loaderView: {
    height: normalize(80, 'height'),
    width: normalize(80, 'width'),
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
