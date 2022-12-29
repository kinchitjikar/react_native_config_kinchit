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
import styles from '../bankcards/styles';
// import normalize from '../../styles/normalize';
import {checkInterNet, internetText} from '../../services/constant';
import AuthService from '../../services/authServices';
import BankServices from '../../services/bankServices';

import {useFocusEffect} from '@react-navigation/native';
import {isEmpty} from 'lodash';

const BankCard: React.FC<Props> = props => {
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

  //Helpers

  useFocusEffect(
    useCallback(() => {
      // getProfileData();
      getBankData();
      getCardData();
    }, []),
  );

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const goTobank = () => {
    props.navigation.navigate(`BankDetails`, {fromHome: false});
  };

  const goTocard = () => {
    props.navigation.navigate('NewCard', {fromProfile: true});
  };
  // api calls
  const getBankData = async () => {
    // setLoading(true);
    try {
      const {data} = await BankServices.GetUserBanks();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d.data);
        await setBankData(d.data);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('getBankData call error');
      checkNet();
    } finally {
      // setLoading(false);
    }
  };

  const getCardData = async () => {
    // setLoading(true);
    try {
      const {data} = await BankServices.GetUserCards();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d.data);
        await setCardData(d.data);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('getCardData call error');
      checkNet();
    } finally {
      setLoading(false);
    }
  };

  const deleteBank = async id => {
    setLoading(true);
    try {
      const {data} = await BankServices.DeleteBank(id);
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        setShowSuccessModalMessage(d.message);
        setShowSuccessModal(true);
        getBankData();
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('deleteBank call error');
      checkNet();
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async id => {
    setLoading(true);
    try {
      const {data} = await BankServices.DeleteCards(id);
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        setShowSuccessModalMessage(d.message);
        setShowSuccessModal(true);
        getCardData();
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      console.log('deleteCard call error');
      checkNet();
    } finally {
      setLoading(false);
    }
  };

  const openCustomModal = () => setShowConfirmModal(true);
  const closeCustomModal = () => setShowConfirmModal(false);

  const confirmRemove = () => {
    closeCustomModal();
    if (!isEmpty(selectedItem)) {
      selectedItem.type === 'Bank'
        ? deleteBank(selectedItem.id)
        : deleteCard(selectedItem.id);
    }
  };

  // Constants
  const renderTabBar = () => {
    return (
      <View style={[styles.tabBarContainer, {}]}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(1);
          }}
          style={[
            styles.tabBarStyle,
            {
              borderBottomWidth: Platform.OS === 'android' ? 8 : 5,
              borderColor: selectedTab === 1 ? '#C9D92D' : 'white',
            },
          ]}>
          <Text style={[texts.bankBarText]}>Banks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelectedTab(2);
          }}
          style={[
            styles.tabBarStyle,
            {
              borderBottomWidth: Platform.OS === 'android' ? 8 : 5,
              borderColor: selectedTab === 2 ? '#C9D92D' : 'white',
            },
          ]}>
          <Text style={texts.bankBarText}>Cards</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderBank = (item, index) => {
    return (
      <>
        <View style={Globalstyles.bigGap} />

        <View style={[Globalstyles.shadowBox2, styles.bankView]}>
          <Text style={texts.bankText}>{item.account_name}</Text>
          <Text style={texts.text15mediumgray}>{item.account_number}</Text>
          <View style={styles.absolutePosition}>
            <Text style={texts.text15mediumgray}>{item.bank_name}</Text>
          </View>
          <TouchableOpacity
            onPress={async () => {
              await setSelectedItem({type: 'Bank', id: item.id});
              await openCustomModal();
            }}
            style={styles.absolutePosition2}>
            <DeleteIcon />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderCards = (item, index) => {
    return (
      <>
        <View style={Globalstyles.bigGap} />
        <View style={[Globalstyles.shadowBox2, styles.bankView]}>
          <Text style={texts.bankText}>{item.card_number}</Text>
          <Text style={texts.text15mediumgray}>{item.card_expiry_date}</Text>
          <View style={styles.absolutePosition}>
            <MasterCardIcon />
          </View>

          <TouchableOpacity
            onPress={async () => {
              await setSelectedItem({type: 'Card', id: item.id});
              await openCustomModal();
            }}
            style={styles.absolutePosition2}>
            <DeleteIcon />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  // Main
  return (
    <Layout loading={loading} noBottomPad>
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title="Banks & Cards"
        leftIcon="darkClose"
        navigation={props.navigation}
      />
      <View style={Globalstyles.tinyGap} />
      {renderTabBar()}

      <View style={[styles.container]}>
        {selectedTab === 1
          ? bankData.map((item, index) => renderBank(item, index))
          : cardData.map((item, index) => renderCards(item, index))}

        {selectedTab === 1 ? (
          <>
            <View style={Globalstyles.smallGap} />
            <Button
              title={'Add New Bank'}
              width={normalize(330, 'width')}
              nobold
              onPress={goTobank}></Button>
          </>
        ) : (
          <>
            {/* <View style={Globalstyles.smallGap} />
            <Button
              title={'Add New Card'}
              width={normalize(330, 'width')}
              nobold
              onPress={goTocard}></Button> */}
          </>
        )}
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
        confirmPress={() => confirmRemove()}
        customText={
          <Text style={[styles.darktext18gray]}>
            Are you sure you want to remove?
          </Text>
        }
      />
    </Layout>
  );
};

export default BankCard;
