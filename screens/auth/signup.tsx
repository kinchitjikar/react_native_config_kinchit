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
import {
  EyeCloseIcon,
  EyeIcon,
  LogoIcon,
  NigeriaFlagIcon,
} from '../../assets/svgs';
import {Button, ErrorModal, InactiveButton, Layout} from '../../components';
import InputBox from '../../components/InputBox';
import AuthService from '../../services/authServices';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkInterNet, internetText} from '../../services/constant';
// import normalize from '../../styles/normalize';

const Signup: React.FC<Props> = props => {
  //States
  const [pagesForm, setPagesForm] = useState({
    email: '',
    phone: '',
    password: '',
    countyCode: '',
  });
  const [star, setStar] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [frontEndErrorMsg, setFrontEndErrorMsg] = useState('');
  const [phoneErrorMsg, setphoneErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  //Helpers

  const onFieldChange = (text, field) => {
    const _pagesForm = {...pagesForm};
    _pagesForm[field] = text;
    setPagesForm(_pagesForm);
  };

  const goToLogIn = async () => {
    props.navigation.navigate('Login');
  };

  const goToOtp = async (token, top_text) => {
    await AsyncStorage.setItem('signup_token', token);
    props.navigation.navigate('Otp', {
      // email: pagesForm.email,
      // phone: pagesForm.phone,
      signup_token: token,
      top_text: top_text,
      fromSignup: true,
    });
  };
  // api calls
  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const onSubmit = async () => {
    setLoading(true);
    const datas = new FormData();
    datas.append('email', `${pagesForm.email}`);
    datas.append('mobile', `${pagesForm.phone}`);
    datas.append('cpassword', `${pagesForm.password}`);
    try {
      const {data} = await AuthService.UserRegister(datas);
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        goToOtp(d.data[0].signup_token, d.data[0].top_text);
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
    // }
  };

  // Constants

  // Main
  return (
    <Layout loading={loading}>
      <View style={Globalstyles.smallGap} />
      <LogoIcon height={55.66} width={75.97} />
      <View style={Globalstyles.tiny17Gap} />
      <Text style={texts.darkText14}>
        Create your account and start earning today
      </Text>

      <View style={Globalstyles.bigGap} />

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
      {frontEndErrorMsg !== '' && (
        <>
          <View style={Globalstyles.textInputGap} />
          <Text style={texts.errorMessageText}>{frontEndErrorMsg}</Text>
        </>
      )}

      <View style={Globalstyles.tiny15Gap} />
      <Text style={texts.textInputLabel}>Phone Number</Text>
      <View style={Globalstyles.textInputGap} />
      <View style={Globalstyles.row}>
        <InputBox
          placeholder=""
          value={' +234'}
          // onChangeText={text => onFieldChange(text.replace(/\s/g, ''), 'phone')}
          keyboardType={'numeric'}
          // maxLength={3}
          useBlur
          onBlur={async () => {
            if (pagesForm.phone.length < 10 && pagesForm.phone !== '') {
              setphoneErrorMsg('Enter a valid phone no');
            } else {
              setphoneErrorMsg('');
            }
          }}
          editable={false}
          width={normalize(90, 'width')}
          leftButton={<NigeriaFlagIcon />}
        />
        <View style={{width: normalize(15, 'width')}} />
        <InputBox
          placeholder=""
          value={pagesForm.phone}
          onChangeText={text => onFieldChange(text.replace(/\s/g, ''), 'phone')}
          keyboardType={'numeric'}
          maxLength={10}
          useBlur
          onBlur={async () => {
            if (pagesForm.phone.length < 10 && pagesForm.phone !== '') {
              setphoneErrorMsg('Enter a valid phone no');
            } else {
              setphoneErrorMsg('');
            }
          }}
          width={normalize(215, 'width')}
        />
      </View>
      {phoneErrorMsg !== '' && (
        <>
          <View style={Globalstyles.textInputGap} />
          <Text style={texts.errorMessageText}>{phoneErrorMsg}</Text>
        </>
      )}

      <View style={Globalstyles.tiny15Gap} />
      <Text style={texts.textInputLabel}>Password</Text>
      <View style={Globalstyles.textInputGap} />
      <InputBox
        placeholder=""
        value={pagesForm.password}
        onChangeText={text => {
          onFieldChange(text.replace(/\s/g, ''), 'password');
        }}
        // star
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

      <View style={Globalstyles.smallGap} />
      <Button title={'Sign Up'} onPress={onSubmit}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        title={'I already have an account.'}
        linkText={' Sign in'}
        backgroundColor={'white'}
        onPress={goToLogIn}></InactiveButton>

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

export default Signup;
