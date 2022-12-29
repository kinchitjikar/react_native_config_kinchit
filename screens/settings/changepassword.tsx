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
import {
  LogoIcon,
  MonieTreeIcon,
  OnBoard1,
  EyeIcon,
  EyeCloseIcon,
} from '../../assets/svgs';
import {Button, InactiveButton, Layout} from '../../components';
import InputBox from '../../components/InputBox';
import Navbar from '../../components/Navbar';
import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../../constants';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import styles from '../new/styles';

const ChangeProfilePassword: React.FC<Props> = props => {
  //States
  const [desc, setDesc] = useState('');
  const [pagesForm, setPagesForm] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [showOldPassword, setshowOldPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirmPass] = useState(false);
  //Helpers
  const onFieldChange = (text, field) => {
    const _pagesForm = {...pagesForm};
    _pagesForm[field] = text;
    setPagesForm(_pagesForm);
  };
  const goToOtp = () => {
    props.navigation.navigate('ChangeProfilePasswordOtp');
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
        subText={`Update your password occassionally for \nbetter security`}
      />

      <View style={Globalstyles.smallGap} />
      <View style={Globalstyles.widthView2}>
        <View style={Globalstyles.tiny15Gap} />
        <Text style={texts.textInputLabel}>Old Password</Text>
        <View style={Globalstyles.textInputGap} />
        <InputBox
          placeholder=""
          value={pagesForm.old_password}
          onChangeText={text => {
            onFieldChange(text.replace(/\s/g, ''), 'old_password');
          }}
          secureText={!showOldPassword}
          rightButton={
            !showOldPassword ? (
              <EyeIcon
                height={normalize(24, 'height')}
                width={normalize(24, 'width')}
              />
            ) : (
              <EyeCloseIcon
                height={normalize(24, 'height')}
                width={normalize(24, 'width')}
              />
            )
          }
          rightOnPress={() => setshowOldPassword(!showOldPassword)}
        />

        <View style={Globalstyles.tiny15Gap} />
        <Text style={texts.textInputLabel}>New Password</Text>
        <View style={Globalstyles.textInputGap} />
        <InputBox
          placeholder=""
          value={pagesForm.new_password}
          onChangeText={text => {
            onFieldChange(text.replace(/\s/g, ''), 'new_password');
          }}
          secureText={!showPass}
          rightButton={
            !showPass ? (
              <EyeIcon
                height={normalize(24, 'height')}
                width={normalize(24, 'width')}
              />
            ) : (
              <EyeCloseIcon
                height={normalize(24, 'height')}
                width={normalize(24, 'width')}
              />
            )
          }
          rightOnPress={() => setShowPass(!showPass)}
        />

        <View style={Globalstyles.tiny15Gap} />
        <Text style={texts.textInputLabel}>Confirm Password</Text>
        <View style={Globalstyles.textInputGap} />
        <InputBox
          placeholder=""
          value={pagesForm.confirm_password}
          onChangeText={text => {
            onFieldChange(text.replace(/\s/g, ''), 'confirm_password');
          }}
          secureText={!showConfirm}
          rightButton={
            !showConfirm ? (
              <EyeIcon
                height={normalize(24, 'height')}
                width={normalize(24, 'width')}
              />
            ) : (
              <EyeCloseIcon
                height={normalize(24, 'height')}
                width={normalize(24, 'width')}
              />
            )
          }
          rightOnPress={() => setShowConfirmPass(!showConfirm)}
        />
      </View>

      <View style={Globalstyles.bigGap240} />
      <Button title={'Continue'} nobold onPress={goToOtp}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        nobold
        linkText={'Cancel'}
        backgroundColor={'white'}
        onPress={goBack}></InactiveButton>
    </Layout>
  );
};

export default ChangeProfilePassword;
