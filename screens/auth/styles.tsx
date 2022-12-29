import {StyleSheet, Platform, Dimensions} from 'react-native';

import GlobalStyles from '../../styles';
import normalize from '../../styles/normalize';
import {Colors, DEVICE_WIDTH, DEVICE_HEIGHT} from '../../constants/index';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default styles = StyleSheet.create({
  dotStyles: {
    backgroundColor: '#E2E2E2',
    width: 11.1,
    height: 11.1,
    borderRadius: 11.1 / 2,
    marginLeft: 10,
    marginRight: 10,
  },
  activeDotStyles: {
    backgroundColor: '#C1D72E',
    width: 11.1,
    height: 11.1,
    borderRadius: 11.1 / 2,
    marginLeft: 10,
    marginRight: 10,
  },
  codeInputStyle: {
    // marginHorizontal: '2%',
    // borderRadius: 10,
    color: Colors.placeholderTextColor,
    fontSize: normalize(14, 'width'),
    fontFamily: 'Lato-Medium',
    // borderColor: Colors.darktextColor,
    // borderWidth: 0.4,
    alignSelf: 'center',
    width: 48,
    height: 50,
    backgroundColor: Colors.inputBackground,
    borderRadius: 3,
    fontWeight: '900',
  },
  otpContainer: {
    height: 50,
    width: normalize(320, 'width'),
  },
  radioButtonStyle: {
    fontSize: normalize(13, 'width'),
    color: Colors.placeholderTextColor,
    fontFamily: 'Lato-Regular',
    fontWeight: '500',
  },
});
