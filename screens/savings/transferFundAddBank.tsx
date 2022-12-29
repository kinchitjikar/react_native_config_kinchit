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
import {goBack, navigate} from '../../../navigation.service';
import {
  BankDropdownIcon,
  LogoIcon,
  MonieTreeIcon,
  OnBoard1,
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
import styles from '../bankcards/styles';
import AuthService from '../../services/authServices';
import BankServices from '../../services/bankServices';
import {checkInterNet, internetText} from '../../services/constant';

// import normalize from '../../styles/normalize';

const TransferFundAddBank: React.FC<Props> = props => {
  //States
  const [desc, setDesc] = useState('');
  const [pagesForm, setPagesForm] = useState({
    bank_name: '',
    account_no: '',
  });
  const [pagesForm2, setPagesForm2] = useState({
    bank_id: '',
  });
  const [bankModal, setBankModal] = useState(false);
  const [bankData, setBankData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [bankValue, setBankValue] = useState(null);
  const [bankItem, setBankitem] = useState({});

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalMessage, setShowSuccessModalMessage] = useState('');
  const [verifyname, setVerifyName] = useState('');
  const fromHome = props.route.params.fromHome;

  const amt =
    props.route.params.amt === undefined ? '' : props.route.params.amt;
  //Helpers
  const onFieldChange = (text, field) => {
    setVerifyName('');
    const _pagesForm = {...pagesForm};
    _pagesForm[field] =
      field === 'account_no' || field === 'verify_name'
        ? text.replace(/[^0-9]/g, '')
        : text.trim();
    setPagesForm(_pagesForm);
    // console.log(pagesForm, pagesForm2);
  };

  const onFieldChange2 = (text, field) => {
    const _pagesForm2 = {...pagesForm2};
    _pagesForm2[field] = text.trim();
    setPagesForm2(_pagesForm2);
    // console.log(pagesForm, pagesForm2);
  };

  const isAnyFieldEmpty = () => {
    return Object.values(pagesForm).findIndex(v => !v) > -1;
  };

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const openBankModal = () => setBankModal(true);
  const closeBankModal = () => setBankModal(false);

  useEffect(() => {
    getBankList();
  }, []);
  // api calls

  const getBankList = async () => {
    try {
      const {data} = await BankServices.GetDropdownBankList();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d.data);
        await setBankData(d.data);
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

  const renderDropDownView = useCallback(() => {
    return (
      <DropDownModal
        item={bankData}
        onSelect={async (item: any) => {
          console.log('ITEM', item);
          onFieldChange(item.text, 'bank_name');
          onFieldChange2(item.value, 'bank_id');
          closeBankModal();
          // await getAccountName();
          if (pagesForm.account_no.trim() !== '') {
            getAccountName(item.value, 'fromDrop');
          }
        }}
        showValue={'text'}
        visible={bankModal}
        onRequestClose={closeBankModal}
      />
    );
  }, [bankItem, bankModal, verifyname]);

  const goToBankCards = async () => {
    Platform.OS === 'android' && setLoading(true);
    try {
      const {data} = await BankServices.AddNewBank(
        pagesForm2.bank_id,
        pagesForm.account_no,
        verifyname,
      );
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d);
        setPagesForm({
          bank_name: '',
          account_no: '',
        });
        setVerifyName('');
        setPagesForm2({
          bank_id: '',
        });
        if (amt !== '') {
          navigate('TransferFundVerify', {
            selectedBank: {
              accountNo: '',
              account_name: '',
              bankName: '',
              id: d.data[0].id,
              mask_name: d.data[0].mask_name,
              type: '',
            },
            fromWithdrawDeposit: true,
            amt: amt,
            destination: 'BankAccount',
          });
        } else {
          navigate('TransferFundAddAmt', {
            selectedBank: {
              accountNo: '',
              account_name: '',
              bankName: '',
              id: d.data[0].id,
              mask_name: d.data[0].mask_name,
              type: '',
            },
          });
        }
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('goToBankCards call error');
      checkNet();
    } finally {
      setLoading(false);
    }
  };

  const getAccountName = async (id, fromDrop) => {
    // console.log('test', id, pagesForm2.bank_id, pagesForm.account_no);
    if (fromDrop === 'fromDrop') {
      if (id.trim() !== '' && pagesForm.account_no.trim() !== '') {
        Platform.OS === 'android' && setLoading(true);
        try {
          const {data} = await BankServices.GetAccountName(
            id,
            pagesForm.account_no,
          );
          const d = await AuthService.tempData(data);
          if (typeof d === 'object') {
            setVerifyName(d.data[0].account_name);
          } else {
            setErrorModal(true);
            seterrorModalMsg(d);
          }
        } catch (error) {
          console.log('goToBankCards call error');
          checkNet();
        } finally {
          setLoading(false);
        }
      }
    } else {
      if (
        pagesForm2.bank_id.trim() !== '' &&
        pagesForm.account_no.trim() !== ''
      ) {
        setLoading(true);
        try {
          const {data} = await BankServices.GetAccountName(
            pagesForm2.bank_id,
            pagesForm.account_no,
          );
          const d = await AuthService.tempData(data);
          if (typeof d === 'object') {
            setVerifyName(d.data[0].account_name);
          } else {
            setErrorModal(true);
            seterrorModalMsg(d);
          }
        } catch (error) {
          console.log('goToBankCards call error');
          checkNet();
        } finally {
          setLoading(false);
        }
      }
    }
  };
  // Constants

  // Main
  return (
    <Layout loading={loading} noBottomPad>
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title="Bank Details"
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`Use only the bank accounts linked to your\nBVN`}
      />
      <View style={Globalstyles.tinyGap} />

      <View style={Globalstyles.widthView2}>
        <View style={Globalstyles.tiny15Gap} />
        <Text style={texts.textInputLabel}>Select Bank</Text>
        <View style={Globalstyles.textInputGap} />
        <TouchableOpacity onPress={openBankModal}>
          <View style={styles.box}>
            <Text style={styles.textstyle}>{pagesForm.bank_name}</Text>

            <BankDropdownIcon
              height={normalize(15, 'height')}
              width={normalize(15, 'width')}
            />
          </View>
        </TouchableOpacity>

        <View style={Globalstyles.tiny15Gap} />
        <Text style={texts.textInputLabel}>Account Number</Text>
        <View style={Globalstyles.textInputGap} />

        <InputBox
          placeholder=""
          value={pagesForm.account_no}
          onChangeText={text => onFieldChange(text, 'account_no')}
          keyboardType={'numeric'}
          returnKeyType={'done'}
          useBlur
          onBlur={() => getAccountName('', '')}
        />

        <View style={Globalstyles.tiny15Gap} />
        <Text style={texts.textInputLabel}>Verify Account Name</Text>
        <View style={Globalstyles.textInputGap} />

        <InputBox
          placeholder=""
          value={verifyname}
          onChangeText={text => onFieldChange(text, 'verify_name')}
          backgroundColor={'white'}
          // keyboardType={'numeric'}
          editable={false}
        />
      </View>
      {/* {banks.map((item, index) => renderBank(item, index))} */}

      <View style={Globalstyles.smallGap} />

      <Button
        title={'Add New Bank'}
        nobold
        disabled={isAnyFieldEmpty() || verifyname.trim() === ''}
        width={normalize(330, 'width')}
        onPress={goToBankCards}></Button>

      {renderDropDownView()}

      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        continuePress={() => {
          //   navigate('TransferFundAddAmt');
          setShowSuccessModal(false);
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

export default TransferFundAddBank;
