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
import {navigate} from '../../../navigation.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MonieHarvestServices from '../../services/monieHarvest';

const PromotionData = [
  {
    text: '',
    desc: 'Your MonieHarvest account is your\nvirtual wallet. It serves you just like a\nregular bank account would.',
    svgIcon: (
      <MonieHarvestIcon
        width={normalize(165, 'width')}
        height={normalize(90, 'height')}
      />
    ),
    id: 1,
  },
];

const transactionData = [
  {
    title: 'Interest',
    amt: '+ ₦ 6,600',
    balance: '₦ 10,000',
    date: '1 Jan, 2021 18:00 GMT+1',
  },
  {
    title: 'Withdrawal',
    amt: '- ₦ 6,600',
    balance: '₦ 4,400',
    date: '1 Jan, 2021 18:00 GMT+1',
  },
  {
    title: 'Deposit',
    amt: '+ ₦ 6,600',
    balance: '₦ 10,000',
    date: '1 Jan, 2021 18:00 GMT+1',
  },
  {
    title: 'Interest',
    amt: '+ ₦ 6,600',
    balance: '₦ 10,000',
    date: '1 Jan, 2021 18:00 GMT+1',
  },
  {
    title: 'Withdrawal',
    amt: '- ₦ 6,600',
    balance: '₦ 4,400',
    date: '1 Jan, 2021 18:00 GMT+1',
  },
  {
    title: 'Deposit',
    amt: '+ ₦ 6,600',
    balance: '₦ 10,000',
    date: '1 Jan, 2021 18:00 GMT+1',
  },
  {
    title: 'Interest',
    amt: '+ ₦ 6,600',
    balance: '₦ 10,000',
    date: '1 Jan, 2021 18:00 GMT+1',
  },
  {
    title: 'Withdrawal',
    amt: '- ₦ 6,600',
    balance: '₦ 4,400',
    date: '1 Jan, 2021 18:00 GMT+1',
  },
  {
    title: 'Deposit',
    amt: '+ ₦ 6,600',
    balance: '₦ 10,000',
    date: '1 Jan, 2021 18:00 GMT+1',
  },
  {
    title: 'Interest',
    amt: '+ ₦ 6,600',
    balance: '₦ 10,000',
    date: '1 Jan, 2021 18:00 GMT+1',
  },
  {
    title: 'Withdrawal',
    amt: '- ₦ 6,600',
    balance: '₦ 4,400',
    date: '1 Jan, 2021 18:00 GMT+1',
  },
  {
    title: 'Deposit',
    amt: '+ ₦ 6,600',
    balance: '₦ 10,000',
    date: '1 Jan, 2021 18:00 GMT+1',
  },
];

const MonieHarvest: React.FC<Props> = props => {
  //States
  const [datas, setData] = useState({});
  const [trees, setTress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noUserTree, setNoUserTree] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [pinExists, setPinExists] = useState(false);
  const [recentTransaction, setRecentTranscation] = useState([]);

  //Helpers
  const gotoMore = () => props.navigation.navigate('ViewMoreTransactions');
  // useEffect(() => {
  //   checkPinExists();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      checkPinExists();
      getMonieHarvestDashboard();
    }, []),
  );

  const getMonieHarvestDashboard = async () => {
    try {
      const {data} = await MonieHarvestServices.GetmonieharvestDashboard();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d.data[0]);
        await setData(d.data[0]);
        await setRecentTranscation(d.data[0].recent_transaction);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('GetmonieharvestDashboard call error');
      checkNet();
    } finally {
      setLoading(false);
    }
  };

  const checkPinExists = async () => {
    const pin = await AsyncStorage.getItem('pin');
    console.log('This is pin', pin);
    if (pin !== null) {
      setPinExists(true);
    } else {
      setPinExists(false);
    }
  };
  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  // api calls
  const copyToClipboard = text => {
    Clipboard.setString(text);
    Alert.alert('Copied');
  };

  // Constants
  const renderPromotionData = (item, index, indexNumber) => {
    if (index === indexNumber) {
      return (
        <>
          <PromotionalView disabledText item={item} indexNumber={indexNumber} />
        </>
      );
    }
  };

  const renderUpdateProfile = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={() => navigate('CreateTransactionPin', {fromHarvest: true})}
        style={styles.tempView}>
        <View
          style={[
            Globalstyles.centerRow,
            {justifyContent: 'space-around', width: '100%'},
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <UpdateProfileIcon
              height={normalize(47, 'height')}
              width={normalize(42, 'width')}
            />
            <View style={{paddingLeft: '3%', paddingBottom: '2%'}}>
              <Text style={texts.lightText17}>
                {pinExists
                  ? `Update Transaction PIN`
                  : `Create Transaction PIN`}
              </Text>
              <Text style={texts.lighttext13gray}>
                {pinExists
                  ? `You need an use PIN to withdraw funds`
                  : `You need an active PIN to withdraw funds`}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <NextArrowGreenIcon
              height={normalize(15, 'height')}
              width={normalize(9, 'width')}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }, [pinExists]);

  const bankView = useCallback(() => {
    return (
      <View style={[Globalstyles.row, Globalstyles.widthView]}>
        <HarvestBankIcon />
        <View style={{marginLeft: '2%'}}>
          <Text style={texts.text15gray}>Providus Bank</Text>
          <View style={[Globalstyles.centerRow]}>
            <Text style={texts.text13green}>8022412466</Text>
            <TouchableOpacity
              onPress={() => copyToClipboard('8022412466')}
              style={{marginLeft: 5}}>
              <CopyIcon />
            </TouchableOpacity>
          </View>
          <View style={Globalstyles.tinyGap} />
          <View style={{width: '96%'}}>
            <Text style={[texts.lightGray13, {paddingLeft: 0}]}>
              {
                'Send & receive money from other bank accounts and other MonieTree users. Fund your savings, investments,and make online purchases!'
              }
            </Text>
          </View>
        </View>
      </View>
    );
  }, []);

  const renderTransactionItems = useCallback((item, index) => {
    if (index <= 2) {
      return (
        <View
          style={[
            styles.transactionContainer,
            {
              marginTop: index === 0 ? 0 : '2%',
            },
          ]}>
          <View style={styles.transactionRows}>
            <Text style={texts.text15gray}>{item.title}</Text>
            <Text
              style={[
                texts.maingreenText17,
                {color: item.type === 'dr' ? Colors.red : Colors.mainBgColor},
              ]}>
              {item.type === 'dr' ? `- ₦ ${item.amount}` : `+ ₦ ${item.amount}`}
            </Text>
          </View>
          <View style={styles.transactionRows}>
            <Text style={texts.text13normalLightgray}>Balance</Text>
            <Text
              style={texts.text13normalLightgray}>{`₦ ${item.balance}`}</Text>
          </View>

          <View style={styles.transactionBorder} />
          <View style={styles.transactionRows}>
            <Text style={texts.text11gray}>{item.date}</Text>
          </View>
        </View>
      );
    }
  }, []);

  const renderTransactionView = () => {
    return (
      <>
        <View style={Globalstyles.centerRowAlign}>
          <Text style={texts.darkText17}>Recent Transactions</Text>
          <TouchableOpacity onPress={gotoMore}>
            <Text style={texts.yellowText13}>View More</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={Globalstyles.tiny20Gap} />
          {recentTransaction.map((item, index) =>
            renderTransactionItems(item, index),
          )}
        </View>
      </>
    );
  };

  // Main
  return (
    <Layout loading={loading} needToHideView>
      {/* {loading && <LoadModal />} */}
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title="Monie"
        linkText={'Harvest'}
        leftIcon="darkClose"
        navigation={props.navigation}
      />
      {PromotionData.map((item, index) => renderPromotionData(item, index, 0))}

      <View style={Globalstyles.smallGap} />
      <View>
        <Text style={texts.text13gray}>Available Balance</Text>
        <Text style={texts.text33greenboldheading}>
          ₦ {datas.available_balance}
        </Text>
      </View>
      <View style={Globalstyles.tiny20Gap} />
      <View style={[Globalstyles.centerRowAlign, Globalstyles.widthView]}>
        <Button
          title={'Fund Wallet'}
          height={55}
          width={normalize(160, 'width')}
          onPress={
            () => navigate('FundwalletInitialScreen', {fromHome: false})
          }></Button>
        <View style={Globalstyles.tinyGap} />
        <InactiveButton
          nobold
          linkText={'Transfer Fund'}
          backgroundColor={'white'}
          width={normalize(160, 'width')}
          height={55}
          onPress={() =>
            navigate('TransferFund', {fromHome: false})
          }></InactiveButton>
      </View>
      <View style={Globalstyles.tiny20Gap} />
      {bankView()}
      <View style={Globalstyles.smallGap} />
      {renderUpdateProfile()}
      <View style={Globalstyles.smallGap} />
      <View style={Globalstyles.widthView}>{renderTransactionView()}</View>
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

export default MonieHarvest;
