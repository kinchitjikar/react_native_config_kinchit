import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import normalize from '../styles/normalize';
import Globalstyles from '../styles';
import {Colors} from '../constants';
import {
  DebitCardInactiveIcon,
  DebitCardRadioButtonActive,
} from '../assets/svgs';
import texts from '../styles/texts';

const CardView = (props: any) => {
  const {item, isSelected, onPress} = props;

  const returnHiddenCardNumber = useCallback(() => {
    return item?.currentCardNo !== ''
      ? item.currentCardNo.replace(
          item.currentCardNo.substring(0, 14),
          '**** **** ****',
        )
      : '';
  }, [item]);
  const onSelect = async item => {
    await props.onSelect(item);
  };
  const test = async item => {
    console.log(' item', item);

    await onSelect(item);
  };
  return (
    <TouchableOpacity
      style={{marginTop: normalize(10, 'height')}}
      onPress={() => {
        test(item);
      }}>
      <View
        style={[
          Globalstyles.centerRow,
          styles.debitCardSubview,
          {
            backgroundColor: isSelected ? Colors.backgroundLightGreen : 'white',
          },
        ]}>
        {isSelected ? (
          <DebitCardRadioButtonActive />
        ) : (
          <DebitCardInactiveIcon />
        )}

        <Text style={[texts.text15darkgreen, styles.textStyle]}>
          {item?.type === 'new' ? 'New Card' : returnHiddenCardNumber()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

CardView.propTypes = {
  item: PropTypes.any,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func,
};

CardView.defaultProps = {
  item: null,
  isSelected: false,
  onPress: () => {},
};

const styles = StyleSheet.create({
  debitCardSubview: {
    height: normalize(45, 'height'),
    width: normalize(184, 'width'),
    backgroundColor: 'white',
    paddingLeft: normalize(10, 'width'),
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: Colors.backgroundLightGreen,
  },
  textStyle: {
    paddingLeft: normalize(15, 'width'),
  },
});

export default CardView;
