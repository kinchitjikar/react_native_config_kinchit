import React from 'react';
import {
  Image,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

import normalize from '../styles/normalize';
import {Colors, DEVICE_WIDTH} from '../constants';
import GlobalStyles from '../styles';

import {
  HomeInactiveIcon,
  HomeActiveIcon,
  LockInactiveIcon,
  LockActiveIcon,
  GiftInactiveIcon,
  GiftActiveIcon,
  MoreInactiveIcon,
  MoreActiveIcon,
} from '../assets/svgs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';


const getIcon = (label: string, focused: boolean) => {
  if (Platform.OS === 'android') {
    switch (label) {
      case 'Home':
        return focused ? HomeActiveIcon : HomeInactiveIcon;
      case 'Savings':
        return focused ? LockActiveIcon : LockInactiveIcon;
      case 'New':
        return focused ? GiftActiveIcon : GiftInactiveIcon;
      case 'More':
        return focused ? MoreActiveIcon : MoreInactiveIcon;
      default:
        return null;
    }
  }
  switch (label) {
    case 'Home':
      return focused ? HomeActiveIcon : HomeInactiveIcon;
    case 'Savings':
      return focused ? LockActiveIcon : LockInactiveIcon;
    case 'New':
      return focused ? GiftActiveIcon : GiftInactiveIcon;
    case 'More':
      return focused ? MoreActiveIcon : MoreInactiveIcon;

    default:
      return null;
  }
};

interface Props {}

export default function TabBar({state, descriptors, navigation}) {
  const route = useRoute();
  console.log('Tabs',route.name);
  return (
    <View style={[styles.container]}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const Icon = getIcon(label, isFocused);

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabStyle}>
            <View style={isFocused ? styles.focusedView : styles.unFocusedView}>
              <Icon
                style={styles.iconStyle}
                height={normalize(16.87, 'width')}
                width={normalize(16.67, 'width')}
              />
              <Text
                style={[
                  styles.labelStyle,
                  isFocused ? styles.focusedLabel : styles.unfocusedLabel,
                ]}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.shadowBox,
    width: DEVICE_WIDTH,
    // borderRadius: normalize(30, 'height'),
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',

    paddingBottom:
      Platform.OS === 'android'
        ? normalize(8, 'height')
        : normalize(20, 'height'),
    paddingTop: normalize(8, 'height'),
    paddingHorizontal: normalize(16, 'width'),
    borderWidth: 1,
    borderColor: '#DFF2D6',
    shadowColor: '#DFF2D6',

    shadowOffset: {width: 10, height: 50},
    shadowOpacity: 1.0,
    elevation: 5,
  },
  tabStyle: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconStyle: {
    marginBottom: normalize(0, 'height'),
  },
  labelStyle: {
    fontSize: normalize(12, 'width'),
    fontFamily: 'Lato-Regular',
    lineHeight: 14,
    paddingTop: 3,
    fontWeight: '400',
  },
  focusedLabel: {
    color: '#277424',
  },
  unfocusedLabel: {
    color: '#979797',
  },
  focusedView: {
    alignItems: 'center',
    height: normalize(40, 'height'),
    width: normalize(52, 'width'),
    backgroundColor: '#DFF2D6',
    justifyContent: 'center',
    borderRadius: 11,
  },
  unFocusedView: {
    alignItems: 'center',
    height: normalize(40, 'height'),
    width: normalize(52, 'width'),
    justifyContent: 'center',
  },
});
