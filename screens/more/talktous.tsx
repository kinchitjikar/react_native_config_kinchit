import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Linking,
  StyleSheet,
} from 'react-native';
import {
  BankIcon,
  FaqIcon,
  LogoIcon,
  LogoutIcon,
  SettingIcon,
  TalktousIcon,
  UserIcon,
} from '../../assets/svgs';
import {Button, InactiveButton, Layout, WebviewModal} from '../../components';
import InputBox from '../../components/InputBox';
import Navbar from '../../components/Navbar';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import styles from './styles';
import {changeStack} from '../../../navigation.service';
import {WebView} from 'react-native-webview';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../constants';
import {useKeyboard} from '../../services/constant';

// import normalize from '../../styles/normalize';

const settings = [
  {
    text: 'Banks & Cards',
    icon: <BankIcon />,
  },
  {
    text: 'FAQs',
    icon: <FaqIcon />,
  },
  {
    text: 'Talk to Us',
    icon: <TalktousIcon />,
  },
  {
    text: 'Settings',
    icon: <SettingIcon />,
  },
  {
    text: 'Logout',
    icon: <LogoutIcon />,
  },
];

const Talktous: React.FC<Props> = props => {
  //States
  const [loading, setLoading] = useState(true);
  const [showWebview, setShowWebview] = useState(false);
  const keyboardHeight = useKeyboard();
  console.log(keyboardHeight);
  //Helpers

  // api calls

  // Constants

  // Main
  return (
    // <KeyboardAwareScrollView
    //   contentContainerStyle={{}}
    //   style={{flex: 1, backgroundColor: 'white'}}
    //   showsVerticalScrollIndicator={false}
    //   enableOnAndroid={true}
    //   keyboardShouldPersistTaps={'handled'}
    //   enableResetScrollToCoords={false}>

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        // marginBottom:
        //   keyboardHeight === 0 ? keyboardHeight : keyboardHeight - 500,
      }}>
      {Platform.OS === 'android' && (
        <View
          style={{
            height:
              keyboardHeight === 0
                ? DEVICE_HEIGHT - 100
                : DEVICE_HEIGHT - 100 - keyboardHeight,
            width: DEVICE_WIDTH,
            // position: 'absolute',
            // bottom: 0,
          }}>
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
            style={{backgroundColor: 'white', flex: 1}}
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
      )}

      {Platform.OS === 'ios' && (
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
          style={{backgroundColor: 'white', flex: 1}}
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
      )}
    </SafeAreaView>

    // </KeyboardAwareScrollView>
  );
};

export default Talktous;
