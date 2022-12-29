import AsyncStorage from '@react-native-async-storage/async-storage';
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
  Linking,
} from 'react-native';
import {
  BankIcon,
  FaqIcon,
  LogoIcon,
  LogoutIcon,
  MyWalletIcon,
  SettingIcon,
  TalktousIcon,
  UserIcon,
} from '../../assets/svgs';
import {
  Button,
  ErrorModal,
  InactiveButton,
  Layout,
  WebviewModal,
} from '../../components';
import InputBox from '../../components/InputBox';
import Navbar from '../../components/Navbar';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import styles from './styles';
import {changeStack, navigate} from '../../../navigation.service';
import AuthService from '../../services/authServices';
import {checkInterNet, internetText} from '../../services/constant';
import {useFocusEffect} from '@react-navigation/native';
// import normalize from '../../styles/normalize';

const settings = [
  {
    text: 'My Wallet',
    icon: <MyWalletIcon />,
  },
  {
    text: 'Banks & Cards',
    icon: <BankIcon />,
  },
  {
    text: 'FAQs',
    icon: <FaqIcon />,
  },
  {
    text: 'Talk to Us',
    icon: <TalktousIcon />,
  },
  {
    text: 'Settings',
    icon: <SettingIcon />,
  },
  {
    text: 'Logout',
    icon: <LogoutIcon />,
  },
];
const imgSize = 44.16;

const More: React.FC<Props> = props => {
  //States
  const [loading, setLoading] = useState(true);
  const [showWebview, setShowWebview] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [datas, setData] = useState({});

  //Helpers

  useFocusEffect(
    useCallback(() => {
      getProfileData();
    }, []),
  );

  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };

  const getProfileData = async () => {
    try {
      const {data} = await AuthService.GetUserInfo();
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        console.log(d.data[0]);
        await setData(d.data[0]);
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

  const logoutProcess = async () => {
    await AsyncStorage.clear()
      .then(() => {
        changeStack('AuthStack');
      })
      .catch(() => {});
  };

  // api calls
  const navigateProcess = text => {
    if (
      text === 'Settings' ||
      text === 'Banks & Cards' ||
      text === 'Talk to Us' ||
      text === 'FAQs'
    ) {
      props.navigation.navigate(`${text}`);
    } else if (text === 'My Wallet') {
      navigate('MonieHarvest');
    }
  };

  // Constants

  const renderProfileBar = () => {
    return (
      <TouchableOpacity
        onPress={() => navigate('ManageProfile')}
        style={styles.profileBarContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <UserIcon
            height={normalize(44.16, 'height')}
            width={normalize(44.16, 'width')}
          /> */}
          <Image
            source={{
              uri: datas.profile_photo_url,
            }}
            style={{height: imgSize, width: imgSize, borderRadius: imgSize / 2}}
          />
          <View
            style={{paddingLeft: normalize(17, 'width'), paddingBottom: '2%'}}>
            <Text style={texts.text23darkgreen}>{datas.full_name}</Text>
            <Text style={texts.text1324lightgray}>{`+234${datas.phone}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSettingList = (item: any, index: any) => {
    return (
      <View
        style={[
          styles.listView,
          {
            borderBottomWidth: 0.8,
            borderColor: '#EFEEEE',
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            // props.navigation.navigate(`${item.text}`);
            item.text === 'Logout'
              ? logoutProcess()
              : navigateProcess(item.text);
          }}
          style={[
            Globalstyles.row,
            {
              width: '100%',
              justifyContent: 'space-between',
            },
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {item.icon}
            <View style={styles.profileNameContainer}>
              <Text style={texts.settingText}>{item.text}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // Main
  return (
    <Layout loading={loading}>
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title="More"
        textOnLeft
        // leftIcon="darkClose"
        navigation={props.navigation}
      />
      <View style={Globalstyles.tinyGap} />
      {renderProfileBar()}

      <View style={Globalstyles.smallGap} />
      {settings.map((item, index) => renderSettingList(item, index))}
      <WebviewModal
        visible={showWebview}
        onRequestClose={() => {
          setShowWebview(false);
        }}
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

export default More;
