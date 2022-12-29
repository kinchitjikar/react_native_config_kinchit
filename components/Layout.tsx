import React, {useState, useEffect} from 'react';
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
  ImageBackground,
  Dimensions,
} from 'react-native';
import {ErrorModal, LoadModal} from '.';
import normalize from '../../src/styles/normalize';
import Globalstyles from '../styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NetInfo from '@react-native-community/netinfo';
import AuthService from '../services/authServices';
import {internetText} from '../services/constant';

const Layout = props => {
  const [hideView, setHideView] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState(internetText);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        setHideView(false);
      } else {
        setHideView(true), setErrorModal(true);
      }

      return () => {
        console.log('unsubscribe');

        if (unsubscribe) {
          unsubscribe();
        }
      };
    });
  }, []);

  const showModal = () => {
    return (
      <ErrorModal
        visible={errorModal}
        onRequestClose={async () => {
          setErrorModal(false),
            errorModalMsg === 'Login session timout'
              ? AuthService.sessionTimeOut()
              : {};
        }}
        text={`${errorModalMsg}`}
      />
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: props.noCenter ? 'flex-start' : 'center',
        alignItems: 'center',
      }}>
      {Platform.OS === 'ios' ? (
        <KeyboardAwareScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: props.noBottomPad ? 0 : '10%',
          }}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          keyboardShouldPersistTaps={'handled'}
          enableResetScrollToCoords={false}>
          {props.needToHideView ? (
            <>
              {hideView ? (
                <View>
                  {props.errorModal}
                  {errorModal && showModal()}
                </View>
              ) : props.loading ? (
                <LoadModal />
              ) : (
                props.children
              )}
            </>
          ) : props.loading ? (
            <LoadModal />
          ) : (
            props.children
          )}
          {/* {props.loading ? <LoadModal /> : props.children} */}
        </KeyboardAwareScrollView>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: props.noBottomPad ? 0 : '10%',
          }}>
          {props.needToHideView ? (
            <>
              {hideView ? (
                <View>{props.errorModal}</View>
              ) : props.loading ? (
                <LoadModal />
              ) : (
                props.children
              )}
            </>
          ) : props.loading ? (
            <LoadModal />
          ) : (
            props.children
          )}

          {/* {props.loading ? <LoadModal /> : props.children} */}
        </ScrollView>
      )}

      {/* {props.loading && <LoadModal />} */}
    </SafeAreaView>
  );
};

export default Layout;
