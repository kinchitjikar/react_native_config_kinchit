import {Platform, Dimensions, StatusBar} from 'react-native';

let scale = Dimensions.get('screen').scale / Dimensions.get('window').scale;
// const screen_height =  Dimensions.get('window').height * scale;
// const screen_width =  Dimensions.get('window').width * scale;
export const DEVICE_HEIGHT = Dimensions.get('window').height * scale;
export const DEVICE_WIDTH = Dimensions.get('window').width * scale;
export const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const Colors = {
  mainBgColor: '#4AB945',
  lightColor: '#C1D907',
  primaryButtonColor: '#62BF41',
  placeholderTextColor: '#B8B8B8',

  inputBackground: '#ECECEC',
  textColor: '#2FB24B',
  textTitle: '#55A334',
  darkText: '#277424',
  gray: '#757575',
  lightGrayText: '#BDB7B7',
  darkGrayText: '#979797',
  backgroundLightGreen: '#DFF2D6',
  lightGreen: '#74B570',
  red: '#B94545',
  redLight: '#F2D6D6',
  grayText: '#C3C9C2',
  yellowText: '#C9D92D',
  darkYellow: '#F9CC4B',
};
