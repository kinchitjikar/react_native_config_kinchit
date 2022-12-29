import React from 'react';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import More from '../screens/more';
import Settings from '../screens/settings';
import ManageProfile from '../screens/settings/manageprofile';
import ChangeProfilePassword from '../screens/settings/changepassword';
import ChangeProfilePasswordOtp from '../screens/settings/changepasswordotp';
import BankCard from '../screens/bankcards';
import BankDetails from '../screens/bankcards/bankDetails';
import NewCard from '../screens/monieTree/newCard';
import Talktous from '../screens/more/talktous';
import CreateTransactionPin from '../screens/savings/createTransactionPin';
import ChangePinOtp from '../screens/savings/changePinOtp';
import MonieHarvest from '../screens/savings/monieHarvest';
import FAQs from '../screens/more/faq';

const Stack = createStackNavigator();
//<Stack.Screen name="FAQs" component={FAQs} />
const MoreScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="Mores" component={More} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ManageProfile" component={ManageProfile} />
      <Stack.Screen
        name="ChangeProfilePassword"
        component={ChangeProfilePassword}
      />
      <Stack.Screen
        name="ChangeProfilePasswordOtp"
        component={ChangeProfilePasswordOtp}
      />
      <Stack.Screen name="Banks & Cards" component={BankCard} />
      <Stack.Screen name="BankDetails" component={BankDetails} />
      {/* <Stack.Screen name="NewCard" component={NewCard} /> */}
      <Stack.Screen name="Talk to Us" component={Talktous} />
      <Stack.Screen
        name="CreateTransactionPin"
        component={CreateTransactionPin}
      />
      <Stack.Screen name="ChangePinOtp" component={ChangePinOtp} />
      <Stack.Screen name="MonieHarvest" component={MonieHarvest} />
      <Stack.Screen name="FAQs" component={FAQs} />
    </Stack.Navigator>
  );
};

export {MoreScreenNavigator};
