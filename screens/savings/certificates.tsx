import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {TopUp} from '../../assets/svgs';
import {
  Navbar,
  Button,
  InactiveButton,
  InactiveRedButton,
  Layout,
  SuccessModal,
  ErrorModal,
  BreakSavingsModal,
  PromotionalView,
} from '../../components';
import {Colors, DEVICE_WIDTH} from '../../constants';
import AuthService from '../../services/authServices';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import styles from './styles';
import * as Progress from 'react-native-progress';
import DepositServices from '../../services/depositServices';
import {useFocusEffect} from '@react-navigation/native';
import {checkInterNet, internetText} from '../../services/constant';
import {InvestmentAdviceIcon} from '../../assets/svgs';
import {navigate} from '../../../navigation.service';

const PromotionData = [
  {
    text: 'Investment Advice',
    desc: 'Request a certificate to show \nproof of your money saved here.',
    svgIcon: <InvestmentAdviceIcon />,
    id: 2,
  },
];

type Props = {
  navigation?: any;
  route?: any;
};

const mango_tree_id = '1';

const Certificates: React.FC<Props> = props => {
  //States
  const [datas, setData] = useState({});
  const [trees, setTress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noUserTree, setNoUserTree] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [progress, setProgress] = useState(0.05);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [showSavingModal, setShowSavingModal] = useState(false);

  //Helpers

  // useEffect(() => {
  //   console.log(props.route.params.data.my_tree_id);
  //   getInvestmentData();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getInvestmentData();
    }, []),
  );

  // api calls

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const getInvestmentData = async () => {
    console.log(props.route.params.data.my_tree_id);
    try {
      const {data} = await DepositServices.GetInvestmentProduct(
        props.route.params.data.my_tree_id,
      );
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log('DATa', d.data[0]);
        setData(d.data[0]);
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

  const generateCertificate = async () => {
    try {
      const {data} = await DepositServices.Genratecertificate(
        props.route.params.data.my_tree_id,
      );
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        setShowSuccessModal(true);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      checkNet();
    } finally {
    }
  };

  const onPressConfirmBreakSaving = useCallback(() => {
    props.navigation.navigate('BreakOptions');
    setShowSavingModal(false);
  }, []);

  const onPressTopUpSaving = useCallback(() => {
    props.navigation.navigate('TopUpSaving', {
      data: props?.route?.params?.data,
    });
  }, []);

  // Constants

  const renderSavingAmount = () => {
    return (
      <View
        style={[
          Globalstyles.row,
          {
            // width: normalize(247, 'width'),
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <View style={{width: DEVICE_WIDTH}}>
          <Text style={[texts.text13gray]}>Saving Amount</Text>
          <Text style={[texts.lightText29, {textAlign: 'center'}]}>
            ₦ {datas.savings}
          </Text>

          <View
            style={[
              styles.ongoingView,
              {position: 'absolute', right: normalize(22.08, 'width'), top: 0},
            ]}>
            <Text style={texts.text11cyan}>Ongoing</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderProgressSection = () => {
    return (
      <>
        <View style={[Globalstyles.centerRowAlign, Globalstyles.widthView]}>
          <Text style={texts.text15grayAE}>
            <Text style={{fontWeight: '900'}}>Interest: </Text>
            <Text
              style={{color: Colors.darkYellow}}>{`+ ₦${datas.interest}`}</Text>
          </Text>
          <Text style={[texts.text15grayAE, {fontWeight: '900'}]}>
            Maturity:{' '}
            <Text style={{color: Colors.gray}}>{`+ ₦${datas.expected}`}</Text>
          </Text>
        </View>

        <View style={[Globalstyles.centerRowAlign, Globalstyles.widthView]}>
          <Progress.Bar
            progress={datas.graph_line / 100}
            width={normalize(305, 'width')}
            height={normalize(10, 'width')}
            color={'#74B570'}
            unfilledColor={'#DFF2D6'}
            borderWidth={0}
            borderRadius={4.416}
          />
          <Text style={texts.text15mediumgreen}>{datas.graph_line}%</Text>
        </View>
      </>
    );
  };

  const renderTopUpView = () => {
    return (
      <>
        <View
          style={{
            width: normalize(330, 'width'),
            height: normalize(88.32, 'height'),
            flexDirection: 'row',
          }}>
          <TopUp />
          <View>
            <Text style={[texts.text15lightgray]}>Top Up Your Savings</Text>
            <Text style={texts.text13lightgray}>
              {
                'Add money to your current plan without extending the \ninitial due date. The interest of your top up will be \ncalculated based on the days left.'
              }
            </Text>
          </View>
        </View>
        <View style={Globalstyles.tinyGap} />

        {datas.can_use_topup == '1' ? (
          <InactiveButton
            nobold
            linkText={'Top Up Savings'}
            backgroundColor={'white'}
            width={normalize(330, 'width')}
            onPress={onPressTopUpSaving}
          />
        ) : (
          <Button
            title={'Top Up Savings'}
            disabled={true}
            nobold
            onPress={() => {}}
          />
        )}
        
        {/* {datas.graph_line / Number(100) === 1 ? (
          <>
            {datas.can_use_topup && (
              <Button
                title={'Top Up Savings'}
                disabled={true}
                nobold
                onPress={() => {}}
              />
            )}
          </>
        ) : (
          <>
            {datas.can_use_topup && (
              <InactiveButton
                nobold
                linkText={'Top Up Savings'}
                backgroundColor={'white'}
                width={normalize(330, 'width')}
                onPress={onPressTopUpSaving}
              />
            )}
          </>
        )} */}
      </>
    );
  };

  // Main
  return (
    <Layout loading={loading} noBottomPad needToHideView>
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title={`${datas.product_title}`}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`${datas.percentage_title} in ${datas.month_title}`}
      />
      <View style={Globalstyles.smallGap} />
      {renderSavingAmount()}

      <View style={Globalstyles.tiny17Gap} />
      {renderProgressSection()}

      <View style={Globalstyles.bigGap} />
      <View style={[Globalstyles.centerRowAlignEven, {width: '100%'}]}>

        {datas.plan_id === mango_tree_id && datas.can_break_savings == '1' && (
          <InactiveRedButton
            title={'Break Savings'}
            width={normalize(160, 'width')}
            nobold
            onPress={() => {
              setShowSavingModal(true);
            }}
          />
        )}
       
        {datas.can_use_withdraw == '1' ? (
          <Button
            title={'Withdraw Savings'}
            disabled={false}
            width={
              datas.plan_id !== mango_tree_id
                ? undefined
                : datas.can_break_savings == '1'
                ? normalize(160, 'width')
                : undefined
            }
            nobold
            onPress={() => navigate('WithDrawSavings', {amt: datas.expected})}
          />
        ) : (
          <Button
            title={'Withdraw Savings'}
            disabled={true}
            width={
              datas.plan_id !== mango_tree_id
                ? undefined
                : datas.can_break_savings == '1'
                ? normalize(160, 'width')
                : undefined
            }
            nobold
            onPress={() => navigate('WithDrawSavings', {amt: datas.expected})}
          />
        )}

      </View>

      <View style={Globalstyles.bigGap56} />
      {renderTopUpView()}

      <View style={Globalstyles.bigGap40} />
      <PromotionalView
        onPress={generateCertificate}
        item={PromotionData[0]}
        indexNumber={1}
      />
      <View style={Globalstyles.bigGap40} />

      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        continuePress={() => setShowSuccessModal(false)}
        text={`You will receive your investment \ncertificate on your registered email`}
      />

      <BreakSavingsModal
        visible={showSavingModal}
        onRequestClose={() => setShowSavingModal(false)}
        continuePress={onPressConfirmBreakSaving}
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

export default Certificates;
