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
  StyleSheet,
} from 'react-native';
import {changeStack} from '../../../navigation.service';
import {LogoIcon} from '../../assets/svgs';
import {Button, InactiveButton, Layout} from '../../components';
import normalize from '../../styles/normalize';
import messaging from '@react-native-firebase/messaging';

const SplashScreen: React.FC<Props> = props => {
  //States
  const clearToken = async () => {
    await AsyncStorage.clear();
  };

  const checkNav = async () => {
    // setTimeout(() => {
    //   if (token === null) {
    // props.navigation.reset({
    //   index: 0,
    //   routes: [{name: 'AuthStack'}],
    // });
    //   } else {
    //     props.navigation.reset({
    //       index: 0,
    //       routes: [{name: 'AppStack'}],
    //     });
    //   }
    // }, 3000);
    clearToken();

    setTimeout(() => {
      changeStack('AuthStack');
      // props.navigation.reset({
      //         index: 0,
      //         routes: [{name: 'AppStack'}],
      //       });
    }, 3000);
  };

  useEffect(() => {
    checkNav();
  }, []);

  // Main
  return (
    <View style={styles.container}>
      <LogoIcon
        height={normalize(76.4, 'height')}
        width={normalize(94.14, 'width')}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});
