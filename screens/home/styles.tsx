import {StyleSheet, Platform, Dimensions} from 'react-native';

import GlobalStyles from '../../styles';
import normalize from '../../styles/normalize';
import {Colors, DEVICE_WIDTH, DEVICE_HEIGHT} from '../../constants/index';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default styles = StyleSheet.create({
  linearGradientView: {
    alignSelf: 'center',
    height: normalize(138, 'height'),
    width: normalize(283, 'width'),
    backgroundColor: '#D8D8D8',
    borderRadius: 4.416,
    alignItems: 'center',
    elevation: 5,
    borderColor: '#D8D8D8',
    shadowColor: '#D8D8D8',
    shadowOffset: {width: 10, height: 50},
    shadowOpacity: 1.0,
    borderWidth: 1,
  },
  monieTabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(40, 'height'),
    width: normalize(99, 'width'),
    borderRadius: 6,
  },
  updateProfileView: {
    width: 158,
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1.10106,
    borderColor: Colors.primaryButtonColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  promotionalView: {
    width: normalize(330, 'width'),
    height: normalize(78, 'height'),
    backgroundColor: '#DFF2D6',
    borderRadius: 7,
    marginTop: normalize(22, 'height'),
    padding: 14,
    justifyContent: 'center',
  },
  treeImageView: {
    width: normalize(160, 'width'),
    height: normalize(84, 'height'),
    // marginLeft: normalize(25, 'width'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: normalize(70, 'width'),
    paddingTop: 10,
  },
  getStartedBox: {
    height: normalize(320, 'height'),
    width: normalize(320, 'width'),
    backgroundColor: '#DFF2D6',
    // padding: normalize(30, 'height'),
    borderRadius: 7,
    paddingHorizontal: normalize(22.5, 'width'),
    paddingTop: normalize(22, 'height'),
  },
  wrapView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    width: normalize(340, 'width'),

    // paddingHorizontal: 5,
  },
  updateProfileText: {
    textAlign: 'center',
    fontSize: 13,
    color: Colors.primaryButtonColor,
    fontFamily: 'Lato-Regular',
    fontWeight: '500',
  },
  tempView: {
    width: normalize(320, 'width'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    height: normalize(71, 'height'),
    borderRadius: 9,
    borderColor: '#62BF41',
    padding: 10,
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
