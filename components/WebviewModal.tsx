import React, {useState} from 'react';
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
  ScrollView,
} from 'react-native';
import normalize from '../styles/normalize';

import GlobalStyles from '../styles';
import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants';
import {CloseIcon, ConfirmTransactionIcon, OnBoard1} from '../assets/svgs';
import Globalstyles from '../styles';
import {Button, InactiveButton} from '.';
import {WebView} from 'react-native-webview';
const html = `
<html>
<head></head>
<body>
  <script>
  (function (w, d, u) {
    var s = d.createElement('script'); s.async = true; s.src = u + '?' + (Date.now() / 60000 | 0);
    var h = d.getElementsByTagName('script')[0]; h.parentNode.insertBefore(s, h);
  })(window, document, 'https://cdn.bitrix24.com/b16897707/crm/site_button/loader_9_r1a4es.js');
  </script>
</body>
</html>
`;
export default function WebviewModal(props: any) {
  return (
    <Modal
      transparent
      onRequestClose={props.onRequestClose}
      animationType="fade"
      visible={props.visible}>
      <View style={styles.container}>
        <View style={styles.loaderView}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: normalize(22.33, 'width'),
              top: normalize(22.33, 'width'),
              zIndex: 1200,
            }}
            onPress={props.onRequestClose}>
            <CloseIcon />
          </TouchableOpacity>
          <WebView
            source={{
              uri: 'https://b24-n7v27w.bitrix24.com/online/monitree',
            }}
            originWhitelist={'["*"]'}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scalesPageToFit={true}
            scrollEnabled={true}
            // thirdPartyCookiesEnabled
            style={{
              // height: normalize(320, 'height'),
              width: normalize(320, 'width'),
            }}
            useWebKit={false}
            mixedContentMode={'always'}
            onNavigationStateChange={({url, canGoBack}) => {}}
            androidHardwareAccelerationDisabled={true}
            cacheEnabled={false}
            cacheMode="LOAD_NO_CACHE"
            onHttpError={e => {
              console.log('Http eror', e);
            }}
          />
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
    // zIndex: 2000,
  },

  loaderView: {
    height: normalize(440, 'height'),
    width: normalize(330, 'width'),
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
