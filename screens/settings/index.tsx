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
import {navigate} from '../../../navigation.service';
import {LogoIcon, MonieTreeIcon, OnBoard1} from '../../assets/svgs';
import {Button, InactiveButton, Layout} from '../../components';
import InputBox from '../../components/InputBox';
import Navbar from '../../components/Navbar';
import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../../constants';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import styles from '../settings/styles';
// import normalize from '../../styles/normalize';

const settings = [
  {text: 'Manage Profile', id: 1, nav: 'ManageProfile'},
  {text: 'Change Password', id: 2, nav: 'ChangeProfilePassword'},
  {text: 'Change Transaction PIN', id: 3, nav: 'CreateTransactionPin'},
];

const Settings: React.FC<Props> = props => {
  //States
  const [desc, setDesc] = useState('');
  //Helpers
  const nav = (nav, id) => {
    if (id === 3) {
      props.navigation.navigate(`${nav}`, {fromHarvest: false});
    } else {
      props.navigation.navigate(`${nav}`);
    }
  };

  // api calls

  // Constants

  const renderList = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          nav(item.nav, item.id);
        }}
        style={[
          Globalstyles.shadowBox2,
          {
            width: normalize(330, 'width'),
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop:
              index === 0 ? normalize(23, 'height') : normalize(17, 'height'),
            paddingVertical: normalize(12, 'height'),
            paddingLeft: normalize(21, 'width'),
            borderRadius: 4,
          },
        ]}>
        <Text style={texts.text15lightgraywithoutmargin}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  // Main
  return (
    <Layout noBottomPad>
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title="Settings"
        leftIcon="darkClose"
        navigation={props.navigation}
      />
      <View style={styles.container}>
        {settings.map((item, index) => renderList(item, index))}
      </View>
    </Layout>
  );
};

export default Settings;
