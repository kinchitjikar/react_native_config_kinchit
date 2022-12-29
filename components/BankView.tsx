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

const BankView = (props: any) => {
  const {item, isSelected, onPress} = props;

  const returnHiddenBankNumber = useCallback(() => {
    return item?.accountNo !== ''
      ? item.accountNo.replace(item.accountNo.substring(0, 6), '******')
      : '';
  }, [item]);

  return (
    <TouchableOpacity
      style={{marginTop: normalize(10, 'height')}}
      onPress={() => onPress(item)}>
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
          {item?.type === 'new'
            ? 'New Bank'
            : `${
                item.mask_name
                  ? item.mask_name
                  : `${returnHiddenBankNumber()}${item?.bankName}`
              } `}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

BankView.propTypes = {
  item: PropTypes.any,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func,
};

BankView.defaultProps = {
  item: null,
  isSelected: false,
  onPress: () => {},
};

const styles = StyleSheet.create({
  debitCardSubview: {
    height: normalize(45, 'height'),
    width: normalize(230, 'width'),
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

export default BankView;
