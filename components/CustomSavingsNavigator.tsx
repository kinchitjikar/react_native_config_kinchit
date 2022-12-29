import React from 'react';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import TopUpPayment from '../screens/savings/topUpPayment';
import TopUpSaving from '../screens/savings/topUpSaving';
import TransferSaving from '../screens/savings/transferSaving';
import BreakDestination from '../screens/savings/breakDestination';
import BreakAmount from '../screens/savings/breakAmount';
import BreakOptions from '../screens/savings/breakOptions';
import Certificates from '../screens/savings/certificates';
import Savings from '../screens/savings';
import MonieTree from '../screens/monieTree';
import MonieHarvest from '../screens/savings/monieHarvest';
import ViewMoreTransactions from '../screens/savings/viewMoreTransaction';
import BankDetails from '../screens/bankcards/bankDetails';
import TransferFund from '../screens/savings/transferFund';
import TransferFundAddAmt from '../screens/savings/transferFundAddAmt';
import TransferFundVerify from '../screens/savings/transferFundVerify';
import FundWallet from '../screens/savings/fundWallet';
import CreateTransactionPin from '../screens/savings/createTransactionPin';
import ChangePinOtp from '../screens/savings/changePinOtp';
import NewCard from '../screens/monieTree/newCard';
import WithDrawSavings from '../screens/savings/withdrawSavings';
import FundwalletInitialScreen from '../screens/savings/fundwalletInitialscreen';
import FundWalletNewCard from '../screens/savings/fundwalletNewCard';
import TransferFundAddBank from '../screens/savings/transferFundAddBank';

const Stack = createStackNavigator();
//   <Stack.Screen name="TransferFundAddBank" component={TransferFundAddBank} />
const SavingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="Savings" component={Savings} />
      <Stack.Screen name="Certificates" component={Certificates} />
      <Stack.Screen name="BreakOptions" component={BreakOptions} />
      <Stack.Screen name="BreakAmount" component={BreakAmount} />
      <Stack.Screen name="BreakDestination" component={BreakDestination} />
      <Stack.Screen name="TransferSaving" component={TransferSaving} />
      <Stack.Screen name="TopUpSaving" component={TopUpSaving} />
      <Stack.Screen name="TopUpPayment" component={TopUpPayment} />
      <Stack.Screen name="MonieTreeSavings" component={MonieTree} />
      <Stack.Screen name="MonieHarvest" component={MonieHarvest} />
      <Stack.Screen
        name="ViewMoreTransactions"
        component={ViewMoreTransactions}
      />
      <Stack.Screen name="TransferFund" component={TransferFund} />
      <Stack.Screen name="BankDetails" component={BankDetails} />
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
      {/* <Stack.Screen name="NewCard" component={NewCard} /> */}
      <Stack.Screen name="WithDrawSavings" component={WithDrawSavings} />
      <Stack.Screen
        name="TransferFundAddBank"
        component={TransferFundAddBank}
      />
    </Stack.Navigator>
  );
};

export {SavingsNavigator};
