import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  // ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Platform,
  ImageBackground,
  FlatList,
} from 'react-native';
import {
  GraphIcon,
  InvestmentAdviceIcon,
  LogoIcon,
  MonieHarvestIcon,
  MonieTreeIcon,
  NoSavingsIcon,
} from '../../assets/svgs';
import {
  Button,
  InactiveButton,
  Layout,
  TreeList,
  WrapLayout,
  ErrorModal,
  TreeLargeList,
  WalletView,
  SavingsWalletView,
  PromotionalView,
} from '../../components';
import InputBox from '../../components/InputBox';
import Navbar from '../../components/Navbar';
import {Colors, DEVICE_WIDTH} from '../../constants';
import AuthService from '../../services/authServices';
import DashboardService from '../../services/dashboardServices';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import styles from './styles';
import {
  PanGestureHandler,
  State,
  ScrollView,
} from 'react-native-gesture-handler';
// import normalize from '../../styles/normalize';
import {useFocusEffect} from '@react-navigation/native';
import {checkInterNet, internetText} from '../../services/constant';

type Props = {};

const PromotionData = [
  {
    text: 'MonieHarvest',
    desc: '',
    svgIcon: <MonieHarvestIcon />,
    amt: '₦ 6,001',
    id: 1,
    heading: 'Wallet',
  },
  {
    text: 'MonieTree',
    desc: '',
    svgIcon: <MonieTreeIcon width={normalize(170, 'width')} />,
    amt: '₦ 40,000',
    id: 2,
    heading: 'Investment',
  },
];

const Savings: React.FC<Props> = props => {
  //States
  const [datas, setData] = useState({});
  const [trees, setTress] = useState([]);
  const [myTree, setMyTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noUserTree, setNoUserTree] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  //Helpers
  // useEffect(() => {
  //   callMonietree();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      callMonietree();
    }, []),
  );

  const goToTree = data => {
    props.navigation.navigate('TreePayment', {data: data});
  };
  const goToMonieTree = () => props.navigation.navigate('MonieTreeSavings');
  const goToMonieHarvest = () => props.navigation.navigate('MonieHarvest');
  const gotToCeritificate = data => {
    props.navigation.navigate('Certificates', {data: data});
  };
  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  // api calls
  const callMonietree = async () => {
    try {
      const {data} = await DashboardService.GetSavingsMonietree();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d.data[0]);
        setData(d.data[0]);
        setTress(d.data[0].savings_plans);
        setMyTree(d.data[0].my_trees);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      checkNet();
    } finally {
      setLoading(false);
    }
  };
  // Constants

  const renderMonietreeView = () => {
    return (
      <TouchableOpacity style={styles.promotionalView} onPress={() => {}}>
        <View>
          <Text style={texts.lightText18}>
            Monie<Text style={{color: Colors.darkText}}>Tree</Text>
          </Text>

          <Text style={texts.lightText29}>₦ {datas.total_savings}</Text>
        </View>
        <View
          style={{
            bottom: normalize(0.8, 'height'),
            position: 'absolute',
            right: 0,
          }}>
          <MonieTreeIcon
            width={normalize(184, 'width')}
            height={normalize(88, 'height')}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderGraphView = () => {
    return (
      <View
        style={{
          width: normalize(330, 'width'),
          height: normalize(88.32, 'height'),
          flexDirection: 'row',
        }}>
        <GraphIcon />
        <Text style={texts.text13lightgray}>
          {
            'Our range of longterm savings options are designed to \nget you the most returns in the market. Explore the \ndifferent types of trees and begin to grow your money \ntoday.'
          }
        </Text>
      </View>
    );
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
  const renderTreeView = () => {
    return (
      <WrapLayout>
        {trees.map((item, index) => renderTreeData(item, index))}
      </WrapLayout>
    );
  };

  const renderBottomView = () => {
    setTimeout(() => {});
    return (
      <View
        style={{
          bottom: 0,
          width: DEVICE_WIDTH,
          height: normalize(231, 'height'),
          backgroundColor: '#F6FFF2',
        }}>
        <Text style={texts.darkText18green}>My Trees</Text>
        {myTree.length === 0 && <View style={Globalstyles.smallGap} />}
        {myTree.length === 0 && (
          <>
            <Text style={texts.text11mediumgreen}>
              {
                'You currently have no savings...you should \nplant some money and watch it grow!'
              }
            </Text>
            <View style={{alignSelf: 'center'}}>
              <NoSavingsIcon />
            </View>
          </>
        )}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          {myTree.length !== 0 &&
            myTree.map(item => renderCenterTreeView(item))}
          {/* <FlatList
          data={myTree}
          renderItem={(item, index) => {
            renderCenterTreeView(item, index);
          }}
        /> */}
        </ScrollView>
      </View>
    );
  };

  const renderCenterTreeView = item => {
    return (
      <TreeLargeList
        item={item}
        onPress={() => {
          gotToCeritificate(item);
        }}
      />
    );
  };

  const renderPromotionView = (item, index) => {
    return (
      <>
        {index !== 0 && <View style={Globalstyles.tiny20Gap} />}
        <View style={Globalstyles.widthView}>
          <Text style={[texts.LatonormalGrayText15, {alignSelf: 'flex-start'}]}>
            {item.heading}
          </Text>
          <View style={Globalstyles.textInputGap} />
          <TouchableOpacity
            style={styles.promotionalView}
            onPress={() =>
              index === 1 ? goToMonieTree() : goToMonieHarvest()
            }>
            <View>
              <Text style={texts.darkText15}>{item.text}</Text>
              <Text style={texts.text26greenbold}>
                {index === 0
                  ? `₦ ${datas.wallet_monieharvest_amount}`
                  : `₦ ${datas.long_term_savings_amount}`}
              </Text>
            </View>
            <View
              style={{
                bottom: normalize(0.8, 'height'),
                position: 'absolute',
                right: 10,
              }}>
              {item.svgIcon}
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  // Main
  return (
    <Layout
      noBottomPad
      loading={loading}
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
        title="Savings"
        textOnLeft
        // leftIcon="darkClose"
        navigation={props.navigation}
      />
      {/* <View style={Globalstyles.tinyGap} />
      {renderMonietreeView()}
      <View style={Globalstyles.smallGap} />
      {renderGraphView()} */}
      {/* <View style={Globalstyles.widthView}>
        <Text style={texts.darkText17}>Investment Tree Plans</Text>
      </View>
      {renderTreeView()} */}

      <SavingsWalletView amt={`${datas.total_balance}`} />
      <View style={Globalstyles.smallGap} />
      {PromotionData.map((item, index) => renderPromotionView(item, index))}
      <View style={Globalstyles.bigGap47} />
      {renderBottomView()}
    </Layout>
  );
};

export default Savings;
