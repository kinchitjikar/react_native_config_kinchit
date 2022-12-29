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
import {goBack} from '../../../navigation.service';
import {LogoIcon} from '../../assets/svgs';
import {
  Button,
  InactiveButton,
  Layout,
  TreeList,
  ErrorModal,
} from '../../components';
import InputBox from '../../components/InputBox';
import Navbar from '../../components/Navbar';
import AuthService from '../../services/authServices';
import DepositServices from '../../services/depositServices';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import {useFocusEffect} from '@react-navigation/native';
import {checkInterNet, internetText} from '../../services/constant';
import NetInfo from '@react-native-community/netinfo';

// import normalize from '../../styles/normalize';

const TreePayment: React.FC<Props> = props => {
  // const tree = props.route.params.data
  //   ? props.route.params.data.product_title
  //   : '';

  const treePrams = props.route.params.data ? props.route.params.data : {};
  //States
  const [paymentForm, setPaymentForm] = useState({
    // duration: '',
    amount: '',
    due_amount: '',
  });
  const [treeObj, setTreeObj] = useState({});
  const [tree, setTree] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedAmt, setSelectedAmt] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');

  //Helpers
  const goToTreeInvest = () => {
    props.navigation.navigate('TreeInvest', {
      data: treeObj,
      amt: paymentForm.amount,
    });
  };

  // useEffect(() => {
  //   depositPage();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      depositPage();
    }, []),
  );

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const onFieldChange = (text, field) => {
    const _paymentForm = {...paymentForm};
    _paymentForm[field] = text.replace(/[^0-9.]/g, '');
    //(/[^0-9.]/g, "")
    setPaymentForm(_paymentForm);
  };
  const isAnyFieldEmpty = () => {
    return Object.values(paymentForm).findIndex(v => !v) > -1;
  };

  // api calls
  const depositPage = async () => {
    // console.log(treeObj)
    try {
      const {data} = await DepositServices.Productdeposit(treePrams.plan_id);
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        await setTreeObj(d.data[0]);
        await setTree(d.data[0].product_title);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('Productdeposit  call error');
      checkNet();
    } finally {
      setLoading(false);
    }
  };

  const callDueAmountApi = async amt => {
    //due amount = amount +  (amount * percentage)
    if (amt.trim() !== '') {
      setLoading(true);
      try {
        const {data} = await DepositServices.GetDueAmount(treeObj.plan_id, amt);
        const d = await AuthService.tempData(data);
        if (typeof d === 'object') {
          onFieldChange(d.data[0].due_amount, 'due_amount');
          selectedAmt(`${amt}`);
          console.log('Amt', d.data[0].due_amount);
        } else {
          setErrorModal(true);
          seterrorModalMsg(d);
        }
      } catch (error) {
        console.log('Productdeposit  call error', error);
        // checkNet();
      } finally {
        setLoading(false);
      }
    } else {
      onFieldChange('', 'due_amount');
    }
  };

  // Constants

  const renderCenterTreeView = () => {
    return (
      <TreeList
        item={treeObj}
        treeText={treeObj.product_title}
        percent={treeObj.percentage_title}
        months={treeObj.month_title}
        height={normalize(97, 'height')}
        width={normalize(200, 'width')}
        paddingLeft={normalize(90, 'width')}
        bigText
      />
    );
  };
  console.log('sss', treeObj);
  // Main
  return (
    <Layout
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
        title={`${tree}`}
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={
          // `Input an amount and watch your money \ngrow`
          `${treeObj.tag_line}`
        }
      />
      <View style={Globalstyles.smallGap22} />
      {renderCenterTreeView()}
      <View style={Globalstyles.bigGap35} />

      <Text style={texts.textInputLabel2}>Duration</Text>
      <View style={Globalstyles.textInputGap} />
      <InputBox
        placeholder=""
        value={treeObj.duration}
        editable={false}
        backgroundColor={'white'}
      />

      <View style={Globalstyles.tiny15Gap} />
      <Text style={texts.textInputLabel2}>Amount</Text>
      <View style={Globalstyles.textInputGap} />
      <InputBox
        placeholder=""
        value={paymentForm.amount}
        onChangeText={text => {
          onFieldChange(text, 'amount');
        }}
        keyboardType="numeric"
        useBlur
        onBlur={() =>
          NetInfo.fetch().then(async state => {
            if (state.isConnected) {
              callDueAmountApi(`${paymentForm.amount}`);
            } else {
              onFieldChange('', 'due_amount');
              setErrorModal(true), seterrorModalMsg(internetText);
            }
          })
        }
        returnKeyType={'done'}
      />

      <View style={Globalstyles.tiny15Gap} />
      <Text style={texts.textInputLabel2}>Due Amount</Text>
      <View style={Globalstyles.textInputGap} />
      <InputBox
        placeholder=""
        value={`${paymentForm.due_amount}`}
        // onChangeText={text => {
        //   onFieldChange(text, 'due_amount');
        // }}
        editable={false}
        keyboardType="numeric"
      />

      <View style={Globalstyles.bigGap} />
      <Button
        title={'Continue'}
        disabled={isAnyFieldEmpty()}
        nobold
        onPress={goToTreeInvest}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        nobold
        linkText={'Cancel'}
        backgroundColor={'white'}
        onPress={goBack}></InactiveButton>

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

export default TreePayment;
