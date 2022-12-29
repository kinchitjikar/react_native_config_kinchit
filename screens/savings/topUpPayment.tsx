import React, {useCallback, useEffect, useState} from 'react';
import {View, Platform, Alert, Text, TouchableOpacity} from 'react-native';
import {
  Navbar,
  Button,
  InactiveButton,
  Layout,
  ErrorModal,
  FundTansfer,
  WalletBalance,
  BankView,
  CardView,
  SuccessModal,
  ConfirmationSingleModal,
} from '../../components';
import AuthService from '../../services/authServices';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import {goBack, navigate} from '../../../navigation.service';
import {CopyIcon} from '../../assets/svgs';
import texts from '../../styles/texts';
import Clipboard from '@react-native-community/clipboard';
import DashboardService from '../../services/dashboardServices';
import {checkInterNet, internetText} from '../../services/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation?: any;
};

const topUpPaymentOptions = [
  {
    type: 'From My MonieHarvest',
    desc: 'Transfer money directly from your wallet with zero \ncharge',
    id: 2,
    balance: 5000,
  },
  {
    type: 'Bank Transfer',
    desc: 'Send money to your account number below and \ninstantly get topped up.',
    id: 3,
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
  {
    type: 'Debit Card',
    desc:
      Platform.OS === 'android'
        ? 'Use the details from your Debit card to top-up your \nwallet'
        : 'Use the details from your Debit card to top-up your wallet',
    id: 4,
    cards: [
      {
        currentCard: 'ICICI',
        currentCardNo: '8001 1444 5544 5555',
        expiryNo: '09/21',
        PIN: '120',
        id: 1,
        type: 'regular',
      },
      {
        currentCard: '',
        currentCardNo: '',
        expiryNo: '',
        PIN: '',
        type: 'new',
        id: 2,
      },
    ],
  },
];

const TopUpPayment: React.FC<Props> = props => {
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cardType, setCardType] = useState('');
  const [walletBalance, setWalletBalance] = useState('0');
  const [bankAccount, setBankAccount] = useState({});
  useEffect(() => {
    getWalletBalance();
    callPaymentInfo();
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

  const onPressContinue = useCallback(() => {
    if (selectedCard !== null && selectedId === 4) {
      if (selectedCard.type === 'new') {
        // navigate('NewCard', {fromProfile: false});
      } else if (selectedCard.type === 'regular') {
        setShowConfirmModal(true);
      }
    } else {
      setShowConfirmModal(true);
    }
  }, [selectedCard]);

  const onPressSuccessContinue = useCallback(() => {
    setShowSuccessModal(false);
    props.navigation.navigate('Certificates');
  }, []);

  const copyToClipboard = text => {
    Clipboard.setString(text);
    Alert.alert('Copied');
  };
  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const callPaymentInfo = async () => {
    try {
      const {data} = await DashboardService.GetSavingsMonietree();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d.data[0].payment_mode);
        setBankAccount(d.data[0].payment_mode.BankAccount);
        topUpPaymentOptions[2].cards =
          d.data[0].payment_mode.Card.connected_cards;
        topUpPaymentOptions[2].cards =
          d.data[0].payment_mode.Card.connected_cards.map(object => {
            return {
              currentCardNo: object.card_number,
              expiryNo: object.card_expiry_date,
              id: object.id,
              type: 'regular',
              PIN: '',
              currentCard: '',
            };
          });

        topUpPaymentOptions[2].cards = topUpPaymentOptions[2].cards.concat({
          currentCardNo: '',
          expiryNo: '',
          type: 'new',
          id: 0,
          PIN: '',
          currentCard: '',
        });
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      checkNet();
    } finally {
      setLoading(false);
    }
    // try {
    //   const {data} = await DepositServices.ProductpaymentInfo(
    //     props.route.params.data.plan_id,
    //     props.route.params.amt,
    //   );
    //   const d = await AuthService.tempData(data);
    //   if (typeof d === 'object') {
    //     console.log('IS HASVAL ?', d.data[0]);
    //     setBankAccount(d.data[0].payment_mode.BankAccount);
    //     await setData(d.data[0]);

    //     transferOptions[2].card = d.data[0].payment_mode.Card.connected_cards;
    //     transferOptions[2].card =
    //       d.data[0].payment_mode.Card.connected_cards.map(object => {
    //         return {
    //           currentCardNo: object.card_number,
    //           expiryNo: object.card_expiry_date,
    //           id: object.id,
    //           type: 'regular',
    //           PIN: '',
    //           currentCard: '',
    //         };
    //       });

    //     transferOptions[2].card = transferOptions[2].card.concat({
    //       currentCardNo: '',
    //       expiryNo: '',
    //       type: 'new',
    //       id: 0,
    //       PIN: '',
    //       currentCard: '',
    //     });
    //   } else {
    //     setErrorModal(true);
    //     seterrorModalMsg(d);
    //   }
    // }
  };

  const renderCardView = useCallback(
    (item, index) => {
      return (
        <CardView
          key={index}
          item={item}
          isSelected={selectedCard?.id === item.id}
          // onPress={async () => {
          //   console.log(item);
          //   await setSelectedCard(item);
          //   Alert.alert(JSON.stringify(selectedCard));
          //   // if (item.type === 'new') {
          //   //   await setCardType('new');
          //   // }
          // }}
          onSelect={async (item: any) => {
            console.log('ITEM', item);
            await setSelectedCard(item);
          }}
        />
      );
    },
    [selectedCard],
  );

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
            balance={walletBalance}
          />
        );
      } else if (selectedId === 3) {
        return (
          <View>
            {bankAccount.bank_name !== '' &&
              bankAccount.account_number !== '' &&
              bankAccount.bank_name !== null &&
              bankAccount.account_number !== null && (
                <>
                  <Text style={texts.text15gray}>{bankAccount.bank_name}</Text>
                  <View style={Globalstyles.centerRow}>
                    <Text style={texts.text13green}>
                      {bankAccount.account_number}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        copyToClipboard(bankAccount.account_number)
                      }
                      style={{marginLeft: '2%'}}>
                      <CopyIcon />
                    </TouchableOpacity>
                  </View>
                </>
              )}
          </View>
        );
      } else if (selectedId === 4) {
        return item.cards.map((item, index) => renderCardView(item, index));
      } else {
        return <></>;
      }
    },
    [selectedId, renderBankView, renderCardView],
  );

  const renderTransferOptions = useCallback(
    item => {
      return (
        <FundTansfer
          key={item.id}
          id={item.id}
          onPress={() => {
            if (item.id !== 4) {
              setSelectedId(item.id);
              setSelectedCard(null);
            } else {
              setSelectedId(item.id);
            }
          }}
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
        title={`Payment`}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`Select a payment method to top up your \nsavings`}
        // isSubTextBlack
      />

      {topUpPaymentOptions.map(item => renderTransferOptions(item))}

      <View style={Globalstyles.bigGap} />
      <Button
        title={'Continue'}
        nobold
        disabled={
          selectedId === null || (selectedCard === null && selectedId === 4)
        }
        onPress={onPressContinue}
      />
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        nobold
        linkText={'Cancel'}
        backgroundColor={'white'}
        onPress={goBack}
      />

      <ConfirmationSingleModal
        amt={'5000'}
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        confirmPress={() => {
          setShowConfirmModal(false), setShowSuccessModal(true);
        }}
      />

      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        continuePress={onPressSuccessContinue}
        text={`Your savings have been funded. Keep \nyour money growing!`}
      />
    </Layout>
  );
};

export default TopUpPayment;
