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
import {navigate} from '../../../navigation.service';
import {
  LogoIcon,
  MonieTreeIcon,
  OnBoard1,
  MasterCardIcon,
  DeleteIcon,
} from '../../assets/svgs';
import {
  Button,
  ConfirmationModal,
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
// import normalize from '../../styles/normalize';
import {checkInterNet, internetText} from '../../services/constant';
import AuthService from '../../services/authServices';
import BankServices from '../../services/bankServices';

import {useFocusEffect} from '@react-navigation/native';
import {isEmpty} from 'lodash';

const faqs = [
  {
    question: `How secure are my card details?`,
    ans: `MonieTree doesn’t store any of your card details. The cards you save for transactions will remain encrypted on our system.`,
  },
  {
    question: `How secure are my card details?`,
    ans: `MonieTree doesn’t store any of your card details. The cards you save for transactions will remain encrypted on our system.`,
  },
  {
    question: `How secure are my card details?`,
    ans: `MonieTree doesn’t store any of your card details. The cards you save for transactions will remain encrypted on our system.`,
  },
  {
    question: `How secure are my card details?`,
    ans: `MonieTree doesn’t store any of your card details. The cards you save for transactions will remain encrypted on our system.`,
  },
  {
    question: `How secure are my card details?`,
    ans: `MonieTree doesn’t store any of your card details. The cards you save for transactions will remain encrypted on our system.`,
  },
  {
    question: `How secure are my card details?`,
    ans: `MonieTree doesn’t store any of your card details. The cards you save for transactions will remain encrypted on our system.`,
  },
];

const FAQs: React.FC<Props> = props => {
  //States
  const [desc, setDesc] = useState('');
  const [selectedTab, setSelectedTab] = useState(1);
  const [bankData, setBankData] = useState([]);
  const [cardData, setCardData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalMessage, setShowSuccessModalMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [modalLoader, setModalLoader] = useState(false);
  const [faqs, setFaqs] = useState([]);
  //Helpers

  useFocusEffect(
    useCallback(() => {
      getFaqs();
    }, []),
  );

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };


  // api calls

  const getFaqs = async () => {
    try {
      const {data} = await AuthService.GetFaqs();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        setFaqs(d.data);
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

  const openCustomModal = () => setShowConfirmModal(true);
  const closeCustomModal = () => setShowConfirmModal(false);

  // Constants

  const renderFaqsList = useCallback(
    (item, index) => {
      return (
        <View style={styles.faqListContainer}>
          <Text style={texts.text15gray}>{item.question}</Text>
          <Text style={texts.text13normalLightgray}>{item.answer}</Text>
        </View>
      );
    },
    [faqs],
  );

  // Main
  return (
    <Layout loading={loading} noBottomPad>
      <View style={Globalstyles.tinyGap} />
      <Navbar title="FAQs" leftIcon="darkClose" navigation={props.navigation} />
      {/* <View style={Globalstyles.tinyGap} /> */}

      <View style={[styles.container]}>
        {faqs.map((item, index) => renderFaqsList(item, index))}
      </View>

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

      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        continuePress={() => setShowSuccessModal(false)}
        text={`${successModalMessage}`}
      />

      <ConfirmationModal
        differentCustomModal
        visible={showConfirmModal}
        onRequestClose={() => closeCustomModal()}
        confirmPress={() => closeCustomModal()}
        customText={
          <Text style={[styles.darktext18gray]}>
            Are you sure you want to remove?
          </Text>
        }
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

export default FAQs;
