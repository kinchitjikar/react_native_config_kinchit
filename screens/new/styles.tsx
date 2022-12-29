import {StyleSheet, Platform, Dimensions} from 'react-native';

import GlobalStyles from '../../styles';
import normalize from '../../styles/normalize';
import {Colors, DEVICE_WIDTH, DEVICE_HEIGHT} from '../../constants/index';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default styles = StyleSheet.create({
  promotionalView: {
    width: normalize(330, 'width'),
    height: normalize(152, 'height'),
    backgroundColor: '#DFF2D6',
    borderRadius: 7,
    // marginTop: normalize(22, 'height'),
    padding: 14,
    justifyContent: 'center',
  },
});
