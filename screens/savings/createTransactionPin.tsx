import React, {useState, useEffect, useRef, useCallback} from 'react';
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
  CopyIcon,
  GraphIcon,
  HarvestBankIcon,
  InvestmentAdviceIcon,
  LogoIcon,
  MonieHarvestIcon,
  MonieTreeIcon,
  NextArrowGreenIcon,
  NoSavingsIcon,
  UpdateProfileIcon,
} from '../../assets/svgs';
import {
  Button,
  InactiveButton,
  Layout,
  LoadModal,
  PromotionalView,
  TreeList,
  WrapLayout,
  ErrorModal,
  BankView,
  FundTansfer,
  WalletBalance,
} from '../../components';
import InputBox from '../../components/InputBox';
import Navbar from '../../components/Navbar';
import {Colors, DEVICE_WIDTH} from '../../constants';
import AuthService from '../../services/authServices';
import DashboardService from '../../services/dashboardServices';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
// import normalize from '../../styles/normalize';
import {useFocusEffect} from '@react-navigation/native';
import {checkInterNet, internetText} from '../../services/constant';
import Clipboard from '@react-native-community/clipboard';
import styles from './styles';
import {goBack, navigate} from '../../../navigation.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const topUpPaymentOptions = [
  {
    type: 'To My Bank',
    desc: 'Instantly transfer your savings to your registered Bank Account',
    id: 1,
    banks: [
      {
        bankName: 'GTBank',
        accountNo: '1234121232',
        type: 'regular',
        id: 1,
      },
      {
        bankName: '',
        accountNo: '',
        type: 'new',
        id: 2,
      },
    ],
  },
];

const CreateTransactionPin: React.FC<Props> = props => {
  //States
  const [datas, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [pinExists, setPinExists] = useState(false);

  const [pagesForm, setPagesForm] = useState({
    oldPin: '',
    newPin: '',
    confirmPin: '',
  });

  const fromHarvest = props.route.params.fromHarvest;

  //Helpers

  useEffect(() => {
    checkPinExists();
  }, []);

  const checkPinExists = async () => {
    const pin = await AsyncStorage.getItem('pin');
    if (pin !== null) {
      setPinExists(true);
    } else {
      setPinExists(false);
    }
  };

  const isAnyFieldEmpty = () => {
    return Object.values(pagesForm).findIndex(v => !v) > -1;
  };

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };
  const onFieldChange = (text, field) => {
    const _pagesForm = {...pagesForm};
    _pagesForm[field] = text;
    setPagesForm(_pagesForm);
  };
  // api calls

  const sendOtp = async otpText => {
    try {
      const {data} = await AuthService.GenerateOtp(otpText);
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d.data[0].otp_sent);
        await AsyncStorage.setItem('otp_sent', d.data[0].otp_sent)
          .then(() => {
            navigate('ChangePinOtp', {
              fromHarvest: fromHarvest,
              pin: pagesForm.confirmPin.trim(),
            });
          })
          .catch(e => {
            console.log('async error', e);
          });
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('requestInvestment call error');
      checkNet();
    } finally {
    }
  };

  // Constants

  const checkAnotherCondition = async () => {
    if (pagesForm.newPin.trim() === pagesForm.confirmPin.trim()) {
      if (
        pagesForm.newPin.trim().length < 6 ||
        pagesForm.confirmPin.trim().length < 6
      ) {
        setErrorModal(true);
        seterrorModalMsg(`Pin should be of 6 digits!`);
      } else {
        await sendOtp(Math.random().toString().substr(2, 6));
      }
    } else {
      setErrorModal(true);
      seterrorModalMsg(`Confirm pin not matched with the new pin!`);
    }
  };

  const handleContinue = useCallback(async () => {
    console.log(pagesForm.newPin.trim(), pagesForm.confirmPin.trim());
    const pin = await AsyncStorage.getItem('pin');
    if (pagesForm.oldPin.trim() !== '') {
      if (pagesForm.oldPin.trim() === pin.trim()) {
        checkAnotherCondition();
      } else {
        setErrorModal(true);
        seterrorModalMsg(`Your old pin is invalid!`);
      }
    } else {
      checkAnotherCondition();
    }
  }, [pagesForm]);

  // Main
  return (
    <Layout loading={loading} needToHideView>
      {/* {loading && <LoadModal />} */}
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title={pinExists ? 'Change Transaction PIN' : 'Create Transaction PIN'}
        // linkText={'Harvest'}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={
          pinExists
            ? `Update your transaction PIN regularly for\nbetter security`
            : `You need an active PIN to withdraw funds`
        }
        titleFont={25}
      />

      <View style={Globalstyles.smallGap} />
      <View style={Globalstyles.widthView2}>
        {/* <View style={Globalstyles.tiny15Gap} /> */}
        {pinExists && (
          <>
            <Text style={texts.textInputLabel}>Old PIN</Text>
            <View style={Globalstyles.textInputGap} />

            <InputBox
              placeholder=""
              value={pagesForm.oldPin}
              onChangeText={text => onFieldChange(text, 'oldPin')}
              keyboardType={'numeric'}
              secureText
              maxLength={6}
            />
          </>
        )}
        <View style={Globalstyles.tiny15Gap} />
        <Text style={texts.textInputLabel}>New PIN</Text>
        <View style={Globalstyles.textInputGap} />

        <InputBox
          placeholder=""
          value={pagesForm.newPin}
          onChangeText={text => onFieldChange(text, 'newPin')}
          keyboardType={'numeric'}
          secureText
          maxLength={6}
        />

        <View style={Globalstyles.tiny15Gap} />
        <Text style={texts.textInputLabel}>Confirm PIN</Text>
        <View style={Globalstyles.textInputGap} />

        <InputBox
          placeholder=""
          value={pagesForm.confirmPin}
          onChangeText={text => onFieldChange(text, 'confirmPin')}
          keyboardType={'numeric'}
          secureText
          maxLength={6}
        />
      </View>
      <View style={Globalstyles.smallGap} />
      <View style={Globalstyles.tiny20Gap} />

      <Button
        title={'Continue'}
        disabled={
          pinExists
            ? isAnyFieldEmpty()
            : pagesForm.confirmPin.trim() === '' ||
              pagesForm.newPin.trim() === ''
        }
        onPress={() => handleContinue()}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        nobold
        linkText={'Cancel'}
        backgroundColor={'white'}
        onPress={goBack}></InactiveButton>
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

export default CreateTransactionPin;
