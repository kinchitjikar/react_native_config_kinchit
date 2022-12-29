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
  NigeriaFlagIcon,
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

const BasicInfo: React.FC<Props> = props => {
  //States
  const [desc, setDesc] = useState('');
  const [pagesForm, setPagesForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: '',
  });
  const [bankModal, setBankModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [frontEndErrorMsg, setFrontEndErrorMsg] = useState('');
  const [phoneErrorMsg, setphoneErrorMsg] = useState('');
  const [isBvnavailable, setIsBvnAvailable] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalMessage, setShowSuccessModalMessage] = useState('');
  const [isSomethingNeedUpdate, setIsSomethingNeedUpdate] = useState(false);
  //Helpers

  useEffect(() => {
    getProfileData();
  }, []);

  const routeHandle = props.route.params.datas;
  console.log('routeHandle',routeHandle)
  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };
  const getProfileData = async () => {
    try {
      const {data} = await AuthService.GetUserInfo();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d.data[0]);
        // await setData(d.data[0]);

        setPagesForm({
          first_name: d.data[0].first_name,
          last_name: d.data[0].last_name,
          email: d.data[0].email,
          phone: d.data[0].phone,
          gender: d.data[0].gender === 'M' ? 'Male' : 'Female',
        });

        d.data[0].is_bvn_used == 0
          ? setIsBvnAvailable(false)
          : setIsBvnAvailable(true);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('getProfileData call error');
      checkNet();
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const {data} = await AuthService.UpdateProfile(
        pagesForm.gender,
        pagesForm.email,
        pagesForm.phone,
        pagesForm.first_name,
        pagesForm.last_name,
      );
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        await getProfileData();
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

  const onFieldChange = (text, field) => {
    const _pagesForm = {...pagesForm};
    _pagesForm[field] = text.trim();
    setPagesForm(_pagesForm);
  };

  const openBankModal = () => setBankModal(true);
  const closeBankModal = () => setBankModal(false);

  // api calls
  const isAnyFieldEmpty = () => {
    return Object.values(pagesForm).findIndex(v => !v) > -1;
  };

  // Constants

  // Main
  return (
    <Layout loading={loading} noBottomPad>
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title="Basic Information"
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={'Let’s get to know a little bit more about you'}
      />
      <View style={Globalstyles.smallGap25} />

      <View style={Globalstyles.widthView2}>
        <Text style={texts.textInputLabel}>Gender</Text>
        <View style={Globalstyles.textInputGap} />
        <TouchableOpacity onPress={openBankModal}>
          <View style={styles.box}>
            <Text style={styles.textstyle}>{pagesForm.gender}</Text>

            <BankDropdownIcon
              height={normalize(15, 'height')}
              width={normalize(15, 'width')}
            />
          </View>
        </TouchableOpacity>

        <View style={Globalstyles.tiny15Gap} />
        <Text style={texts.textInputLabel}>First Name</Text>
        <View style={Globalstyles.textInputGap} />
        <InputBox
          placeholder=""
          value={pagesForm.first_name}
          onChangeText={text => onFieldChange(text, 'first_name')}
        />

        <View style={Globalstyles.tiny15Gap} />
        <Text style={texts.textInputLabel}>Last Name</Text>
        <View style={Globalstyles.textInputGap} />
        <InputBox
          placeholder=""
          value={pagesForm.last_name}
          onChangeText={text => onFieldChange(text, 'last_name')}
        />

        <View style={Globalstyles.tiny15Gap} />
        <Text style={texts.textInputLabel}>Email</Text>
        <View style={Globalstyles.textInputGap} />
        <InputBox
          placeholder=""
          value={pagesForm.email}
          onChangeText={text => onFieldChange(text, 'email')}
          useBlur
          onBlur={async () => {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (reg.test(pagesForm.email)) {
              setFrontEndErrorMsg('');
              return true;
            } else if (pagesForm.email !== '') {
              return setFrontEndErrorMsg('Enter a valid email');
            }
          }}
        />
        {frontEndErrorMsg !== '' && (
          <>
            <View style={Globalstyles.textInputGap} />
            <Text style={texts.errorMessageText}>{frontEndErrorMsg}</Text>
          </>
        )}

        <View style={Globalstyles.tiny15Gap} />
        <Text style={texts.textInputLabel}>Phone Number</Text>
        <View style={Globalstyles.textInputGap} />
        <View style={Globalstyles.row}>
          <InputBox
            placeholder=""
            value={' +234'}
            // onChangeText={text => onFieldChange(text.replace(/\s/g, ''), 'phone')}
            keyboardType={'numeric'}
            // maxLength={3}
            useBlur
            onBlur={async () => {
              if (pagesForm.phone.length < 10 && pagesForm.phone !== '') {
                setphoneErrorMsg('Enter a valid phone no');
              } else {
                setphoneErrorMsg('');
              }
            }}
            editable={false}
            width={normalize(90, 'width')}
            leftButton={<NigeriaFlagIcon />}
          />
          <View style={{width: normalize(15, 'width')}} />
          <InputBox
            placeholder=""
            value={pagesForm.phone}
            onChangeText={text =>
              onFieldChange(text.replace(/\s/g, ''), 'phone')
            }
            keyboardType={'numeric'}
            maxLength={10}
            useBlur
            onBlur={async () => {
              if (pagesForm.phone.length < 10 && pagesForm.phone !== '') {
                setphoneErrorMsg('Enter a valid phone no');
              } else {
                setphoneErrorMsg('');
              }
            }}
            width={normalize(215, 'width')}
          />
        </View>
        {phoneErrorMsg !== '' && (
          <>
            <View style={Globalstyles.textInputGap} />
            <Text style={texts.errorMessageText}>{phoneErrorMsg}</Text>
          </>
        )}
      </View>

      <DropDownModal
        item={gender}
        onSelect={(item: any) => {
          console.log('ITEM', item);
          onFieldChange(item.name, 'gender');
          closeBankModal();
        }}
        small
        visible={bankModal}
        onRequestClose={closeBankModal}
      />
      <View style={Globalstyles.bigGap40} />

      <Button
        title={'Continue'}
        disabled={isAnyFieldEmpty()}
        onPress={() => updateProfile()}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        nobold
        linkText={'Skip'}
        backgroundColor={'white'}
        onPress={async () =>
          isBvnavailable
            ? routeHandle.is_bank_added == '1'
              ? await navigate('Home')
              : await navigate('BankDetails', {fromHome: true})
            : await navigate('Basicinfo_bvn', {datas: routeHandle})
        }></InactiveButton>

      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        continuePress={async () => {
          setShowSuccessModal(false),
            isBvnavailable
              ? routeHandle.is_bank_added == '1'
                ? await navigate('Home')
                : await navigate('BankDetails', {fromHome: true})
              : await navigate('Basicinfo_bvn', {datas: routeHandle});
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

export default BasicInfo;
