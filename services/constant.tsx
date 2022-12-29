import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';
export const Axios = axios;
import AsyncStorage from '@react-native-async-storage/async-storage';
export const BASE_URL = 'https://monitree-api.staging-cpg.online/v1/';
export const asyncStorage = AsyncStorage;
export const BASE_TOKEN =
  'bW9uaWVfdHJlZV92MTpmckdrNTdmaFVraWozMnNEZUVydHloYktsanVlZDdIZ3Q=';
export const internetText = 'Check internet connection';

export async function headersData() {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic bW9uaWVfdHJlZV92MTpmckdrNTdmaFVraWozMnNEZUVydHloYktsanVlZDdIZ3Q=`,
    },
  };
}

export function checkInterNet() {
  NetInfo.fetch().then(async state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
    if (state.isConnected) {
      return true;
    } else {
      return false;
    }
  });
}


export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e: KeyboardEvent) {
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  return keyboardHeight;
};