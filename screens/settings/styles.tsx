import {StyleSheet, Platform, Dimensions} from 'react-native';

import GlobalStyles from '../../styles';
import normalize from '../../styles/normalize';
import {Colors, DEVICE_WIDTH, DEVICE_HEIGHT} from '../../constants/index';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: '#F7F7F7',
    marginTop: normalize(10, 'height'),
  },
  box: {
    flexDirection: 'row',
    borderRadius: normalize(3.312, 'width'),
    backgroundColor: '#ECECEC',
    paddingVertical: normalize(14, 'width'),
    paddingHorizontal: normalize(12.14, 'width'),
    width: normalize(320, 'width'),
  },
  textstyle: {
    fontSize: normalize(15.46, 'width'),
    color: '#B8B8B8',
    fontFamily: 'Lato-Regular',
    alignSelf: 'flex-start',
    flex: 1,
    lineHeight: 18.55,
    fontWeight: '900',
  },
});
