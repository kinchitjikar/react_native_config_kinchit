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

const ViewMoreTransactions: React.FC<Props> = props => {
  //States
  const [datas, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');

  const [recentTransaction, setRecentTranscation] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMoreButton, setShowMoreButton] = useState(true);

  //Helpers

  useEffect(() => {
    getMonieHarvestDashboard(currentPage);
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     getMonieHarvestDashboard(currentPage);
  //   }, []),
  // );

  const getMonieHarvestDashboard = useCallback(
    async currentPage => {
      if (datas.total_pages === undefined) {
        setShowMoreButton(true);
        try {
          const {data} = await MonieHarvestServices.GetmonieharvestRecords(
            currentPage,
          );
          const d = await AuthService.tempData(data);
          if (typeof d === 'object') {
            if (currentPage === 1) {
              await setData(d.data[0]);
              await setRecentTranscation(d.data[0].records);
            } else {
              const arr3 = recentTransaction.concat(d.data[0].records);
              await setRecentTranscation(arr3);
              // await setRecentTranscation([...recentTransaction, d.data[0].records]);
            }
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
      } else {
        if (currentPage <= datas.total_pages) {
          try {
            const {data} = await MonieHarvestServices.GetmonieharvestRecords(
              currentPage,
            );
            const d = await AuthService.tempData(data);
            if (typeof d === 'object') {
              if (currentPage === 1) {
                await setData(d.data[0]);
                await setRecentTranscation(d.data[0].records);
              } else {
                const arr3 = recentTransaction.concat(d.data[0].records);
                await setRecentTranscation(arr3);
                // await setRecentTranscation([...recentTransaction, d.data[0].records]);
              }
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
        } else {
          setShowMoreButton(false);
        }
      }
    },
    [recentTransaction, currentPage, showMoreButton],
  );

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  // api calls

  // Constants

  const renderTransactionItems = useCallback((item, index) => {
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
          <Text style={texts.text13normalLightgray}>{`₦ ${item.balance}`}</Text>
        </View>

        <View style={styles.transactionBorder} />
        <View style={styles.transactionRows}>
          <Text style={texts.text11gray}>{item.date}</Text>
        </View>
      </View>
    );
  }, []);

  const renderTransactionView = () => {
    return (
      <>
        <View style={Globalstyles.centerRowAlign}>
          <Text style={texts.darkText17}>Transactions</Text>
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

      <View style={Globalstyles.widthView}>{renderTransactionView()}</View>
      <View style={Globalstyles.smallGap} />
      {showMoreButton && (
        <InactiveButton
          nobold
          linkText={'View More'}
          backgroundColor={'white'}
          onPress={async () => {
            await setCurrentPage(currentPage + 1);
            await getMonieHarvestDashboard(currentPage + 1);
          }}
        />
      )}
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

export default ViewMoreTransactions;
