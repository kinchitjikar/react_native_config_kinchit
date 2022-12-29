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
import {LogoIcon} from '../../assets/svgs';
import {Button, FundTansfer, InactiveButton, Layout} from '../../components';
import InputBox from '../../components/InputBox';
import Navbar from '../../components/Navbar';
import Globalstyles from '../../styles';
import normalize from '../../styles/normalize';
import texts from '../../styles/texts';
import {InactiveRadios, ActiveRadio} from '../../assets/svgs';
import {goBack} from '../../../navigation.service';
// import normalize from '../../styles/normalize';

const transferOptions = [
  {
    type: 'Bank Tansfer',
    desc: 'Send money to your account number and \ninstantly get topped up.',
    id: 1,
  },
  {
    type: 'Debit Card',
    desc: 'Use the details from your Debit card to top-up your wallet',
    id: 2,
  },
  {
    type: 'From another monieTree Account',
    desc: 'Send a payment request to anyone',
    id: 3,
  },
];

const FundWallet: React.FC<Props> = props => {
  //States
  const [selectedId, setSelectedId] = useState(null);
  //Helpers

  // api calls

  // Constants
  const renderTransferOptions = (item, index) => {
    return (
      // <TouchableOpacity
      //   style={{
      //     width: normalize(330, 'width'),
      //     paddingVertical: normalize(30, 'width'),
      //     borderBottomWidth: 0.5,
      //     borderColor: 'rgba(151,151,151,0.2)',
      //   }}
      //   key={item.id}
      //   onPress={() => setSelectedId(item.id)}>
      //   <View style={[Globalstyles.centerRow]}>
      //     {selectedId === item.id ? <ActiveRadio /> : <InactiveRadios />}
      //     <View>
      //       <Text style={texts.lighttext19gray}>{item.type}</Text>
      //     </View>
      //   </View>
      //   <Text style={texts.lightGray13}>{item.desc}</Text>
      // </TouchableOpacity>
      <FundTansfer
        id={item.id}
        onPress={() => setSelectedId(item.id)}
        selected={selectedId === item.id}
        type={item.type}
        desc={item.desc}
      />
    );
  };

  // Main
  return (
    <Layout>
      <View style={Globalstyles.tinyGap} />
      <Navbar
        title="Fund Your Wallet"
        subText={'Top up your wallet with 100 Naira or more'}
        leftIcon="darkClose"
        navigation={props.navigation}
      />
      <View style={Globalstyles.smallGap} />
      {transferOptions.map((item, index) => renderTransferOptions(item, index))}

      <View style={Globalstyles.bigGap} />
      <Button
        title={'Continue'}
        disabled={selectedId === null}
        nobold
        onPress={() => {}}></Button>
      <View style={Globalstyles.tinyGap} />
      <InactiveButton
        nobold
        linkText={'Cancel'}
        backgroundColor={'white'}
        onPress={goBack}></InactiveButton>
    </Layout>
  );
};

export default FundWallet;
