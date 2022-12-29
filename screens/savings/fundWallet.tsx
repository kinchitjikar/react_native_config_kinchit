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
  ConfirmationModal,
} from '../../components';
import AuthService from '../../services/authServices';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import {goBack, navigate} from '../../../navigation.service';
import texts from '../../styles/texts';
import {CopyIcon} from '../../assets/svgs';
import Clipboard from '@react-native-community/clipboard';
import MonieHarvestServices from '../../services/monieHarvest';
import {checkInterNet, internetText} from '../../services/constant';

type Props = {
  navigation?: any;
};

const topUpPaymentOptions = [
  {
    type: 'Bank Transfer',
    desc: 'Send money to your account number below and \ninstantly get topped up.',
    id: 3,
    banks: [
      {
        bankName: 'GTBank',
        accountNo: '1234121232',
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

const FundWallet: React.FC<Props> = props => {
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cardType, setCardType] = useState('');
  const [bankAccount, setBankAccount] = useState({});
  const [successModalMessage, setShowSuccessModalMessage] = useState('');

  const fromHome = props.route.params.fromHome;
  const amt = props.route.params.amt;

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const {data} = await MonieHarvestServices.GetFundWallet();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(';;;;', d.data[0].Card.connected_cards);
        setBankAccount(d.data[0].BankAccount);

        topUpPaymentOptions[1].cards = d.data[0].Card.connected_cards;
        topUpPaymentOptions[1].cards = d.data[0].Card.connected_cards.map(
          object => {
            return {
              currentCardNo: object.card_number,
              expiryNo: object.card_expiry_date,
              id: object.id,
              type: 'regular',
              PIN: '',
              currentCard: '',
            };
          },
        );

        topUpPaymentOptions[1].cards = topUpPaymentOptions[1].cards.concat({
          currentCardNo: '',
          expiryNo: '',
          type: 'new',
          id: 0,
          PIN: '',
          currentCard: '',
        });
        console.log('sss');
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('deleteCard call error');
      checkNet();
    } finally {
      setLoading(false);
    }
  };

  const handleBankPayment = async () => {
    setLoading(true);
    try {
      const {data} = await MonieHarvestServices.AddFundBank(amt, 'BankAccount');
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log('bank pay', d.data[0]);
        setShowSuccessModal(true);
        setShowSuccessModalMessage(d.message);
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

  const handleRegularCardPayment = async () => {
    // console.log(selectedCard.id);
    setLoading(true);
    try {
      const {data} = await MonieHarvestServices.AddFundValidCard(
        amt,
        'Card',
        selectedCard.id,
      );
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log('bank pay', d.data[0]);
        setShowSuccessModal(true);
        setShowSuccessModalMessage(d.message);
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

  const onPressContinue = async () => {
    console.log('CARD', selectedCard, selectedId, 'BANK', selectedBank);
    if (selectedCard !== null && selectedId === 4) {
      if (selectedCard.type === 'new') {
        navigate('FundWalletNewCard', {amt: amt, fromHome: fromHome});
      } else if (selectedCard.type === 'regular') {
        await handleRegularCardPayment();
      }
    } else {
      // setShowSuccessModal(true);
      await handleBankPayment();
    }
  };

  const onPressSuccessContinue = useCallback(() => {
    setShowSuccessModal(false);
    if (fromHome) {
      navigate('Home');
    } else {
      navigate('MonieHarvest');
    }
  }, []);

  const copyToClipboard = text => {
    Clipboard.setString(text);
    Alert.alert('Copied');
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

  // const renderBankView = useCallback(
  //   (item, index) => {
  //     return (
  //       <BankView
  //         key={index}
  //         item={item}
  //         isSelected={selectedBank?.id === item.id}
  //         onPress={selectedItem => {
  //           setSelectedCard(null);

  //           setSelectedBank(selectedItem);
  //         }}
  //       />
  //     );
  //   },
  //   [selectedBank, selectedId, selectedCard],
  // );

  const renderSelectedView = useCallback(
    item => {
      if (selectedId === 3) {
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
    [selectedId, renderCardView, selectedBank, selectedCard],
  );

  const renderTransferOptions = useCallback(
    item => {
      return (
        <FundTansfer
          key={item.id}
          id={item.id}
          onPress={() => {
            if (item.id === 3) {
              setSelectedId(item.id);
              setSelectedCard(null);
              setSelectedBank(bankAccount);
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
    [selectedId, renderSelectedView, selectedBank, selectedCard],
  );

  return (
    <Layout loading={loading} noBottomPad needToHideView>
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title={`Fund Your Wallet`}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`Top up your wallet with 100\nNaira or more`}
        // isSubTextBlack
      />

      {topUpPaymentOptions.map(item => renderTransferOptions(item))}

      <View style={Globalstyles.bigGap} />
      <Button
        title={'Continue'}
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

      <ConfirmationModal
        amt={`6000`}
        duration={``}
        showMineText={' '}
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        confirmPress={() => {
          setShowConfirmModal(false), setShowSuccessModal(true);
        }}
        differentText
        hideSubText
      />

      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        continuePress={onPressSuccessContinue}
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
              : {};
        }}
        text={`${errorModalMsg}`}
      />
    </Layout>
  );
};

export default FundWallet;
