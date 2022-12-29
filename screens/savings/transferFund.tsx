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
import BankServices from '../../services/bankServices';

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
        mask_name: '',
        account_name: '',
      },
      {
        bankName: '',
        accountNo: '',
        type: 'new',
        id: 0,
        mask_name: '',
        account_name: '',
      },
    ],
  },
];

const TransferFund: React.FC<Props> = props => {
  //States
  const [datas, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  //Helpers

  useEffect(() => {
    callBankList();
  }, []);

  const callBankList = async () => {
    setLoading(true);
    try {
      const {data} = await BankServices.GetUserBanks();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(';;;;', d.data);
        // setBankAccount(d.data[0].BankAccount);

        topUpPaymentOptions[0].banks = d.data.map(object => {
          return {
            bankName: object.bank_name,
            accountNo: object.account_number,
            type: 'regular',
            id: object.id,
            mask_name: object.mask_name,
            account_name: object.account_name,
          };
        });

        topUpPaymentOptions[0].banks = topUpPaymentOptions[0].banks.concat({
          bankName: '',
          accountNo: '',
          type: 'new',
          id: 0,
          mask_name: '',
          account_name: '',
        });
        // console.log('sss');
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('deleteCard call error', error);
      checkNet();
    } finally {
      setLoading(false);
    }
  };

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  // api calls

  // Constants
  const handleContinue = useCallback(() => {
    console.log(selectedBank);
    if (selectedBank !== null) {
      if (selectedBank.type === 'new') {
        navigate(`TransferFundAddBank`, {fromHome: false});
      } else {
        navigate('TransferFundAddAmt', {selectedBank: selectedBank});
      }
    }
  }, [selectedBank]);

  const renderBankView = useCallback(
    (item, index) => {
      return (
        <BankView
          key={index}
          item={item}
          isSelected={selectedBank?.id === item.id}
          onPress={selectedItem => {
            setSelectedBank(selectedItem);
          }}
        />
      );
    },
    [selectedBank],
  );

  const renderSelectedView = useCallback(
    item => {
      return item.banks.map((item, index) => renderBankView(item, index));
    },
    [selectedId, renderBankView],
  );

  const renderTransferOptions = useCallback(
    item => {
      return (
        <FundTansfer
          key={item.id}
          id={item.id}
          onPress={() => setSelectedId(item.id)}
          selected={selectedId === item.id}
          type={item.type}
          desc={item.desc}
          renderSelectedView={
            selectedId === item.id && renderSelectedView(item)
          }
          selectedId={selectedId}
          hideBorder
        />
      );
    },
    [selectedId, renderSelectedView],
  );

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
        subText={`Transfer your funds from your wallet to\nyour bank account\n`}
      />
      {topUpPaymentOptions.map(item => renderTransferOptions(item))}
      <View style={Globalstyles.smallGap} />
      <Button
        title={'Continue'}
        disabled={selectedId === null}
        onPress={() => {
          handleContinue(selectedId);
        }}></Button>
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

export default TransferFund;
