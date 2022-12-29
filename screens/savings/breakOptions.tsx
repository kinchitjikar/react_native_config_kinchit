import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  Navbar,
  Button,
  InactiveButton,
  Layout,
  ErrorModal,
} from '../../components';
import {Colors} from '../../constants';
import AuthService from '../../services/authServices';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import styles from './styles';
import {
  DebitCardInactiveIcon,
  DebitCardRadioButtonActive,
} from '../../assets/svgs';
import {goBack} from '../../../navigation.service';

type Props = {
  navigation?: any;
};

const breakOptionsArray = [
  {
    id: 1,
    title: 'Part Liquidation',
    desc: 'Withdraw some of your funds but keep your \ninvestment running.',
  },
  {
    id: 2,
    title: 'Full Liquidation',
    desc: 'Withdraw all your funds and stop this \ninvestment plan.',
  },
];

const breakOptions: React.FC<Props> = props => {
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const onPressContinue = useCallback(() => {
    props.navigation.navigate('BreakAmount', {option: selectedOption});
  }, [selectedOption]);

  const renderBreakItem = item => {
    return (
      <TouchableOpacity
        style={{marginTop: normalize(20, 'height')}}
        onPress={() => {
          setSelectedOption(item);
        }}>
        <View
          style={[
            Globalstyles.row,
            styles.debitCardSubview,
            {
              backgroundColor:
                selectedOption?.id === item.id
                  ? Colors.backgroundLightGreen
                  : 'white',
              borderWidth: 0.8,
              borderColor: Colors.backgroundLightGreen,
            },
          ]}>
          <View style={{marginTop: normalize(4, 'height')}}>
            {selectedOption?.id === item.id ? (
              <DebitCardRadioButtonActive />
            ) : (
              <DebitCardInactiveIcon />
            )}
          </View>
          <View style={{marginLeft: normalize(15, 'width')}}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Layout
      loading={loading}
      noBottomPad
      needToHideView
      errorModal={
        <ErrorModal
          visible={errorModal}
          onRequestClose={async () => {
            setErrorModal(false),
              errorModalMsg === 'Login session timout'
                ? AuthService.sessionTimeOut()
                : {};
          }}
          text={`${errorModalMsg}`}
        />
      }>
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title={`Select Break Option`}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`You are about to break your N50,000 \nMango Savings`}
        isSubTextBlack
      />
      <View style={Globalstyles.tiny17Gap} />
      {breakOptionsArray.map(item => renderBreakItem(item))}
      <View style={Globalstyles.bigGap60} />
      <Button
        title={'Continue'}
        disabled={selectedOption === null}
        nobold
        onPress={onPressContinue}></Button>
      <View style={Globalstyles.tiny15Gap} />
      <InactiveButton
        nobold
        linkText={'Cancel'}
        backgroundColor={'white'}
        onPress={goBack}
      />
    </Layout>
  );
};

export default breakOptions;
