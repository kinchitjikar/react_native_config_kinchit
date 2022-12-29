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
  ConfirmTransactionIcon,
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
  ConfirmationModal,
  SuccessModal,
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
import MonieHarvestServices from '../../services/monieHarvest';

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

const TransferFundVerify: React.FC<Props> = props => {
  //States
  const [datas, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pagesForm, setPagesForm] = useState({
    pin: '',
    otp: '',
  });
  const [modalLoader, setModalLoader] = useState(false);
  const [successModalMessage, setShowSuccessModalMessage] = useState(
    'Your funds have been transferred.\nYour account will be credited shortly.',
  );

  const fromWithdrawDeposit = props.route.params.fromWithdrawDeposit;

  let routeData = {};
  // if (!fromWithdrawDeposit) {
  routeData = {
    selectedBank: props.route.params.selectedBank,
    amt: props.route.params.amt,
    destination:
      props.route.params.destination === undefined
        ? ''
        : props.route.params.destination,
  };
  // }
  console.log('this is routeData', routeData);

  //Helpers

  useEffect(() => {
    // getTransactionPin();
    console.log(routeData);
    genrateOtp(), getProfileData();
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

  const genrateOtp = async () => {
    try {
      const {data} = await AuthService.GenerateOtp(
        Math.random().toString().substr(2, 6),
      );
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d.data[0].otp_sent);
        await AsyncStorage.setItem('otp_sent', d.data[0].otp_sent)
          .then(resp => {
            console.log('resp', resp);
          })
          .catch(e => {
            console.log('async error', e);
          });
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('genrateOtp call error');
      checkNet();
    } finally {
    }
  };

  const transferFund = async () => {
    setModalLoader(true);
    try {
      const {data} = await MonieHarvestServices.AddTransferFund(
        routeData.amt,
        routeData.selectedBank.id,
      );
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(';;;;', d);
        setShowConfirmModal(false);
        setShowSuccessModal(true);
        d.message !== '' && setShowSuccessModalMessage(d.message);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('transferFund call error');
      checkNet();
    } finally {
      setModalLoader(false);
    }
  };

  const withdrawFund = async () => {
    setModalLoader(true);
    try {
      const {data} = await MonieHarvestServices.WithdrawFund(
        routeData.amt,
        routeData.destination,
        routeData.selectedBank.id,
      );
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(';;;;', d);
        setShowConfirmModal(false);
        setShowSuccessModal(true);
        d.message !== '' && setShowSuccessModalMessage(d.message);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('transferFund call error');
      checkNet();
    } finally {
      setModalLoader(false);
    }
  };

  const handleTransferFund = async () => {
    const pin = await AsyncStorage.getItem('pin');
    const sendedOtp = await AsyncStorage.getItem('otp_sent');
    console.log(pin);
    if (pin === null || pin === '') {
      setErrorModal(true);
      seterrorModalMsg('Please create transaction and then try again');
      // navigate('CreateTransactionPin', {fromHarvest: false});
    } else if (pin.trim() !== pagesForm.pin.trim()) {
      setErrorModal(true);
      seterrorModalMsg('Invalid pin!');
    } else if (pagesForm.otp.trim() !== sendedOtp) {
      setErrorModal(true);
      seterrorModalMsg('Invalid otp!');
    } else {
      setShowConfirmModal(true);
    }
  };

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };
  const onFieldChange = (text, field) => {
    const _pagesForm = {...pagesForm};
    _pagesForm[field] = text.replace(/[^0-9]/g, '');
    setPagesForm(_pagesForm);
  };
  const goToMonieHravest = () => {
    setShowSuccessModal(false);
    navigate('MonieHarvest');
  };
  // api calls

  // Constants
  const handleContinue = useCallback(() => {}, []);

  // Main
  return (
    <Layout loading={loading} needToHideView>
      {/* {loading && <LoadModal />} */}
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title="Transfer Fund"
        // linkText={'Harvest'}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`Input your transaction pin and input the\nOTP sent to ${datas.mask_email}\nor ${datas.mask_phone}`}
      />
      <View style={Globalstyles.smallGap} />
      <View style={Globalstyles.widthView2}>
        {/* <View style={Globalstyles.tiny15Gap} /> */}
        <Text style={texts.textInputLabel}>
          Transaction PIN {fromWithdrawDeposit ? '' : '(4 digits)'}
        </Text>
        <View style={Globalstyles.textInputGap} />

        <InputBox
          placeholder=""
          value={pagesForm.pin}
          onChangeText={text => onFieldChange(text, 'pin')}
          keyboardType={'numeric'}
          secureText={true}
        />

        <View style={Globalstyles.tiny15Gap} />
        <Text style={texts.textInputLabel}>OTP</Text>
        <View style={Globalstyles.textInputGap} />

        <InputBox
          placeholder=""
          value={pagesForm.otp}
          onChangeText={text => onFieldChange(text, 'otp')}
          keyboardType={'numeric'}
          maxLength={6}
        />
      </View>
      <View style={Globalstyles.smallGap} />
      <View style={Globalstyles.tiny20Gap} />
      <Button
        title={fromWithdrawDeposit ? 'Withdraw Savings' : 'Transfer Fund'}
        onPress={() => {
          // setShowConfirmModal(true);
          !fromWithdrawDeposit ? handleTransferFund() : handleTransferFund();
        }}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        nobold
        linkText={'Cancel'}
        backgroundColor={'white'}
        onPress={goBack}></InactiveButton>
      {/* {fromWithdrawDeposit ? (
        <ConfirmationModal
          amt={'6000'}
          duration={`******8905 GTBank`}
          visible={showConfirmModal}
          onRequestClose={() => setShowConfirmModal(false)}
          confirmPress={() => {
            setShowConfirmModal(false), setShowSuccessModal(true);
          }}
          differentText
          hideSubText
        />
      ) : ( */}
      {routeData.destination !== 'Wallet' ? (
        <ConfirmationModal
          amt={routeData.amt}
          duration={routeData.selectedBank.mask_name}
          visible={showConfirmModal}
          onRequestClose={() => setShowConfirmModal(false)}
          confirmPress={() => {
            fromWithdrawDeposit ? withdrawFund() : transferFund();
          }}
          differentText
          hideSubText
          loader={modalLoader}
          customText={
            <Text style={[styles.darktext18gray]}>
              You're about to withdraw{' '}
              <Text style={{color: '#277424'}}>{`₦${routeData.amt}`}</Text> to
              your wallet.
            </Text>
          }
        />
      ) : (
        <ConfirmationModal
          visible={showConfirmModal}
          onRequestClose={() => setShowConfirmModal(false)}
          confirmPress={() => {
            fromWithdrawDeposit ? withdrawFund() : transferFund();
          }}
          differentText
          hideSubText
          loader={modalLoader}
          customText={
            <Text style={[styles.darktext18gray]}>
              You're about to withdraw{' '}
              <Text style={{color: '#277424'}}>{`₦${routeData.amt}`}</Text> to
              your wallet.
            </Text>
          }
        />
      )}
      {/* )} */}
      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        continuePress={goToMonieHravest}
        text={successModalMessage}
      />
      <ErrorModal
        visible={errorModal}
        onRequestClose={async () => {
          setErrorModal(false),
            errorModalMsg === 'Login session timout'
              ? AuthService.sessionTimeOut()
              : errorModalMsg === 'Please create transaction and then try again'
              ? navigate('CreateTransactionPin', {fromHarvest: true})
              : {};
        }}
        text={`${errorModalMsg}`}
      />
    </Layout>
  );
};

export default TransferFundVerify;
