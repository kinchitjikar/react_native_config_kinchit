import {Platform, StyleSheet} from 'react-native';

import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants';

import normalize from './normalize';

const shadowBox = {
  shadowColor: 'black',
  shadowOpacity: 0.1232,
  shadowOffset: {width: 10, height: 10},
  shadowRadius: normalize(15, 'height'),
  elevation: 5,
  backgroundColor: 'white',
  // borderRadius: normalize(25, 'height'),
};

const Globalstyles = StyleSheet.create({
  // All Texts

  // Main Container
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  absolutePosition: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: normalize(15, 'height'),
  },
  tinyGap: {
    height: normalize(14, 'height'),
  },
  tiny15Gap: {
    height: normalize(15, 'height'),
  },
  tiny17Gap: {
    height: normalize(17, 'height'),
  },
  tiny20Gap: {
    height: normalize(20, 'height'),
  },
  smallGap: {
    height: normalize(30, 'height'),
  },
  smallGap22: {
    height: normalize(22, 'height'),
  },
  smallGap25: {
    height: normalize(25, 'height'),
  },
  smallGap28: {
    height: normalize(28, 'height'),
  },
  bigGap: {
    height: normalize(40, 'height'),
  },
  bigGap35: {
    height: normalize(35, 'height'),
  },
  bigGap37: {
    height: normalize(37, 'height'),
  },
  bigGap40: {
    height: normalize(40, 'height'),
  },
  bigGap42: {
    height: normalize(42, 'height'),
  },
  bigGap47: {
    height: normalize(47, 'height'),
  },
  bigGap49: {
    height: normalize(49.5, 'height'),
  },
  bigGap50: {
    height: normalize(50, 'height'),
  },
  bigGap56: {
    height: normalize(56, 'height'),
  },
  bigGap60: {
    height: normalize(60, 'height'),
  },
  bigGap63: {
    height: normalize(63, 'height'),
  },
  bigGap66: {
    height: normalize(66, 'height'),
  },
  bigGap73: {
    height: normalize(73.75, 'height'),
  },
  bigGap80: {
    height: normalize(80, 'height'),
  },
  bigGap240: {
    height: normalize(180, 'height'),
  },
  textInputGap: {
    height: normalize(5.44, 'height'),
  },
  otpInputGap: {
    height: normalize(10.54, 'height'),
  },
  swiperStyle: {
    alignItems: 'center',
    // height: '65%',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  widthView15: {
    width: normalize(10, 'width'),
  },
  widthView: {
    width: normalize(330, 'width'),
  },
  widthView2: {
    width: normalize(320, 'width'),
  },

  centerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerRowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerRowAlignEven: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  shadowBox: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 3},
    shadowRadius: normalize(2, 'height'),
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 6.24,
  },
  shadowBox2: {
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: normalize(1, 'height'),
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 6.24,
  },
  shadowBox3: {
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: normalize(2, 'height'),
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 6.24,
  },
});

export default Globalstyles;
