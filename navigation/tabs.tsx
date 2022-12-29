import React from 'react';
import {Image, Dimensions, View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, NavigationState} from '@react-navigation/native';

import Home from '../screens/home';
import Savings from '../screens/savings';
import New from '../screens/new';
import More from '../screens/more';

import normalize from '../styles/normalize';

import Tabbar from './tabBar';
import {HomeScreenNavigator} from '../components/CustomNavigator';
import {MoreScreenNavigator} from '../components/CustomMoreNavigator';
import {navigationRef} from '../../navigation.service';
import {SavingsNavigator} from '../components/CustomSavingsNavigator';

const Tabs = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    // <NavigationContainer ref={navigationRef} independent>
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <Tabbar {...props} />}>
      <Tabs.Screen
        name="MainHome"
        component={HomeScreenNavigator}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="Mainsavings"
        component={SavingsNavigator}
        options={{
          tabBarLabel: 'Savings',
        }}
      />

      <Tabs.Screen
        name="New"
        component={New}
        options={{
          tabBarLabel: 'New',
        }}
      />

      <Tabs.Screen
        name="Mainmore"
        component={MoreScreenNavigator}
        options={{
          tabBarLabel: 'More',
        }}
      />
    </Tabs.Navigator>
    // </NavigationContainer>
  );
}
