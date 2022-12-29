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

const FundwalletInitialScreen: React.FC<Props> = props => {
  //States
  const [datas, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [walletBalance, setWalletBalance] = useState('0');

  const [pagesForm, setPagesForm] = useState({
    amt: '',
  });

  const fromHome = props.route.params.fromHome;

  //Helpers

  useEffect(() => {
    getWalletBalance();
  }, []);

  const getWalletBalance = async () => {
    setLoading(true);
    await AsyncStorage.getItem('WalletBalance')
      .then(resp => {
        console.log(resp);
        setWalletBalance(resp);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };
  // useFocusEffect(useCallback(() => {}, []));

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };
  const onFieldChange = (text, field) => {
    const _pagesForm = {...pagesForm};
    _pagesForm[field] = text.replace(/[^0-9.]/g, '');
    setPagesForm(_pagesForm);
  };
  // api calls

  // Constants
  const handleContinue = useCallback(() => {}, []);

  // Main
  return (
    <Layout
      loading={loading}
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
      {/* {loading && <LoadModal />} */}
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title="Fund Wallet"
        // linkText={'Harvest'}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`Enter an amount to add`}
      />
      <View style={Globalstyles.smallGap} />
      <WalletBalance
        style={{marginTop: normalize(10, 'height')}}
        balance={walletBalance === '0' ? '0' : walletBalance}
        addCurrent
      />
      <View style={Globalstyles.smallGap} />
      <View style={Globalstyles.widthView2}>
        {/* <View style={Globalstyles.tiny15Gap} /> */}
        <Text style={texts.textInputLabel}>Amount</Text>
        <View style={Globalstyles.textInputGap} />

        <InputBox
          placeholder=""
          value={pagesForm.amt}
          onChangeText={text => onFieldChange(text, 'amt')}
          keyboardType={'numeric'}
        />
      </View>
      <View style={Globalstyles.smallGap} />
      <View style={Globalstyles.tiny20Gap} />

      <Button
        title={'Continue'}
        onPress={() => {
          navigate('FundWallet', {fromHome: fromHome, amt: pagesForm.amt});
        }}
        disabled={pagesForm.amt === ''}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        nobold
        linkText={'Cancel'}
        backgroundColor={'white'}
        onPress={goBack}></InactiveButton>
    </Layout>
  );
};

export default FundwalletInitialScreen;
