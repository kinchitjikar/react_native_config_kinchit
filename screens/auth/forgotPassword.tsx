import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import {LogoIcon} from '../../assets/svgs';
import {Button, ErrorModal, InactiveButton, Layout} from '../../components';
import InputBox from '../../components/InputBox';
import AuthService from '../../services/authServices';
import {checkInterNet, internetText} from '../../services/constant';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
// import normalize from '../../styles/normalize';

const ForgotPassword: React.FC<Props> = props => {
  //States
  const [pagesForm, setPagesForm] = useState({
    email: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [frontEndErrorMsg, setFrontEndErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  //Helpers

  const onFieldChange = (text, field) => {
    const _pagesForm = {...pagesForm};
    _pagesForm[field] = text;
    setPagesForm(_pagesForm);
  };

  const goToOtp = async (token, top_text) => {
    // await AsyncStorage.setItem('signup_token', token);
    props.navigation.navigate('Otp', {
      signup_token: token,
      top_text: top_text,
      fromSignup: false,
    });
  };

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const goToLogIn = async () => {
    setLoading(true);
    const datas = new FormData();
    datas.append('email', `${pagesForm.email}`);
    try {
      const {data} = await AuthService.UserResetPassword(datas);
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        // props.navigation.navigate('Login');
        goToOtp(d.data[0].forgotpwd_token, d.data[0].top_text);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('signup error', error.response);
      checkNet();
    } finally {
      setLoading(false);
    }
  };
  // api calls

  // Constants
  const goToSignIn = async () => {
    props.navigation.navigate('Signup');
  };

  // Main
  return (
    <Layout loading={loading}>
      <View style={Globalstyles.smallGap} />
      <LogoIcon height={55.66} width={75.97} />
      <View style={Globalstyles.tiny17Gap} />
      <Text style={texts.darkText14}>
        Insert your email to reset your password
      </Text>

      <View style={Globalstyles.smallGap} />
      <Text style={texts.textInputLabel}>Email</Text>
      <View style={Globalstyles.textInputGap} />
      <InputBox
        placeholder=""
        value={pagesForm.email}
        onChangeText={text => onFieldChange(text.replace(/\s/g, ''), 'email')}
        // keyboardType={'email-address'}
        useBlur
        onBlur={async () => {
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

          if (reg.test(pagesForm.email)) {
            setFrontEndErrorMsg('');
            return true;
          } else if (pagesForm.email !== '') {
            return setFrontEndErrorMsg('Enter a valid email');
          }
        }}
      />
      {/* {frontEndErrorMsg !== '' && (
        <>
          <View style={Globalstyles.textInputGap} />
          <Text style={texts.errorMessageText}>{frontEndErrorMsg}</Text>
        </>
      )} */}

      <View style={Globalstyles.smallGap} />
      <Button title={'Reset'} onPress={goToLogIn}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        title={'Don’t have an account.'}
        linkText={'Sign up'}
        backgroundColor={'white'}
        onPress={goToSignIn}></InactiveButton>
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
    </Layout>
  );
};

export default ForgotPassword;
