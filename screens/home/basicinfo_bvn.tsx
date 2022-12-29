import React, {useState, useEffect, useRef} from 'react';
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
import {goBack, navigate} from '../../../navigation.service';
import {
  BankDropdownIcon,
  LogoIcon,
  MonieTreeIcon,
  OnBoard1,
  UserIcon,
} from '../../assets/svgs';
import {
  Button,
  DropDownModal,
  ErrorModal,
  InactiveButton,
  Layout,
  SuccessModal,
} from '../../components';
import InputBox from '../../components/InputBox';
import Navbar from '../../components/Navbar';
import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../../constants';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import AuthService from '../../services/authServices';
import {checkInterNet, internetText} from '../../services/constant';

const gender = [
  {name: 'Male', id: 1},
  {name: 'Female', id: 2},
];

const Basicinfo_bvn: React.FC<Props> = props => {
  //States
  const [desc, setDesc] = useState('');
  const [pagesForm, setPagesForm] = useState({
    bvn: '',
  });
  const [bankModal, setBankModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [datas, setData] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalMessage, setShowSuccessModalMessage] = useState('');
  const [isSomethingNeedUpdate, setIsSomethingNeedUpdate] = useState(false);

  const routeHandle = props.route.params.datas;
  console.log('routeHandle', routeHandle);

  //Helpers
  const onFieldChange = (text, field) => {
    const _pagesForm = {...pagesForm};
    _pagesForm[field] = text.replace(/[^0-9]/g, '');
    setPagesForm(_pagesForm);
  };
  const isAnyFieldEmpty = () => {
    return Object.values(pagesForm).findIndex(v => !v) > -1;
  };
  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  // api calls

  const addbvn = async () => {
    setLoading(true);
    try {
      const {data} = await AuthService.AddBvn(pagesForm.bvn);
      const d = await AuthService.tempData(data);
      console.log(d);
      if (typeof d === 'object') {
        setShowSuccessModalMessage(d.message);
        setShowSuccessModal(true);
        setIsSomethingNeedUpdate(false);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('updateProfile call error', error);
      checkNet();
    } finally {
      setLoading(false);
    }
  };

  // Constants

  // Main
  return (
    <Layout loading={loading} noBottomPad>
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title="BVN"
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={'Link your BVN'}
      />
      <View style={Globalstyles.smallGap25} />
      <View style={Globalstyles.widthView2}>
        <Text style={texts.text1324lightgray}>
          Your BVN will enable you to link your bank accounts and create a bank
          account number for your MonieTree wallet.
        </Text>
      </View>
      <View style={Globalstyles.smallGap25} />
      <View style={Globalstyles.widthView2}>
        <Text style={texts.textInputLabel}>Enter BVN</Text>
        <View style={Globalstyles.textInputGap} />
        <InputBox
          placeholder=""
          value={pagesForm.bvn}
          onChangeText={text => onFieldChange(text, 'bvn')}
          keyboardType={'numeric'}
        />
      </View>
      <View style={Globalstyles.bigGap40} />
      <Button
        title={'Add BVN'}
        nobold
        disabled={isAnyFieldEmpty()}
        onPress={addbvn}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        nobold
        linkText={'Skip'}
        backgroundColor={'white'}
        onPress={() =>
          routeHandle.is_bank_added == '1'
            ? navigate('home')
            : navigate('BankDetails', {fromHome: true})
        }></InactiveButton>

      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        continuePress={() => {
          setShowSuccessModal(false),
            routeHandle.is_bank_added == '1'
              ? navigate('home')
              : navigate('BankDetails', {fromHome: true});
        }}
        text={`${successModalMessage}`}
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

export default Basicinfo_bvn;
