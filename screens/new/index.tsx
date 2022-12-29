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
import {LogoIcon, MonieTreeIcon, OnBoard1} from '../../assets/svgs';
import {
  Button,
  InactiveButton,
  Layout,
  ErrorModal,
  SuccessModal,
} from '../../components';
import InputBox from '../../components/InputBox';
import Navbar from '../../components/Navbar';
import {Colors} from '../../constants';
import AuthService from '../../services/authServices';
import {checkInterNet, internetText} from '../../services/constant';
import DashboardService from '../../services/dashboardServices';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import styles from '../new/styles';
// import normalize from '../../styles/normalize';

const New: React.FC<Props> = props => {
  //States
  const [desc, setDesc] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, seterrorModalMsg] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  //Helpers
  const checkNet = async () => {
    !checkInterNet() && (setErrorModal(true), seterrorModalMsg(internetText));
  };
  // api calls
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const {data} = await DashboardService.SubmitFeedBack(desc);
      const d = await AuthService.tempData(data);
      if (typeof d === 'object') {
        setDesc('');
        setShowSuccessModal(true);
      } else {
        setErrorModal(true);
        seterrorModalMsg(d);
      }
    } catch (error) {
      checkNet();
      console.log('Suggestion submit error', error);
    } finally {
      setLoading(false);
    }
  };

  // Constants
  const renderMonietreeView = () => {
    return (
      <TouchableOpacity style={styles.promotionalView} onPress={() => {}}>
        <View>
          <Text style={texts.text11gray}>
            {
              'MonieTree is a growing community of \nfinancially intelligent people. \n'
            }
          </Text>

          <Text style={texts.text11gray}>
            {
              'We plan to roll out new features to \nimprove your finances and the best part is \nthat you get to be a part of the process.'
            }
          </Text>
        </View>
        <View
          style={{
            bottom: normalize(0.8, 'height'),
            position: 'absolute',
            right: 0,
          }}>
          <OnBoard1
            width={normalize(150, 'width')}
            height={normalize(164, 'height')}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // Main
  return (
    <Layout loading={loading}>
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title="New"
        textOnLeft
        // leftIcon="darkClose"
        navigation={props.navigation}
      />
      {renderMonietreeView()}

      <View style={Globalstyles.smallGap} />

      <View style={[Globalstyles.widthView, {alignItems: 'center'}]}>
        <View style={{width: normalize(310, 'width')}}>
          <Text style={texts.textInputLabel}>
            What features will you like to see on the app?
          </Text>
        </View>
        <View style={Globalstyles.textInputGap} />
        <InputBox
          placeholder=""
          value={desc}
          onChangeText={text => setDesc(text)}
          width={normalize(310, 'width')}
          height={normalize(150, 'height')}
          multiLine
        />

        <View style={Globalstyles.bigGap} />
        <Button
          title={'Submit Feedback'}
          width={normalize(310, 'width')}
          nobold
          onPress={handleSubmit}></Button>
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
        text={`Thank you for you feedback`}
      />
    </Layout>
  );
};

export default New;
