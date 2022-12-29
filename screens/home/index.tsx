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
  BackHandler,
} from 'react-native';
import {
  InvestmentAdviceIcon,
  LetsGetStartedIcon,
  LogoIcon,
  MonieFruitsIcon,
  MonieSeedsIcon,
  MonieTreeIcon,
  ReferAndEarnIcon,
} from '../../assets/svgs';
import {
  Button,
  InactiveButton,
  Layout,
  LoadModal,
  PromotionalView,
  SuccessModal,
  TreeList,
  WalletView,
  WrapLayout,
  ErrorModal,
} from '../../components';
import InputBox from '../../components/InputBox';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import {
  NotificationIcon,
  UserIcon,
  UpdateProfileIcon,
  NextArrowGreenIcon,
} from '../../assets/svgs';
import styles from '../home/styles';
import LinearGradient from 'react-native-linear-gradient';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardService from '../../services/dashboardServices';
import AuthService from '../../services/authServices';
import {useFocusEffect} from '@react-navigation/native';
import {checkInterNet, internetText} from '../../services/constant';
import {Colors} from '../../constants';
import {goBack, navigate} from '../../../navigation.service';

// import normalize from '../../styles/normalize';
const imgSize = 39.74;

const monieTabs = [
  // {
  //   text: 'MonieSeeds',
  //   backgroundColor: '#DEEFAD',
  //   money: '₦0',
  //   textColor: '#7D8738',
  //   id: 1,
  // },
  {
    text: 'MonieTree',
    backgroundColor: '#F7D3BA',
    money: '₦0',
    textColor: '#864F28',
    id: 1,
  },
  // {
  //   text: 'MonieFruits',
  //   backgroundColor: '#B8E9EC',
  //   money: '₦0',
  //   textColor: '#328388',
  //   id: 3,
  // },
];

const PromotionData = [
  // {
  //   text: 'MonieSeeds',
  //   desc: '8% pa on your savings',
  //   svgIcon: <MonieSeedsIcon />,
  //   id: 1,
  // },
  {
    text: 'MonieTree',
    desc: 'Save for the long term \nand earn up to 25% pa',
    svgIcon: <MonieTreeIcon width={normalize(170, 'width')} />,
    id: 1,
  },
  {
    text: 'Investment Advice',
    desc: 'Request a certificate to show \nproof of your money saved here.',
    svgIcon: <InvestmentAdviceIcon />,
    id: 2,
  },
  // {
  //   text: 'Refer & Earn',
  //   desc: 'Earn up to N1000',
  //   svgIcon: <ReferAndEarnIcon width={normalize(198, 'width')} />,
  //   id: 4,
  // },
];

const treeData2 = [
  {treeText: 'Iroko Tree', percent: '9% annually', months: '6 months', id: 1},
  {
    treeText: 'Obeche Tree',
    percent: '10% annually',
    months: '12 months',
    id: 2,
  },
];

const treeData = [
  {treeText: 'Iroko Tree', percent: '9% annually', months: '6 months', id: 1},
  {
    treeText: 'Obeche Tree',
    percent: '10% annually',
    months: '12 months',
    id: 2,
  },
  {treeText: 'Product Tree', percent: '9% annually', months: '6 months', id: 3},
  {treeText: 'Product Tree', percent: '9% annually', months: '6 months', id: 4},
];

const Home: React.FC<Props> = props => {
  //States
  const [hideBase, setHideBase] = useState(false);
  const [datas, setData] = useState({});
  const [savingPlans, settopSavingPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [isProfileReady, setIsProfileReady] = useState(false);

  //Helpers
  const goToMonieTree = () => props.navigation.navigate('MonieTree');
  const goToTree = data => {
    props.navigation.navigate('TreePayment', {data: data});
  };

  const checkNav = async () => {
    const g = await AsyncStorage.getItem('fromLogin');
    const token = await AsyncStorage.getItem('api_token');
    const isSignupAlreadyCall = await AsyncStorage.getItem(
      'isSignUpAlreadyCall',
    );
    console.log(isSignupAlreadyCall);
    if (g === 'fromLogin') {
      await callDashboardSignin();
      setHideBase(true);
    } else if (isSignupAlreadyCall === null) {
      await callDashboardSignup();
      setHideBase(false);
    } else {
      await callDashboardSignin();
      setHideBase(true);
    }
  };

  // api calls
  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const callDashboardSignup = async () => {
    try {
      const {data} = await DashboardService.Getsignupdashboard();
      const d = await AuthService.tempData(data);
      await AsyncStorage.setItem('isSignUpAlreadyCall', 'a');
      if (typeof d === 'object') {
        await setData(d.data[0]);
        await settopSavingPlans(d.data[0].top_savings_plans);
        await AsyncStorage.setItem('WalletBalance', d.data[0].wallet_balance);
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

  const callDashboardSignin = async () => {
    try {
      const {data} = await DashboardService.Getsignindashboard();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d.data[0]);
        await setData(d.data[0]);
        await settopSavingPlans(d.data[0].top_savings_plans);
        await AsyncStorage.setItem('WalletBalance', d.data[0].wallet_balance);
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

  const requestInvestment = async () => {
    setLoading(true);
    try {
      const {data} = await DashboardService.RequestInvestmentCertificate();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        setShowSuccessModal(true);
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

  const handleUpdateProfile = async () => {
    console.log(datas.user_info);
    if (datas.user_info.is_basic_info_updated == '0') {
      navigate('BasicInfo', {datas: datas.user_info});
    } else if (datas.user_info.is_bvn_used == '0') {
      await navigate('Basicinfo_bvn', {datas: datas.user_info});
    } else if (datas.user_info.is_bank_added == '0') {
      await navigate('BankDetails', {fromHome: true});
    } else if (
      datas.user_info.is_basic_info_updated == '1' &&
      datas.user_info.is_bvn_used == '1'
    ) {
      await navigate('BankDetails', {fromHome: true});
    } else if (
      datas.user_info.is_bvn_used == '1' &&
      datas.user_info.is_bank_added == '1'
    ) {
      await navigate('BasicInfo', {datas: datas.user_info});
    }
  };

  // useEffect(() => {

  //   checkNav();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: async () => {
              await AsyncStorage.clear().then(() => {
                BackHandler.exitApp();
              });
            },
          },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      checkNav();
      return () => backHandler.remove();
    }, []),
  );

  // Constants

  const renderProfileBar = () => {
    return (
      <View
        style={{
          width: normalize(330, 'width'),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{
              uri: datas.user_info.profile_photo_url,
            }}
            style={{height: imgSize, width: imgSize, borderRadius: imgSize / 2}}
          />
          <View style={{paddingLeft: '3%', paddingBottom: '2%'}}>
            <Text style={texts.title23green}>
              {datas.user_info.first_name !== '' ||
              datas.user_info.first_name !== null
                ? `Hi ${datas.user_info.first_name}!`
                : datas.name_title}
            </Text>
            <Text style={texts.darkText12}>{datas.name_tag_line}</Text>
          </View>
        </View>
        {/* <TouchableOpacity>
          <NotificationIcon />
        </TouchableOpacity> */}
      </View>
    );
  };

  const renderWalletView = () => {
    return (
      <WalletView
        leftButtonText={'Fund your Wallet'}
        rightbuttonText={'Transfer Fund'}
        amt={`${datas.total_balance !== undefined ? datas.total_balance : ''}`}
        onLeftPress={() =>
          navigate('FundwalletInitialScreen', {fromHome: true})
        }
        onRightPress={() => navigate('TransferFund', {fromHome: true})}
        
      />
    );
  };

  const renderMonieTabs = (item, index) => {
    return (
      <TouchableOpacity
        style={[
          styles.monieTabStyle,
          {
            backgroundColor: item.backgroundColor,
            marginHorizontal: index === 1 ? normalize(12, 'width') : 0,
          },
        ]}
        key={item.id}>
        <Text style={[texts.darkText10, {color: item.textColor}]}>
          {item.text}
        </Text>
        <View style={{height: normalize(5, 'height')}} />
        <Text
          style={[texts.darkText18, {color: item.textColor, lineHeight: 20}]}
          numberOfLines={1}>
          {`₦ ${datas.savings_balance}`}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderUpdateProfile = () => {
    return (
      <TouchableOpacity style={styles.updateProfileView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <UpdateProfileIcon
            height={normalize(47, 'height')}
            width={normalize(42, 'width')}
          />
          <View style={{paddingLeft: '3%', paddingBottom: '2%'}}>
            <Text style={texts.lightText17}>Update your Profile</Text>
            <Text style={texts.lighttext13gray}>
              Activate the full benefits of MonieTree
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <NextArrowGreenIcon
            height={normalize(15, 'height')}
            width={normalize(9, 'width')}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderPromotionData = (item, index, indexNumber) => {
    if (index === 0) {
      item.desc = datas ? datas.monie_tree_short_tag : item.desc;
    }

    if (index === indexNumber) {
      return (
        <PromotionalView
          onPress={indexNumber === 0 ? goToMonieTree : requestInvestment}
          item={item}
          indexNumber={indexNumber}
        />
      );
    }
  };

  const renderTreeData = (item, index) => {
    return (
      <TreeList
        item={item}
        treeText={item.product_title}
        percent={item.percentage_title}
        months={item.month_title}
        onPress={() => {
          goToTree(item);
        }}
      />
    );
  };

  const getStartedView = () => {
    return (
      <View style={styles.getStartedBox}>
        <Text style={[texts.darktext20green]}>Let’s get you started</Text>
        <Text style={texts.lighttext13greenlineHeight20}>
          {
            'Start earning money on your saving right away \nwith just a few steps'
          }
        </Text>

        <View style={{paddingLeft: normalize(17, 'width')}}>
          <LetsGetStartedIcon
            height={normalize(131.27, 'height')}
            width={normalize(221.94, 'width')}
          />
        </View>

        <View style={Globalstyles.smallGap25} />

        <Button
          width={normalize(276, 'width')}
          title={'Get Started'}
          // onPress={() => setHideBase(true)}
          onPress={goToMonieTree}></Button>
      </View>
    );
  };

  const renderTreeView = hideBase => {
    return (
      <>
        <View style={Globalstyles.bigGap} />
        <View style={Globalstyles.widthView}>
          <Text style={texts.darkText17}>Top Plans</Text>
        </View>

        <WrapLayout>
          {savingPlans.map((item, index) => renderTreeData(item, index))}
        </WrapLayout>

        {/* {!hideBase ? (
          <WrapLayout>
            {treeData2.map((item, index) => renderTreeData(item, index))}
          </WrapLayout>
        ) : (
          <View style={styles.wrapView}>
            {treeData.map((item, index) => renderTreeData(item, index))}
          </View>
        )} */}
      </>
    );
  };

  // Main

  if (loading) {
    return <LoadModal />;
  } else if (!hideBase) {
    return (
      <Layout
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
        {renderProfileBar()}
        <View style={Globalstyles.smallGap25} />
        {renderWalletView()}

        <>
          <View style={Globalstyles.bigGap42} />
          {getStartedView()}
          {renderTreeView(hideBase)}
        </>
        {/* {loading && <LoadModal />} */}
      </Layout>
    );
  } else {
    return (
      <Layout
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
        {renderProfileBar()}
        <View style={Globalstyles.smallGap25} />
        {renderWalletView()}
        <View style={Globalstyles.tiny20Gap} />

        <>
          {datas.can_use_update_profile == '1' && (
            <View
              style={[
                // datas.can_use_update_profile == '1'
                //   ? Globalstyles.centerRowAlign
                //   :
                {alignSelf: 'center'},
                {width: normalize(283, 'width'), alignItems: 'center'},
              ]}>
              {/* {monieTabs.map((item, index) => renderMonieTabs(item, index))} */}

              <TouchableOpacity
                onPress={() => handleUpdateProfile()}
                style={styles.updateProfileView}>
                <View style={Globalstyles.centerRow}>
                  <Text style={styles.updateProfileText}>
                    Update your profile
                  </Text>
                  <View style={{left: normalize(8, 'width')}}>
                    <NextArrowGreenIcon />
                  </View>
                </View>
              </TouchableOpacity>

              <View style={Globalstyles.bigGap} />
            </View>
          )}

          <View style={Globalstyles.widthView}>
            <Text style={texts.darkText17}>Grow Your Money Today</Text>
          </View>

          {PromotionData.map((item, index) =>
            renderPromotionData(item, index, 0),
          )}

          {renderTreeView(hideBase)}

          {/* <View style={Globalstyles.smallGap25} />
          {PromotionData.map((item, index) =>
            renderPromotionData(item, index, 1),
          )} */}
        </>
        {/* <SuccessModal
          visible={showSuccessModal}
          onRequestClose={() => setShowSuccessModal(false)}
          continuePress={() => setShowSuccessModal(false)}
          text={`You will receive your investment \ncertificate on your registered email`}
        /> */}
        {<LoadModal visible={Object.keys(datas).length === 0} />}
      </Layout>
    );
  }
};

export default Home;
