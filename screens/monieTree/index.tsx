import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import {
  GraphIcon,
  InvestmentAdviceIcon,
  LogoIcon,
  MonieTreeIcon,
  NoSavingsIcon,
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
  TreeLargeList,
} from '../../components';
import InputBox from '../../components/InputBox';
import Navbar from '../../components/Navbar';
import {DEVICE_WIDTH} from '../../constants';
import AuthService from '../../services/authServices';
import DashboardService from '../../services/dashboardServices';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
// import normalize from '../../styles/normalize';
import {useFocusEffect} from '@react-navigation/native';
import {checkInterNet, internetText} from '../../services/constant';
import {
  PanGestureHandler,
  State,
  ScrollView,
} from 'react-native-gesture-handler';
const treeData2 = [
  {treeText: 'Iroko Tree', percent: '9% annually', months: '6 months', id: 1},
  {
    treeText: 'Obeche Tree',
    percent: '10% annually',
    months: '12 months',
    id: 2,
  },
];
const PromotionData = [
  {
    text: '',
    desc: 'Select a longterm savings plan, fund it \nand watch your money grow. Let your \nmoney work for you!',
    svgIcon: (
      <MonieTreeIcon
        width={normalize(150, 'width')}
        height={normalize(70, 'height')}
      />
    ),
    id: 1,
  },
  {
    text: 'Investment Advice',
    desc: 'Request a certificate to show \nproof of your money saved here.',
    svgIcon: <InvestmentAdviceIcon />,
    id: 2,
  },
];
const MonieTree: React.FC<Props> = props => {
  //States
  const [datas, setData] = useState({});
  const [trees, setTress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noUserTree, setNoUserTree] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [myTree, setMyTree] = useState([]);

  //Helpers

  // useEffect(() => {
  //   callMonietree();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      callMonietree();
      callMyTree();
    }, []),
  );

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  // api calls
  const callMonietree = async () => {
    try {
      const {data} = await DashboardService.Getmonietree();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d.data[0]);
        setData(d.data[0]);
        setTress(d.data[0].trees);
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

  const callMyTree = async () => {
    try {
      const {data} = await DashboardService.GetSavingsMonietree();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d.data[0]);
        setMyTree(d.data[0].my_trees);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      checkNet();
    } finally {
      // setLoading(false);
    }
  };

  // Constants
  const goToTree = data => {
    props.navigation.navigate('TreePayment', {data: data});
  };

  const renderPromotionData = (item, index, indexNumber) => {
    if (index === indexNumber) {
      return (
        <>
          <PromotionalView disabledText item={item} indexNumber={indexNumber} />
        </>
      );
    }
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
  const gotToCeritificate = data => {
    props.navigation.navigate('Certificates', {data: data});
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

  const renderBottomView = () => {
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
      {/* {loading && <LoadModal />} */}
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title="Monie"
        linkText={'Tree'}
        leftIcon="darkClose"
        navigation={props.navigation}
      />
      {PromotionData.map((item, index) => renderPromotionData(item, index, 0))}

      <View style={Globalstyles.smallGap25} />
      <Text style={texts.text13gray}>Total Balance</Text>
      <Text style={texts.title36green}>₦ {datas.total_balance}</Text>
      <View style={Globalstyles.smallGap25} />
      {renderGraphView()}
      <View style={Globalstyles.widthView}>
        <Text style={texts.darkText17}>Investment Tree Plans</Text>
      </View>
      {renderTreeView()}
      <View style={Globalstyles.bigGap47} />
      {renderBottomView()}
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
    </Layout>
  );
};

export default MonieTree;
