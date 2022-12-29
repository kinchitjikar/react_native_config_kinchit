import React, {useEffect, useRef} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Tabs from './tabs';

import Login from '../screens/auth/login';
import Signup from '../screens/auth/signup';
import FundWallet from '../screens/fundWallet';
const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      // mode="modal"
      // initialRouteName="Tabs"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  );
}
