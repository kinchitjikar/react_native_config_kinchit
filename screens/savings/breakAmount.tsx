import React, {useState, useCallback} from 'react';
import {View, Text} from 'react-native';
import {
  Navbar,
  Button,
  InactiveButton,
  InputBox,
  Layout,
  ErrorModal,
} from '../../components';
import AuthService from '../../services/authServices';
import Globalstyles from '../../styles';
import texts from '../../styles/texts';
import {goBack} from '../../../navigation.service';

type Props = {
  navigation?: any;
  route?: any;
};

const breakAmount: React.FC<Props> = props => {
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [paymentForm, setPaymentForm] = useState({
    amt: '50500',
    penalty: '',
    interestDue: '',
    amountDue: '',
  });

  const onFieldChange = useCallback(
    (text, field) => {
      const _paymentForm = {...paymentForm};
      _paymentForm[field] = text;
      setPaymentForm(_paymentForm);
    },
    [paymentForm],
  );

  const isAnyFieldEmpty = useCallback(() => {
    if (props?.route?.params?.option?.id === 1) {
      return paymentForm.penalty === '';
    } else {
      return paymentForm.interestDue === '' || paymentForm.amountDue === '';
    }
  }, [paymentForm]);

  const onPressContinue = useCallback(() => {
    props.navigation.navigate('BreakDestination', {
      option: props?.route?.params?.option,
    });
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
        title={`Break Your Savings`}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`You are about to break your N50,000 \nMango Savings`}
        isSubTextBlack
      />
      <View style={Globalstyles.bigGap35} />

      <Text style={texts.textInputLabel2}>Liquidation Amount</Text>
      <View style={Globalstyles.textInputGap} />
      {props?.route?.params?.option?.id === 1 ? (
        <InputBox
          placeholder=""
          value={paymentForm.amt}
          onChangeText={text => {
            onFieldChange(text, 'amt');
          }}
          keyboardType="numeric"
        />
      ) : (
        <InputBox
          placeholder=""
          value={paymentForm.amt}
          editable={false}
          keyboardType="numeric"
        />
      )}

      {props?.route?.params?.option?.id === 1 && (
        <>
          <View style={Globalstyles.tiny15Gap} />
          <Text style={texts.textInputLabel2}>Penalty</Text>
          <View style={Globalstyles.textInputGap} />
          <InputBox
            placeholder=""
            value={paymentForm.penalty}
            keyboardType="numeric"
            backgroundColor="white"
            onChangeText={text => {
              onFieldChange(text, 'penalty');
            }}
            editable={false}
          />
        </>
      )}

      {props?.route?.params?.option?.id === 2 && (
        <>
          <View style={Globalstyles.tiny15Gap} />
          <Text style={texts.textInputLabel2}>Interest Due</Text>
          <View style={Globalstyles.textInputGap} />
          <InputBox
            placeholder=""
            value={paymentForm.interestDue}
            keyboardType="numeric"
            backgroundColor="white"
            onChangeText={text => {
              onFieldChange(text, 'interestDue');
            }}
            editable={false}
          />

          <View style={Globalstyles.tiny15Gap} />
          <Text style={texts.textInputLabel2}>Amount Due</Text>
          <View style={Globalstyles.textInputGap} />
          <InputBox
            placeholder=""
            value={paymentForm.amountDue}
            keyboardType="numeric"
            backgroundColor="white"
            onChangeText={text => {
              onFieldChange(text, 'amountDue');
            }}
            editable={false}
          />
        </>
      )}

      <View style={Globalstyles.bigGap} />
      <Button
        title={'Continue'}
        disabled={isAnyFieldEmpty()}
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
    </Layout>
  );
};

export default breakAmount;
