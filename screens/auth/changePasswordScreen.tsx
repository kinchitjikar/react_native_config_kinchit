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
import {EyeCloseIcon, EyeIcon, LogoIcon} from '../../assets/svgs';
import {Button, InactiveButton, Layout, ErrorModal} from '../../components';
import InputBox from '../../components/InputBox';
import AuthService from '../../services/authServices';
import {checkInterNet, internetText} from '../../services/constant';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
// import normalize from '../../styles/normalize';

const ChangePassword: React.FC<Props> = props => {
  //States
  const [pagesForm, setPagesForm] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirmPass] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [loading, setLoading] = useState(false);

  //Helpers
  useEffect(() => {
    console.log(props.route.params);
  }, []);

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
  const isAnyFieldEmpty = () => {
    return Object.values(pagesForm).findIndex(v => !v) > -1;
  };

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };
  const goToLogIn = async () => {
    setLoading(true);
    const datas = new FormData();
    datas.append(
      'setpassword_token',
      `${props.route.params.set_passwordtoken}`,
    );
    datas.append('new_password', `${pagesForm.password}`);
    datas.append('confirm_password', `${pagesForm.confirmPassword}`);

    try {
      const {data} = await AuthService.UserChangePassword(datas);
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        props.navigation.navigate('Login');
        // goToOtp(d.data[0].forgotpwd_token, d.data[0].top_text);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('signup error');
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
      <Text style={texts.darkText14}>Change Password</Text>

      <View style={Globalstyles.smallGap} />
      {/* <Text style={texts.textInputLabel}>Email</Text>
      <View style={Globalstyles.textInputGap} />
      <View style={Globalstyles.tiny15Gap} />
       */}
      <Text style={texts.textInputLabel}>New Password</Text>
      <View style={Globalstyles.textInputGap} />
      <InputBox
        placeholder=""
        value={pagesForm.password}
        onChangeText={text => {
          onFieldChange(text.replace(/\s/g, ''), 'password');
        }}
        secureText={!showPass}
        rightButton={
          !showPass ? (
            <EyeIcon
              height={normalize(24, 'height')}
              width={normalize(24, 'width')}
            />
          ) : (
            <EyeCloseIcon
              height={normalize(24, 'height')}
              width={normalize(24, 'width')}
            />
          )
        }
        rightOnPress={() => setShowPass(!showPass)}
      />
      <View style={Globalstyles.tiny15Gap} />
      <Text style={texts.textInputLabel}>Confirm Password</Text>
      <View style={Globalstyles.textInputGap} />
      <InputBox
        placeholder=""
        value={pagesForm.confirmPassword}
        onChangeText={text => {
          onFieldChange(text.replace(/\s/g, ''), 'confirmPassword');
        }}
        secureText={!showConfirm}
        rightButton={
          !showConfirm ? (
            <EyeIcon
              height={normalize(24, 'height')}
              width={normalize(24, 'width')}
            />
          ) : (
            <EyeCloseIcon
              height={normalize(24, 'height')}
              width={normalize(24, 'width')}
            />
          )
        }
        rightOnPress={() => setShowConfirmPass(!showConfirm)}
      />

      <View style={Globalstyles.smallGap} />
      <Button
        // disabled={isAnyFieldEmpty()}
        title={'Save Changes'}
        onPress={goToLogIn}></Button>
      <View style={Globalstyles.tinyGap} />
      {/* <InactiveButton
        // title={'Don’t have an account.'}
        linkText={'Cancel'}
        noBold
        backgroundColor={'white'}
        onPress={() => {}}></InactiveButton> */}
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

export default ChangePassword;
