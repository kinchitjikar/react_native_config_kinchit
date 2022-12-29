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
  ImageBackground,
} from 'react-native';
import {
  CopyIcon,
  DebitCardInactiveIcon,
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
  LoadModal,
  SuccessModal,
  TreeList,
  WalletBalance,
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
import {goBack, navigate} from '../../../navigation.service';
import DepositServices from '../../services/depositServices';
import AuthService from '../../services/authServices';
import {useFocusEffect} from '@react-navigation/native';
import {checkInterNet, internetText} from '../../services/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BankServices from '../../services/bankServices';
import _, {isEmpty} from 'lodash';

const transferOptions = [
  {
    type: 'From My MonieHarvest',
    desc: 'Transfer money directly from your wallet with zero \ncharge',
    id: 1,
    balance: 5000,
  },
  {
    type: 'Bank Transfer',
    desc: 'Send money to your account number and \ninstantly get topped up.',
    id: 2,
    currentBank: 'Wema Bank',
    currentAccountNo: '8022412466',
  },
  {
    type: 'Debit Card',
    desc:
      Platform.OS === 'android'
        ? 'Use the details from your Debit card to top-up your \nwallet'
        : 'Use the details from your Debit card to top-up your wallet',
    id: 3,
    card: [
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
  // {
  //   type: 'From another monieTree Account',
  //   desc: 'Send a payment request to anyone',
  //   id: 3,
  // },
];

const TreeInvest: React.FC<Props> = props => {
  const tree = props.route.params.data
    ? props.route.params.data.product_title
    : '';

  const treeObj = props.route.params.data ? props.route.params.data : {};
  //States
  const [datas, setData] = useState({});
  const [paymentForm, setPaymentForm] = useState({
    duration: '',
    amount: '',
    due_amount: '',
  });
  const [selectedId, setSelectedId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(2);
  const [selectedCardType, setSelectedCardType] = useState('new');
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [hasval, setHasval] = useState('');
  const [modalLoader, setModalLoader] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [walletBalance, setWalletBalance] = useState('0');
  const [bankAccount, setBankAccount] = useState({});
  const [successModalMessage, setShowSuccessModalMessage] = useState('');

  console.log(treeObj);
  //Helpers

  // useEffect(() => {
  //   callPaymentInfo();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      callPaymentInfo();
      getWalletBalance();
    }, []),
  );

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

  const copyToClipboard = text => {
    Clipboard.setString(text);
    Alert.alert('Copied');
  };

  const goToHome = () => {
    setShowSuccessModal(false);
    navigate('Home');
  };
  const goTocard = () => {
    setShowConfirmModal(false);
    navigate('NewCard', {
      fromProfile: false,
      requiredItems: {
        data: props.route.params.data,
        planAmt: props.route.params.amt,
        selectedId: selectedCard,
        hasval: datas.hasval,
        payment_mode: 'Card',
      },
    });
  };

  const handleContinue = (id, cardType) => {
    // if (id === 1) {
    //   setShowConfirmModal(true);
    // } else if (id === 2) {
    //   setShowConfirmModal(true);
    // } else {
    //   if (cardType === 'new') {
    //     goTocard();
    //   } else {
    //     setShowConfirmModal(true);
    //   }
    // }
    setShowConfirmModal(true);
  };

  function returnHidenPhone(value) {
    return value.replace(value.substring(0, 14), '**** **** ****');
  }

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  // api calls
  const callPaymentInfo = async () => {
    try {
      const {data} = await DepositServices.ProductpaymentInfo(
        props.route.params.data.plan_id,
        props.route.params.amt,
      );
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log('IS HASVAL ?', d.data[0]);
        setBankAccount(d.data[0].payment_mode.BankAccount);
        await setData(d.data[0]);

        transferOptions[2].card = d.data[0].payment_mode.Card.connected_cards;
        transferOptions[2].card =
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

        transferOptions[2].card = transferOptions[2].card.concat({
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
      console.log('dashboard signup call error');

      checkNet();
    } finally {
      setLoading(false);
    }
  };

  const callPaymentConfirm = async () => {
    setModalLoader(true);
    let type;
    if (selectedId === 1) {
      type = 'Wallet';
    } else if (selectedId === 2) {
      type = 'BankAccount';
    } else {
      type = 'Card';
    }
    console.log(selectedCard);
    // {"PIN": "120", "currentCard": "ICICI", "currentCardNo": "8001 1444 5544 5555", "expiryNo": "09/21", "id": 1, "type": "regular"}
    if (selectedCard.type === 'new') {
      goTocard();
      setModalLoader(false);
    } else {
      try {
        const {data} = await DepositServices.ProductpaymentInfoConfirm(
          datas.hasval,
          type,
          type === 'Card' ? true : false,
          type === 'Card' ? selectedCard.id : '',
        );
        const d = await AuthService.tempData(data);
        if (typeof d === 'object') {
          console.log('DATA', d);
          setShowSuccessModalMessage(d.message);
          setShowConfirmModal(false), setShowSuccessModal(true);
        } else {
          setShowConfirmModal(false), setErrorModal(true);
          seterrorModalMsg(d);
          setModalLoader(false);
        }
      } catch (error) {
        checkNet();
      } finally {
        setModalLoader(false);
      }
    }
  };

  // Constants

  const renderCenterTreeView = () => {
    return (
      <ImageBackground
        source={require('../../assets/big_tree.png')}
        style={styles.treeImageView}
        resizeMode="contain">
        <View
          style={{
            // backgroundColor: 'red',
            // height: normalize(90, 'height'),
            width: normalize(218, 'width'),
          }}>
          <View style={Globalstyles.centerRowAlign}>
            <Text style={texts.lighttext14black}>{datas.product_title}</Text>
            <Text style={texts.lightGree18}>₦ {datas.savings}</Text>
          </View>

          <View style={Globalstyles.centerRowAlign}>
            <Text style={texts.lighttext10green}>{datas.percentage_title}</Text>
            <Text style={texts.lightRed10}>₦ {datas.expected}</Text>
          </View>

          <View style={Globalstyles.centerRowAlign}>
            <Text style={texts.lighttext10brown}>{datas.month_title}</Text>
            <Text style={texts.darkGreen10}>
              {datas.from_date} - {datas.to_date}
            </Text>
          </View>

          {/* <View>
            <Text style={texts.lightRed10}>₦ 54,500</Text>
          </View> */}
        </View>
      </ImageBackground>
    );
  };

  const cardView = (item, index) => {
    if (item.type === 'new') {
      return (
        <>
          <TouchableOpacity
            style={{marginTop: normalize(10, 'height')}}
            onPress={() => {
              setSelectedCardId(item.id),
                setSelectedCardType(item.type),
                setSelectedCard(item);
            }}>
            <View
              style={[
                Globalstyles.centerRow,
                styles.debitCardSubview,
                {
                  backgroundColor:
                    selectedCardId === item.id
                      ? Colors.backgroundLightGreen
                      : 'white',
                  borderWidth: 0.8,
                  borderColor: Colors.backgroundLightGreen,
                },
              ]}>
              {selectedCardId === item.id ? (
                <DebitCardRadioButtonActive />
              ) : (
                <DebitCardInactiveIcon />
              )}

              <Text
                style={[
                  texts.text15darkgreen,
                  {paddingLeft: normalize(15, 'width')},
                ]}>
                New Card
              </Text>
            </View>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <>
          <TouchableOpacity
            style={{marginTop: normalize(10, 'height')}}
            onPress={() => {
              setSelectedCardId(item.id),
                setSelectedCardType(item.type),
                setSelectedCard(item);
            }}>
            <View
              style={[
                Globalstyles.centerRow,
                styles.debitCardSubview,
                {
                  backgroundColor:
                    selectedCardId === item.id
                      ? Colors.backgroundLightGreen
                      : 'white',
                  borderWidth: 0.8,
                  borderColor: Colors.backgroundLightGreen,
                },
              ]}>
              {selectedCardId === item.id ? (
                <DebitCardRadioButtonActive />
              ) : (
                <DebitCardInactiveIcon />
              )}

              <Text
                style={[
                  texts.text15darkgreen,
                  {paddingLeft: normalize(15, 'width')},
                ]}>
                {item.currentCardNo}
              </Text>
            </View>
          </TouchableOpacity>
        </>
      );
    }
  };

  const renderView = (id, item) => {
    console.log(id);
    if (id === 1) {
      return (
        <WalletBalance
          style={{marginTop: normalize(10, 'height')}}
          balance={walletBalance}
        />
      );
    } else if (id === 2) {
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
                    onPress={() => copyToClipboard(bankAccount.account_number)}
                    style={{marginLeft: '2%'}}>
                    <CopyIcon />
                  </TouchableOpacity>
                </View>
              </>
            )}
        </View>
      );
    } else if (id === 3) {
      return item.card.map((item, index) => cardView(item, index));
    } else {
      return <></>;
    }
  };

  function returnPlanMsg(id) {
    if (id == '1') {
      return `Breaking your investment will attract a penalty fee. Your investment can’t be broken until after 45 days from intiating this plan.`;
    } else if (id == '2') {
      return `Your funds are locked until the due date.`;
    } else if (id == '3') {
      return `Interest is credited into your wallet upfront. Your funds are locked until the due date.`;
    } else {
      return `Your funds are locked until the due date.`;
    }
  }

  function returnSuccessMessage(id) {
    if (id == '1') {
      return `Your Mango account has been funded. Keep your money growing!`;
    } else if (id == '2') {
      return `Your Almond account has been funded. Keep your money growing!`;
    } else if (id == '3') {
      return `Your Iroko account has been funded. Keep your money growing!`;
    } else {
      return `Your Obeche account has been funded. Keep your money growing!`;
    }
  }

  const renderTransferOptions = (item, index) => {
    return (
      <>
        <FundTansfer
          id={item.id}
          onPress={() => setSelectedId(item.id)}
          selected={selectedId === item.id}
          type={item.type}
          desc={item.desc}
          renderSelectedView={
            selectedId === item.id && renderView(selectedId, item)
          }
          selectedId={selectedId}
        />
      </>
    );
  };

  console.log(returnPlanMsg(treeObj.plan_id));
  // Main
  return (
    <Layout loading={loading} needToHideView>
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title={`${datas.title}`}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`${datas.tag_line}\n`}
      />
      <View style={Globalstyles.smallGap22} />
      {renderCenterTreeView()}
      <View style={Globalstyles.tinyGap} />

      {transferOptions.map((item, index) => renderTransferOptions(item, index))}

      <View style={Globalstyles.bigGap73} />
      <Button
        title={'Continue'}
        disabled={
          selectedId === null || selectedId === 3
            ? isEmpty(selectedCard)
            : false
        }
        nobold
        onPress={() => {
          handleContinue(selectedId, selectedCardType);
        }}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        nobold
        linkText={'Cancel'}
        backgroundColor={'white'}
        onPress={goBack}></InactiveButton>
      {/* {showConfirmModal && ( */}
      <ConfirmationModal
        amt={`${datas.savings}`}
        duration={`\n${datas.month_title}`}
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        confirmPress={() => {
          callPaymentConfirm();
        }}
        loader={modalLoader}
        darktext14gray={returnPlanMsg(treeObj.plan_id)}
      />

      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        continuePress={goToHome}
        text={
          successModalMessage === ''
            ? returnSuccessMessage(treeObj.plan_id)
            : successModalMessage
        }
      />

      {<LoadModal visible={Object.keys(datas).length === 0} />}
      {/* <ErrorModal
        visible={errorModal}
        onRequestClose={async () => {
          setErrorModal(false),
            errorModalMsg === 'Login session timout'
              ? AuthService.sessionTimeOut()
              : {};
        }}
        text={`${errorModalMsg}`}
      /> */}

      {/* )} */}

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

export default TreeInvest;
