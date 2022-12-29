import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Login from '../screens/auth/login';
import Signup from '../screens/auth/signup';
import Onboarding from '../screens/auth/onboarding';
import Otp from '../screens/auth/otp';
import ForgotPassword from '../screens/auth/forgotPassword';
import ChangePassword from '../screens/auth/changePasswordScreen';

const Stack = createStackNavigator();
const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
};

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="Forgotpassword" component={ForgotPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}
