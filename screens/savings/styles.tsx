import {StyleSheet, Platform, Dimensions} from 'react-native';

import GlobalStyles from '../../styles';
import normalize from '../../styles/normalize';
import {Colors, DEVICE_WIDTH, DEVICE_HEIGHT} from '../../constants/index';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default styles = StyleSheet.create({
  promotionalView: {
    width: normalize(330, 'width'),
    height: normalize(78, 'height'),
    backgroundColor: '#DFF2D6',
    borderRadius: 7,
    // marginTop: normalize(22, 'height'),
    padding: 14,
    justifyContent: 'center',
  },
  treeImageView: {
    width: normalize(330, 'width'),
    height: normalize(86.62, 'height'),
    // marginLeft: normalize(25, 'width'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: normalize(60, 'width'),
    paddingTop: 8,
    alignSelf: 'center',
  },
  ongoingView: {
    height: normalize(18.98, 'height'),
    width: normalize(66.24, 'width'),
    backgroundColor: '#CFF2EA',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    // marginRight: normalize(22.08, 'width'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  debitCardSubview: {
    width: normalize(325, 'width'),
    borderRadius: 4,
    paddingLeft: normalize(10, 'width'),
    paddingRight: normalize(10, 'width'),
    paddingVertical: normalize(15, 'height'),
  },
  title: {
    fontSize: normalize(15.5182, 'width'),
    color: Colors.textTitle,
    fontFamily: 'Lato-Regular',
    fontWeight: '500',
  },
  desc: {
    fontSize: normalize(13.25, 'width'),
    color: Colors.gray,
    fontFamily: 'Lato-Regular',
    fontWeight: '500',
    marginTop: normalize(3, 'height'),
  },
  tempView: {
    width: normalize(320, 'width'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    height: 71,
    borderRadius: 9,
    borderColor: '#62BF41',
    padding: 10,
  },
  transactionBorder: {
    width: '95%',
    borderBottomWidth: 1,
    borderColor: 'rgba(189, 183, 183, 0.3)',
    marginVertical: '3%',
    alignSelf: 'center',
  },
  transactionContainer: {
    // height: 93,
    width: '100%',

    alignSelf: 'center',
    // borderRadius: 10,
    padding: 10,
    borderBottomWidth: 1.5,
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: Colors.lightGrayText,
  },
  transactionRows: {
    ...GlobalStyles.centerRowAlign,
    width: '95%',
    alignSelf: 'center',
  },

  textStyle: {
    paddingLeft: normalize(15, 'width'),
  },
  debitCardSubview2: {
    height: normalize(45, 'height'),
    width: normalize(184, 'width'),
    backgroundColor: 'white',
    paddingLeft: normalize(10, 'width'),
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: Colors.backgroundLightGreen,
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
