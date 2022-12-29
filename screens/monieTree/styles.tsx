import {StyleSheet, Platform, Dimensions} from 'react-native';

import GlobalStyles from '../../styles';
import normalize from '../../styles/normalize';
import {Colors, DEVICE_WIDTH, DEVICE_HEIGHT} from '../../constants/index';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default styles = StyleSheet.create({
  treeImageView: {
    width: normalize(300, 'width'),
    height: normalize(86.62, 'height'),
    // marginLeft: normalize(25, 'width'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: normalize(60, 'width'),
    paddingTop: normalize(10, 'height'),
  },
  debitCardSubview: {
    height: normalize(45, 'height'),
    width: normalize(184, 'width'),
    // backgroundColor: Colors.backgroundLightGreen,
    paddingLeft: normalize(10, 'width'),
    borderRadius: 4,
  },
});
