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
import {goBack} from '../../../navigation.service';
import {LogoIcon, MonieTreeIcon, OnBoard1} from '../../assets/svgs';
import {Button, InactiveButton, Layout, SuccessModal} from '../../components';
import InputBox from '../../components/InputBox';
import Navbar from '../../components/Navbar';
import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../../constants';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import styles from '../new/styles';

const ChangeProfilePasswordOtp: React.FC<Props> = props => {
  //States
  const [desc, setDesc] = useState('');
  const [pagesForm, setPagesForm] = useState({
    code: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  //Helpers
  const onFieldChange = (text, field) => {
    const _pagesForm = {...pagesForm};
    _pagesForm[field] = text;
    setPagesForm(_pagesForm);
  };

  const goToSettings = () => {
    setShowSuccessModal(false);
    props.navigation.navigate('Settings');
  };
  // api calls

  // Constants

  // Main
  return (
    <Layout noBottomPad>
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title="Change Password"
        leftIcon="darkClose"
        navigation={props.navigation}
        subText={`Input the OTP sent to ****eh@gmail.com \nor ********476`}
      />

      <View style={Globalstyles.smallGap} />
      <View style={Globalstyles.widthView2}>
        <View style={Globalstyles.tiny15Gap} />
        <Text style={texts.textInputLabel}>OTP</Text>
        <View style={Globalstyles.textInputGap} />
        <InputBox
          placeholder=""
          value={pagesForm.code}
          onChangeText={text => {
            onFieldChange(text.replace(/\s/g, ''), 'code');
          }}
          keyboardType={'numeric'}
          maxLength={6}
        />
      </View>

      <View style={Globalstyles.bigGap80} />

      <Button
        title={'Save Changes'}
        nobold
        onPress={() => {
          setShowSuccessModal(true);
        }}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        nobold
        linkText={'Cancel'}
        backgroundColor={'white'}
        onPress={goBack}></InactiveButton>

      <SuccessModal
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        continuePress={goToSettings}
        text={`You have updated your password`}
      />
    </Layout>
  );
};

export default ChangeProfilePasswordOtp;
