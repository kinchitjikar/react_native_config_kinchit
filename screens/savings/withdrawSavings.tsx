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
} from '../../components';
import AuthService from '../../services/authServices';
import Globalstyles from '../../styles';
import {goBack, navigate} from '../../../navigation.service';
import normalize from '../../styles/normalize';
import {checkInterNet, internetText} from '../../services/constant';
import BankServices from '../../services/bankServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const transferOptions = [
  {
    type: 'To My Wallet',
    desc: 'Transfer money directly to your MoneyHarvest account. This is your virtual wallet.',
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
        id: 2,
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

const WithDrawSavings: React.FC<Props> = props => {
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedBank, setSelectedBank] = useState({
    bankName: '',
    accountNo: '',
    type: 'new',
    id: 0,
    mask_name: '',
    account_name: '',
  });
  const [walletBalance, setWalletBalance] = useState('0');

  const amt = props.route.params.amt;

  useEffect(() => {
    getWalletBalance();
    callBankList();
  }, []);

  const getWalletBalance = async () => {
    await AsyncStorage.getItem('WalletBalance')
      .then(resp => {
        console.log(resp);
        setWalletBalance(resp);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const callBankList = async () => {
    setLoading(true);
    try {
      const {data} = await BankServices.GetUserBanks();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(';;;;', d.data);

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

  const onPressContinue = useCallback(() => {
    console.log('SELECTED BANK', selectedBank);
    if (selectedBank !== null && selectedId === 3) {
      if (selectedBank.type === 'new') {
        navigate(`TransferFundAddBank`, {fromHome: false, amt: amt});
      } else if (selectedBank.type === 'regular') {
        navigate('TransferFundVerify', {
          option: props?.route?.params?.option,
          selectedBank,
          fromWithdrawDeposit: true,
          amt: amt,
          destination: selectedId == '2' ? 'Wallet' : 'BankAccount',
        });
      }
    } else {
      navigate('TransferFundVerify', {
        option: props?.route?.params?.option,
        selectedBank,
        fromWithdrawDeposit: true,
        amt: amt,
        destination: selectedId == '2' ? 'Wallet' : 'BankAccount',
      });
    }
  }, [selectedBank, selectedId]);

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
      if (selectedId === 2) {
        return (
          <WalletBalance
            style={{marginTop: normalize(10, 'height')}}
            balance={`${walletBalance}`}
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
    <Layout loading={loading} noBottomPad needToHideView>
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title={`Withdraw Savings`}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`Select a destination account`}
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

export default WithDrawSavings;
