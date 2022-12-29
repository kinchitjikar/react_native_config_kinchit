import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {changeStack} from '../../../navigation.service';
import {
  ActiveRadio,
  EyeCloseIcon,
  EyeIcon,
  InactiveRadios,
  LogoIcon,
  NigeriaFlagIcon,
} from '../../assets/svgs';
import {
  Button,
  ErrorModal,
  InactiveButton,
  Layout,
  MonieTreeLogoText,
} from '../../components';
import InputBox from '../../components/InputBox';
import AuthService from '../../services/authServices';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import NetInfo from '@react-native-community/netinfo';
import {checkInterNet, internetText} from '../../services/constant';
import {Colors} from '../../constants';
import styles from './styles';
import { useSelector,useDispatch } from 'react-redux';
import {counterActions} from '../../store/counterSlice' 
// import normalize from '../../styles/normalize';

const Signup: React.FC<Props> = props => {
  //States
  const [pagesForm, setPagesForm] = useState({
    email: '',
    password: '',
    phone: '',
  });
  const [star, setStar] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [frontEndErrorMsg, setFrontEndErrorMsg] = useState('');
  const [emailSelected, setEmailSelected] = useState(true);
  const [phoneSelected, setPhoneSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  //Helpers

  const dispatch = useDispatch()
  const counter = useSelector(state=>state.counter.counter)
  const show = useSelector(state=>state.counter.showCounter)

  const increment = ()=>{
    dispatch(counterActions.increment)
  }

  const incrementBynumber = () =>{
    dispatch(counterActions.incrementByNumber)
  }

  useEffect(() => {
    // NotificationCall();
  }, []);

  const onFieldChange = (text, field) => {
    const _pagesForm = {...pagesForm};
    _pagesForm[field] = text;
    setPagesForm(_pagesForm);
  };

  const goToLogIn = async () => {
    props.navigation.navigate('Login');
  };
  // api calls

  // Constants
  const goToSignIn = async () => {
    props.navigation.navigate('Signup');
  };

  const goToForgotPassword = async () => {
    props.navigation.navigate('Forgotpassword');
  };

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const goToHome = async () => {
    setLoading(true);
    const datas = new FormData();
    datas.append(
      'customer_login_user',
      `${emailSelected ? pagesForm.email : pagesForm.phone}`,
    );
    datas.append('customer_login_password', `${pagesForm.password}`);
    datas.append('login_type', emailSelected ? 'email' : 'phone');
    try {
      const {data} = await AuthService.UserLogin(datas);
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        await AsyncStorage.setItem('api_token', d.data[0].api_token);
        await AsyncStorage.setItem('fromLogin', 'fromLogin');
        changeStack('AppStack');
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('login error', error);
      checkNet();
    } finally {
      setLoading(false);
    }
  };

  const renderRadioButtons = () => {
    return (
      <View
        style={[
          Globalstyles.centerRowAlign,
          {
            alignSelf: 'flex-start',
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            setEmailSelected(true);
            setPhoneSelected(false);
          }}
          style={[Globalstyles.centerRowAlign, {}]}>
          {emailSelected ? <ActiveRadio /> : <InactiveRadios />}
          <Text style={styles.radioButtonStyle}>{'   Email'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setEmailSelected(false);
            setPhoneSelected(true);
          }}
          style={[
            Globalstyles.centerRowAlign,
            {marginLeft: normalize(40, 'width')},
          ]}>
          {phoneSelected ? <ActiveRadio /> : <InactiveRadios />}
          <Text style={styles.radioButtonStyle}>{'   Phone Number'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Main
  return (
    <Layout loading={loading}>
      <View style={Globalstyles.smallGap} />
      <LogoIcon height={55.66} width={75.97} />
      <MonieTreeLogoText />
      <Text style={texts.darkText14}>
        Welcome back to the growing community
      </Text>

      <View style={Globalstyles.bigGap} />

      {renderRadioButtons()}
      {/* <Text style={texts.textInputLabel}>Email/Phone Number</Text> */}
      <View style={{height: normalize(8, 'height')}} />
      {emailSelected ? (
        <InputBox
          placeholder=""
          value={pagesForm.email}
          onChangeText={text => onFieldChange(text.replace(/\s/g, ''), 'email')}
          // keyboardType={'email-address'}
          useBlur
          onBlur={() => {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (reg.test(pagesForm.email)) {
              setFrontEndErrorMsg('');
              return true;
            } else if (pagesForm.email !== '') {
              return setFrontEndErrorMsg('Enter a valid email');
            }
          }}
        />
      ) : (
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
                setFrontEndErrorMsg('Enter a valid phone no');
              } else {
                setFrontEndErrorMsg('');
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
            onChangeText={text =>
              onFieldChange(text.replace(/\s/g, ''), 'phone')
            }
            keyboardType={'numeric'}
            maxLength={10}
            useBlur
            onBlur={async () => {
              if (pagesForm.phone.length < 10 && pagesForm.phone !== '') {
                setFrontEndErrorMsg('Enter a valid phone no');
              } else {
                setFrontEndErrorMsg('');
              }
            }}
            width={normalize(215, 'width')}
          />
        </View>
      )}
      {frontEndErrorMsg !== '' && (
        <>
          <View style={Globalstyles.textInputGap} />
          <Text style={texts.errorMessageText}>{frontEndErrorMsg}</Text>
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
          //  setStar('*'.repeat(text.length))
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
      <Text>{counter}</Text>
      <Text>{show}</Text>
      <View style={Globalstyles.tiny15Gap} />
      <Text style={texts.text14green} onPress={increment}>
        Forgot password?
      </Text>

      <View style={Globalstyles.smallGap} />
      <Button title={'Sign In'} onPress={incrementBynumber}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        title={'Don’t have an account.'}
        linkText={' Sign up'}
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

export default Signup;
