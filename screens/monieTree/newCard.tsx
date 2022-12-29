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
import {Colors} from '../../constants';
import DepositServices from '../../services/depositServices';
import AuthService from '../../services/authServices';
import {checkInterNet, internetText} from '../../services/constant';
import BankServices from '../../services/bankServices';

const transferOptions = [
  {
    type: 'Bank Tansfer',
    desc: 'Send money to your account number and \ninstantly get topped up.',
    id: 1,
    currentBank: 'Wema Bank',
    currentAccountNo: '8022412466',
  },
  {
    type: 'Debit Card',
    desc: 'Use the details from your Debit card to top-up your wallet',
    id: 2,
    currentCard: 'ICICI',
    currentCardNo: '800114445544',
    expiryNo: '09/21',
    PIN: '120',
  },
  // {
  //   type: 'From another monieTree Account',
  //   desc: 'Send a payment request to anyone',
  //   id: 3,
  // },
];

const NewCard: React.FC<Props> = props => {
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
  const fromHome = props.route.params.fromProfile;
  const requiredItems = props.route.params.requiredItems;
  //Helpers
  useEffect(() => {
    handleNewCardPayment();
  }, []);
  // Constants

  const goToHome = () => {
    setShowSuccessModal(false);
    props.navigation.navigate('Home');
  };

  const goToSavings = () => {
    setShowSuccessModal(false);
    props.navigation.navigate('Savings');
  };

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const handleNewCardPayment = async () => {
    setLoading(true);
    try {
      const {data} = await DepositServices.ProductpaymentInfoConfirm(
        requiredItems.hasval,
        'Card',
        true,
        '0',
      );
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log('Link',d)
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
          } else if (
            url.includes('flutterwave_card_payment_redirect1?status=cancelled')
          ) {
            if (!alreadyGoback) {
              goToHome();
            }
            setAlreadyGoBack(true);
          } else {
          }
        }}
      />
      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={goToHome}
        continuePress={goToHome}
        text={
          successModalMessage !== ''
            ? successModalMessage
            : `Your savings have been funded. Keep \nyour money growing!`
        }
      />

      <ErrorModal
        visible={errorModal}
        onRequestClose={async () => {
          setErrorModal(false),
            errorModalMsg === 'Login session timout'
              ? AuthService.sessionTimeOut()
              : goToHome;
        }}
        text={`${errorModalMsg}`}
      />
    </Layout>
  );
};

export default NewCard;
