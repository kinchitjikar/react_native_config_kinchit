import React, {useCallback, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
  Navbar,
  Button,
  InactiveButton,
  Layout,
  ErrorModal,
  InputBox,
  SuccessModal,
} from '../../components';
import AuthService from '../../services/authServices';
import Globalstyles from '../../styles';
import {goBack} from '../../../navigation.service';
import texts from '../../styles/texts';
import {checkInterNet, internetText} from '../../services/constant';

type Props = {
  navigation?: any;
  route?: any;
};

const TransferSaving: React.FC<Props> = props => {
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [transferForm, setTransferForm] = useState({
    pin: '',
    otp: '',
  });
  const [datas, setData] = useState({});
  const isAnyFieldEmpty = useCallback(() => {
    return Object.values(transferForm).findIndex(v => !v) > -1;
  }, [transferForm]);

  const onFieldChange = useCallback(
    (text, field) => {
      const _transferForm = {...transferForm};
      _transferForm[field] = text;
      setTransferForm(_transferForm);
    },
    [transferForm],
  );

  const onPressContinue = useCallback(() => {
    setShowSuccessModal(true);
  }, []);

  const onPressSuccessContinue = useCallback(() => {
    setShowSuccessModal(false);
    props.navigation.navigate('Certificates');
  }, []);

  useEffect(() => {
    // getTransactionPin();
    // genrateOtp()
    getProfileData();
  }, []);

  const getProfileData = async () => {
    try {
      const {data} = await AuthService.GetUserInfo();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        // console.log(d.data[0]);
        await setData(d.data[0]);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('getProfileData call error');
      checkNet();
    } finally {
      setLoading(false);
    }
  };

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
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
        title={`Transfer Your Savings`}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`Input your transaction pin and input the\nOTP sent to ${datas.mask_email}\nor ${datas.mask_phone}`}
      />
      <View style={Globalstyles.bigGap35} />

      <Text style={texts.textInputLabel2}>Transaction PIN (4 digits)</Text>
      <View style={Globalstyles.textInputGap} />
      <InputBox
        placeholder=""
        value={transferForm.pin}
        keyboardType="numeric"
        secureText
        maxLength={4}
        backgroundColor="white"
        onChangeText={text => {
          onFieldChange(text, 'pin');
        }}
      />

      {/* <View style={Globalstyles.tiny15Gap} />
      <Text style={texts.textInputLabel2}>Confirm PIN</Text>
      <View style={Globalstyles.textInputGap} />
      <InputBox
        placeholder=""
        value={transferForm.cPin}
        keyboardType="numeric"
        secureText
        maxLength={4}
        backgroundColor="white"
        onChangeText={text => {
          onFieldChange(text, 'cPin');
        }}
      /> */}

      <View style={Globalstyles.tiny15Gap} />
      <Text style={texts.textInputLabel2}>OTP</Text>
      <View style={Globalstyles.textInputGap} />
      <InputBox
        placeholder=""
        value={transferForm.otp}
        keyboardType="numeric"
        maxLength={6}
        backgroundColor="white"
        onChangeText={text => {
          onFieldChange(text, 'otp');
        }}
      />

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

      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        continuePress={onPressSuccessContinue}
        text={`Your bank account will be funded \nshortly`}
      />
    </Layout>
  );
};

export default TransferSaving;
