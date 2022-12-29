import React from 'react';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Home from '../screens/home';

import MonieTree from '../screens/monieTree';
import TreePayment from '../screens/monieTree/treePayment';
import TreeInvest from '../screens/monieTree/payment';
import NewCard from '../screens/monieTree/newCard';
import BasicInfo from '../screens/home/basicinfo';
import Basicinfo_bvn from '../screens/home/basicinfo_bvn';
import BankDetails from '../screens/bankcards/bankDetails';
import FundWallet from '../screens/savings/fundWallet';
import TransferFund from '../screens/savings/transferFund';
import TransferFundAddAmt from '../screens/savings/transferFundAddAmt';
import TransferFundVerify from '../screens/savings/transferFundVerify';
import CreateTransactionPin from '../screens/savings/createTransactionPin';
import ChangePinOtp from '../screens/savings/changePinOtp';
import MonieHarvest from '../screens/savings/monieHarvest';
import FundwalletInitialScreen from '../screens/savings/fundwalletInitialscreen';
import FundWalletNewCard from '../screens/savings/fundwalletNewCard';
import TransferFundAddBank from '../screens/savings/transferFundAddBank';

const Stack = createStackNavigator();
//<Stack.Screen name="Basicinfo_card" component={Basicinfo_card} />
const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="Fundwallet" component={FundWallet} /> */}
      <Stack.Screen name="MonieTree" component={MonieTree} />
      <Stack.Screen name="TreePayment" component={TreePayment} />
      <Stack.Screen name="TreeInvest" component={TreeInvest} />
      {/* <Stack.Screen name="NewCard" component={NewCard} /> */}
      <Stack.Screen name="BasicInfo" component={BasicInfo} />
      <Stack.Screen name="Basicinfo_bvn" component={Basicinfo_bvn} />
      <Stack.Screen name="BankDetails" component={BankDetails} />
      <Stack.Screen name="TransferFund" component={TransferFund} />
      <Stack.Screen name="TransferFundAddAmt" component={TransferFundAddAmt} />
      <Stack.Screen name="TransferFundVerify" component={TransferFundVerify} />
      <Stack.Screen name="FundWallet" component={FundWallet} />
      <Stack.Screen
        name="FundwalletInitialScreen"
        component={FundwalletInitialScreen}
      />
      {/* <Stack.Screen name="FundWalletNewCard" component={FundWalletNewCard} /> */}
      <Stack.Screen
        name="CreateTransactionPin"
        component={CreateTransactionPin}
      />
      <Stack.Screen name="ChangePinOtp" component={ChangePinOtp} />
      <Stack.Screen
        name="TransferFundAddBank"
        component={TransferFundAddBank}
      />
      <Stack.Screen name="MonieHarvest" component={MonieHarvest} />
    </Stack.Navigator>
  );
};

export {HomeScreenNavigator};
