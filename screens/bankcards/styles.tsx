import {StyleSheet, Platform, Dimensions} from 'react-native';

import GlobalStyles from '../../styles';
import normalize from '../../styles/normalize';
import {Colors, DEVICE_WIDTH, DEVICE_HEIGHT} from '../../constants/index';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    minHeight: DEVICE_HEIGHT,
    backgroundColor: '#F7F7F7',
    marginTop: normalize(10, 'height'),
    alignItems: 'center',
    paddingBottom: 60,
  },
  tabBarStyle: {
    width: DEVICE_WIDTH / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(40, 'height'),
  },
  tabBarContainer: {
    width: DEVICE_WIDTH,
    height: normalize(22, 'height'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bankView: {
    height: normalize(145.73, 'height'),
    width: normalize(330, 'width'),
    justifyContent: 'center',
    paddingLeft: normalize(18, 'width'),
    backgroundColor: 'white',
    borderRadius: 6.624,
  },
  absolutePosition: {
    position: 'absolute',
    top: normalize(17, 'height'),
    right: normalize(17, 'width'),
  },
  absolutePosition2: {
    position: 'absolute',
    bottom: normalize(17, 'height'),
    right: normalize(17, 'width'),
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
  darktext18gray: {
    fontSize: normalize(18, 'width'),
    color: Colors.gray,
    fontFamily: 'Lato-Regular',
    lineHeight: 27,
    fontWeight: '500',
    paddingVertical: 30,
  },
});
