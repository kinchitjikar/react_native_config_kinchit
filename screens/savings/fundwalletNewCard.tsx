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
  ImageBackground,
} from 'react-native';
import {
  CopyIcon,
  DebitCardRadioButtonActive,
  LogoIcon,
} from '../../assets/svgs';
import {
  Button,
  ConfirmationModal,
  ErrorModal,
  FundTansfer,
  InactiveButton,
  Layout,
  PaymentWebView,
  SuccessModal,
  TreeList,
} from '../../components';
import InputBox from '../../components/InputBox';
import Navbar from '../../components/Navbar';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
// import normalize from '../../styles/normalize';
import styles from '../monieTree/styles';
import Clipboard from '@react-native-community/clipboard';
import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../../constants';
import DepositServices from '../../services/depositServices';
import AuthService from '../../services/authServices';
import {checkInterNet, internetText} from '../../services/constant';
import BankServices from '../../services/bankServices';
import MonieHarvestServices from '../../services/monieHarvest';
import {WebView} from 'react-native-webview';
import {navigate} from '../../../navigation.service';

const FundWalletNewCard: React.FC<Props> = props => {
  //States

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pagesForm, setPagesForm] = useState({
    cvv: '',
    // pin: '',
  });
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);
  const [successModalMessage, setShowSuccessModalMessage] = useState('');
  const [link, setLink] = useState('');
  const [alreadyGoback, setAlreadyGoBack] = useState(false);
  const fromProfile = props.route.params.fromProfile;
  const requiredItems = props.route.params.requiredItems;
  //Helpers

  const amt = props.route.params.amt;
  const fromHome = props.route.params.fromHome;

  useEffect(() => {
    handleNewCardPayment();
  }, []);

  const goToHome = () => {
    setShowSuccessModal(false);
    props.navigation.navigate('Home');
  };

  const goToSavings = () => {
    setShowSuccessModal(false);
    props.navigation.navigate('Savings');
  };

  const onFieldChange = (text, field) => {
    const _pagesForm = {...pagesForm};
    _pagesForm[field] = text.replace(/[^0-9]/g, '');
    setPagesForm(_pagesForm);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const isAnyFieldEmpty = () => {
    return Object.values(pagesForm).findIndex(v => !v) > -1;
  };
  // api calls

  const handleNewCardPayment = async () => {
    setLoading(true);
    try {
      const {data} = await MonieHarvestServices.AddFundNewCard(
        amt,
        'Card',
        '0',
      );
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log('bank pay', d.data[0].payment_link);
        // setShowSuccessModal(true);
        // setShowSuccessModalMessage(d.message);
        setLink(d.data[0].payment_link);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('handleBankPayment call error', error);
      checkNet();
    } finally {
      setLoading(false);
    }
  };

  // Constants

  // Main
  return (
    <Layout loading={loading}>
      <View style={Globalstyles.tinyGap} />

      <View style={Globalstyles.tinyGap} />
      <PaymentWebView
        link={`${link}`}
        onNavigationStateChange={({url, canGoBack}) => {
          console.log('Navigated URL', url);
          if (
            url.includes('flutterwave_card_payment_redirect1?status=successful')
          ) {
            setShowSuccessModal(true);
            // navigate('Home');
          } else if (
            url.includes('flutterwave_card_payment_redirect1?status=cancelled')
          ) {
            if (!alreadyGoback) {
              fromHome ? goToHome() : goToSavings();
            }
            setAlreadyGoBack(true);
          } else {
          }
        }}
      />

      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={fromHome ? goToHome : goToSavings}
        continuePress={fromHome ? goToHome : goToSavings}
        text={
          successModalMessage === ''
            ? `Your wallet will be credited as soon\nas you make the transfer`
            : successModalMessage
        }
        successText={'Awesome!'}
      />

      <ErrorModal
        visible={errorModal}
        onRequestClose={async () => {
          setErrorModal(false),
            errorModalMsg === 'Login session timout'
              ? AuthService.sessionTimeOut()
              : navigate('Home');
        }}
        text={`${errorModalMsg}`}
      />
      {/* )} */}
    </Layout>
  );
};

export default FundWalletNewCard;
