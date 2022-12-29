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
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from './styles';
import AuthService from '../../services/authServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeStack} from '../../../navigation.service';
import {Colors} from '../../constants';
import {checkInterNet, internetText} from '../../services/constant';

// import normalize from '../../styles/normalize';

const Otp: React.FC<Props> = props => {
  //States
  const [pagesForm, setPagesForm] = useState({
    email: '',
    password: '',
  });
  const [star, setStar] = useState('');
  const [code, setCode] = useState('');
  const otpInput = useRef(null);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [focus, setFocus] = useState(false);
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

  // api calls
  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };
  // Constants

  const goToHome = async () => {
    setLoading(true);
    const datas = new FormData();
    if (props.route.params.fromSignup) {
      datas.append('signup_token', `${props.route.params.signup_token}`);
      datas.append('otp_code', `${code}`);
      try {
        const {data} = await AuthService.UserOtpVerify(datas);
        const d = await AuthService.tempData(data);
        if (typeof d === 'object') {
          // props.navigation.navigate('AppStack');
          await AsyncStorage.setItem('api_token', d.data[0].api_token);

          await AsyncStorage.setItem('fromLogin', 'froms');

          changeStack('AppStack');
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
    } else {
      datas.append('forgotpwd_token', `${props.route.params.signup_token}`);
      datas.append('otp_code', `${code}`);
      try {
        const {data} = await AuthService.UserResetPasswordVerify(datas);
        const d = await AuthService.tempData(data);
        if (typeof d === 'object') {
          props.navigation.navigate('ChangePassword', {
            set_passwordtoken: d.data[0].setpassword_token,
          });
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
    }
  };

  const goToSignIn = async () => {
    props.navigation.navigate('Signup');
  };

  function returnHidenMail(value) {
    return value.replace(
      /\B.+@/g,
      c =>
        c
          .split('')
          .slice(0, -1)
          .map(v => '*')
          .join('') + '@',
    );
  }

  function returnHidenPhone(value) {
    return value.replace(value.substring(3, 9), '*********');
  }

  // Main
  return (
    <Layout loading={loading}>
      <View style={Globalstyles.smallGap} />
      <LogoIcon height={55.66} width={75.97} />
      <View style={Globalstyles.tiny17Gap} />
      <View style={{width: normalize(320, 'width')}}>
        <Text style={[texts.darkText14]}>
          {/* Input the one time code sent to{' '}
          {returnHidenMail(`${props.route.params.email}`)} or{' '}
          {returnHidenPhone(`${props.route.params.phone}`)}{' '} */}
          {props.route.params.top_text}
        </Text>
      </View>

      <View style={Globalstyles.smallGap} />
      <Text style={texts.textInputLabel}>OTP</Text>
      <View style={Globalstyles.otpInputGap} />

      <OTPInputView
        style={styles.otpContainer}
        pinCount={6}
        code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={code => setCode(code)}
        autoFocusOnLoad={Platform.OS === 'android' ? false : true}
        codeInputFieldStyle={[
          styles.codeInputStyle,
          {color: Colors.placeholderTextColor},
        ]}
        // codeInputHighlightStyle={{color: Colors.darktextColor}}
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
          setCode(code);
        }}
        codeInputHighlightStyle={{color: '#5A5656'}}
        // clearInputs
        autoFocus
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        ref={otpInput}
      />

      <View style={Globalstyles.smallGap} />
      <Button title={'Continue'} onPress={goToHome}></Button>
      <View style={Globalstyles.tinyGap} />
      {/* <InactiveButton
        title={'Don’t have an account.'}
        linkText={'Sign up'}
        backgroundColor={'white'}
        onPress={goToSignIn}></InactiveButton> */}
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

export default Otp;
