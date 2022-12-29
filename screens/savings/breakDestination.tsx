import React, {useState, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {
  Navbar,
  Button,
  InactiveButton,
  Layout,
  ErrorModal,
  FundTansfer,
  WalletBalance,
  BankView,
  SuccessModal,
} from '../../components';
import AuthService from '../../services/authServices';
import Globalstyles from '../../styles';
import {goBack, navigate} from '../../../navigation.service';
import normalize from '../../styles/normalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkInterNet, internetText} from '../../services/constant';
import BankServices from '../../services/bankServices';

const transferOptions = [
  {
    type: 'To My Wallet',
    desc: 'Withdraw your savings directly to your MoneyHarvest account. This is your virtual wallet.',
    id: 2,
    balance: 5000,
  },
  {
    type: 'To My Bank',
    desc: 'Instantly transfer your savings to your registered Bank Account ',
    id: 3,
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

type Props = {
  navigation?: any;
  route?: any;
};

const breakDestination: React.FC<Props> = props => {
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedBank, setSelectedBank] = useState(transferOptions[1].banks[1]);
  const [walletBalance, setWalletBalance] = useState('0');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  useEffect(() => {
    getWalletBalance();
    callBankList();
  }, []);

  const getWalletBalance = async () => {
    await AsyncStorage.getItem('WalletBalance')
      .then(resp => {
        console.log(resp);
        setWalletBalance(resp);
        transferOptions[0].balance = resp;
      })
      .catch(e => {
        console.log(e);
      });
  };

  const callBankList = async () => {
    setLoading(true);
    try {
      const {data} = await BankServices.GetUserBanks();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(';;;;', d.data);
        // setBankAccount(d.data[0].BankAccount);

        transferOptions[1].banks = d.data.map(object => {
          return {
            bankName: object.bank_name,
            accountNo: object.account_number,
            type: 'regular',
            id: object.id,
            mask_name: object.mask_name,
            account_name: object.account_name,
          };
        });

        transferOptions[1].banks = transferOptions[1].banks.concat({
          bankName: '',
          accountNo: '',
          type: 'new',
          id: 0,
          mask_name: '',
          account_name: '',
        });

        setSelectedBank({
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

  const onPressSuccessContinue = useCallback(() => {
    setShowSuccessModal(false);
    props.navigation.navigate('Certificates');
  }, []);
  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const onPressContinue = useCallback(() => {
    if (selectedId === 2) {
      setShowSuccessModal(true);
    } else {
      if (selectedBank !== null) {
        if (selectedBank.type === 'new') {
          navigate(`TransferFundAddBank`, {fromHome: false});
        } else {
          props.navigation.navigate('TransferSaving', {
            option: props?.route?.params?.option,
            selectedBank,
          });
        }
      }
    }
  }, [selectedBank, selectedId]);

  const renderBankView = useCallback(
    (item, index) => {
      return (
        <BankView
          key={index}
          item={item}
          isSelected={selectedBank.id === item.id}
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
      if (selectedId === 2) {
        return (
          <WalletBalance
            style={{marginTop: normalize(10, 'height')}}
            balance={item.balance}
          />
        );
      } else if (selectedId === 3) {
        return item.banks.map((item, index) => renderBankView(item, index));
      } else {
        return <></>;
      }
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
        />
      );
    },
    [selectedId, renderSelectedView],
  );

  return (
    <Layout
      loading={loading}
      noBottomPad
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
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title={`Break Your Savings`}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`Select a destination for your \nwithdrawal`}
        isSubTextBlack
      />

      {transferOptions.map(item => renderTransferOptions(item))}

      <View style={Globalstyles.bigGap} />
      <Button
        title={'Continue'}
        disabled={selectedId === null}
        nobold
        onPress={onPressContinue}
      />
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        nobold
        linkText={'Cancel'}
        backgroundColor={'white'}
        onPress={goBack}
      />

      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        continuePress={onPressSuccessContinue}
        text={`Your bank account will be funded \nshortly`}
      />
    </Layout>
  );
};

export default breakDestination;
