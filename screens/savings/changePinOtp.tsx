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

const ChangePinOtp: React.FC<Props> = props => {
  //States
  const [datas, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [pagesForm, setPagesForm] = useState({
    otp: '',
  });

  const goToMonieHravest = () => {
    setShowSuccessModal(false);
    if (fromHarvest) {
      navigate('MonieHarvest');
    } else {
      navigate('Settings');
    }
  };

  const fromHarvest = props.route.params.fromHarvest;
  const pin = props.route.params.pin;

  //Helpers

  useEffect(() => {
    getProfileData();
  }, []);

  useFocusEffect(useCallback(() => {}, []));

  const getProfileData = async () => {
    try {
      const {data} = await AuthService.GetUserInfo();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d.data[0]);
        await setData(d.data[0]);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('requestInvestment call error');
      checkNet();
    } finally {
      setLoading(false);
    }
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

  // Constants
  const handleContinue = useCallback(async () => {
    const localOtp = await AsyncStorage.getItem('otp_sent');
    console.log(localOtp);
    if (localOtp.trim() === pagesForm.otp.trim()) {
      await AsyncStorage.setItem('pin', `${pin}`)
        .then(() => {
          setShowSuccessModal(true);
        })
        .catch(e => {
          console.log('async e', e);
        });
    } else {
      setErrorModal(true);
      seterrorModalMsg('Invalid otp!');
    }
  }, [pagesForm]);

  // Main
  return (
    <Layout loading={loading} needToHideView>
      {/* {loading && <LoadModal />} */}
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title="Change Transaction PIN"
        // linkText={'Harvest'}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`Input the OTP sent to \n${datas.mask_email}\nor ${datas.mask_phone}`}
        titleFont={25}
      />

      <View style={Globalstyles.smallGap} />
      <View style={Globalstyles.widthView2}>
        {/* <View style={Globalstyles.tiny15Gap} /> */}
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
      <View style={Globalstyles.smallGap} />

      <Button
        title={'Save Changes'}
        onPress={() => {
          handleContinue();
        }}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        nobold
        linkText={'Cancel'}
        backgroundColor={'white'}
        onPress={goBack}></InactiveButton>

      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        continuePress={goToMonieHravest}
        text={`You have updated your Transaction\nPIN`}
      />
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

export default ChangePinOtp;
