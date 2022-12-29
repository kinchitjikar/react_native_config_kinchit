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
import {WebView} from 'react-native-webview';

export default function PaymentWebView(props: any) {
  return (
    <View
      style={{
        height: DEVICE_HEIGHT - 100,
        width: DEVICE_WIDTH,
      }}>
      <WebView
        source={{
          uri: `${props.link}`,
        }}
        onLoadEnd={() => {
          console.log('s');
        }}
        originWhitelist={'["*"]'}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
        scrollEnabled={true}
        // thirdPartyCookiesEnabled
        style={{backgroundColor: 'white', flex: 1}}
        useWebKit={false}
        mixedContentMode={'always'}
        onNavigationStateChange={props.onNavigationStateChange}
        androidHardwareAccelerationDisabled={true}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        onHttpError={e => {
          console.log('Http eror', e);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
