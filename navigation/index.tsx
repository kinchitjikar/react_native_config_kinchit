import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import AuthStack from './authStack';
import AppStack from './appStack';
import SplashScreen from '../screens/splashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../../navigation.service';
import FundWalletNewCard from '../screens/savings/fundwalletNewCard';
import NewCard from '../screens/monieTree/newCard';

// import Button from '../components/button';
// import { Colors } from '../constants';

// import SplashScreen from '../screens/splashScreen/index'

const Stack = createStackNavigator();
// const TransitionScreenOptions = {
//   ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
// };
const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
};

export default function AppNavigator() {
  return (
    <NavigationContainer independent ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen name="Splashscreen" component={SplashScreen} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AppStack" component={AppStack} />
        <Stack.Screen name="FundWalletNewCard" component={FundWalletNewCard} />
        <Stack.Screen name="NewCard" component={NewCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
