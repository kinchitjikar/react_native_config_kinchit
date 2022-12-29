import React, {useCallback, useState} from 'react';
import {View, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
  Navbar,
  Button,
  InactiveButton,
  InputBox,
  Layout,
  ErrorModal,
  TreeLargeList,
} from '../../components';
import AuthService from '../../services/authServices';
import DepositServices from '../../services/depositServices';
import Globalstyles from '../../styles';
import {goBack} from '../../../navigation.service';
import {checkInterNet, internetText} from '../../services/constant';
import {isEmpty} from 'lodash';
import texts from '../../styles/texts';

type Props = {
  navigation?: any;
  route?: any;
};

const TopUpSaving: React.FC<Props> = props => {
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [data, setData] = useState({});
  const [topUpForm, setTopUpForm] = useState({
    maturityDate: '27th Feb 2022',
    topUpAmount: '',
    interestAmount: '',
    newDueAmount: '',
  });

  useFocusEffect(
    useCallback(() => {
      getInvestmentData();
    }, []),
  );

  const onFieldChange = useCallback(
    (text, field) => {
      const _topUpForm = {...topUpForm};
      _topUpForm[field] = text.replace(/[^0-9.]/g, '');
      setTopUpForm(_topUpForm);
    },
    [topUpForm],
  );

  // api calls

  const checkNet = () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const getInvestmentData = async () => {
    try {
      const {data} = await DepositServices.GetInvestmentProduct(
        props.route.params.data.my_tree_id,
      );
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        setData(d.data[0]);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      checkNet();
    } finally {
      setLoading(false);
    }
  };

  const onPressContinue = useCallback(() => {
    props.navigation.navigate('TopUpPayment');
  }, []);

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
        title={`Top Up Savings`}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`Input an amount to top up your Obeche Tree`}
      />
      <View style={Globalstyles.smallGap} />
      {!isEmpty(data) && <TreeLargeList disabled item={data} />}

      <View style={Globalstyles.bigGap63} />
      <Text style={texts.textInputLabel2}>Matutity Date</Text>
      <View style={Globalstyles.textInputGap} />
      <InputBox
        placeholder=""
        value={topUpForm.maturityDate}
        keyboardType="numeric"
        backgroundColor="white"
        editable={false}
        disabled
      />

      <View style={Globalstyles.tiny15Gap} />
      <Text style={texts.textInputLabel2}>Top Up Amount</Text>
      <View style={Globalstyles.textInputGap} />
      <InputBox
        placeholder=""
        value={topUpForm.topUpAmount}
        keyboardType="numeric"
        onChangeText={text => {
          onFieldChange(text, 'topUpAmount');
        }}
      />

      <View style={Globalstyles.tiny15Gap} />
      <Text style={texts.textInputLabel2}>Interest Amount</Text>
      <View style={Globalstyles.textInputGap} />
      <InputBox
        placeholder=""
        value={topUpForm.interestAmount}
        keyboardType="numeric"
        backgroundColor="white"
        onChangeText={text => {
          onFieldChange(text, 'interestAmount');
        }}
        editable={false}
      />

      <View style={Globalstyles.tiny15Gap} />
      <Text style={texts.textInputLabel2}>New Due Amount</Text>
      <View style={Globalstyles.textInputGap} />
      <InputBox
        placeholder=""
        value={topUpForm.newDueAmount}
        keyboardType="numeric"
        backgroundColor="white"
        onChangeText={text => {
          onFieldChange(text, 'newDueAmount');
        }}
        editable={false}
      />

      <View style={Globalstyles.bigGap} />
      <Button
        title={'Continue'}
        // disabled={isAnyFieldEmpty()}
        nobold
        onPress={onPressContinue}
      />
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        nobold
        linkText={'Cancel'}
        backgroundColor={'white'}
        onPress={goBack}
      />
      <View style={Globalstyles.bigGap} />
    </Layout>
  );
};

export default TopUpSaving;
