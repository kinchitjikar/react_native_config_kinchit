import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {BASE_URL, Axios, asyncStorage, headersData} from './constant';
import {
  FUND_WALLET,
  GET_FUND_WALLET_PAYMENT,
  MONIE_HARVEST_DASHBOARD,
  MONIE_HARVEST_RECORDS,
  TRANSFER_FUND,
  WITHDRAW_FUND,
} from './endpoints';

const MonieHarvestServices = {
  BASE_URL: BASE_URL,
  AsyncStorage: asyncStorage,
  GetmonieharvestDashboard: async () => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    const data = await Axios.post(MONIE_HARVEST_DASHBOARD, body, config);
    return data;
  },
  GetmonieharvestRecords: async pageno => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('current_page_number', `${pageno}`);

    const data = await Axios.post(MONIE_HARVEST_RECORDS, body, config);
    return data;
  },

  GetFundWallet: async () => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    const data = await Axios.post(GET_FUND_WALLET_PAYMENT, body, config);
    return data;
  },
  AddFundBank: async (amount: string, payment_mode: string) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('amount', `${amount}`);
    body.append('payment_mode', `${payment_mode}`);

    const data = await Axios.post(FUND_WALLET, body, config);
    return data;
  },

  AddFundValidCard: async (
    amount: string,
    payment_mode: string,
    card_id: string,
  ) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('amount', `${amount}`);
    body.append('payment_mode', `${payment_mode}`);
    body.append('card_id', `${card_id}`);
    const data = await Axios.post(FUND_WALLET, body, config);
    return data;
  },
  AddFundNewCard: async (
    amount: string,
    payment_mode: string,
    card_id: string,
    // cc_number: string,
    // cc_expiry_date: string,
    // cc_cvv: string,
  ) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('amount', `${amount}`);
    body.append('payment_mode', `${payment_mode}`);
    body.append('card_id', `${card_id}`);
    // body.append('cc_number', `${cc_number}`);
    // body.append('cc_expiry_date', `${cc_expiry_date}`);
    // body.append('cc_cvv', `${cc_cvv}`);
    // console.log(body)
    const data = await Axios.post(FUND_WALLET, body, config);
    return data;
  },
  AddTransferFund: async (amount: string, to_bank_id: string) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('amount', `${amount}`);
    body.append('to_bank_id', `${to_bank_id}`);
    // console.log('BODY', body);
    const data = await Axios.post(TRANSFER_FUND, body, config);
    return data;
  },
  WithdrawFund: async (
    amount: string,
    destination: string,
    to_bank_id: string,
  ) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('amount', `${amount}`);
    body.append('destination', `${destination}`);
    if (destination === 'BankAccount') {
      body.append('to_bank_id', `${to_bank_id}`);
    }
    console.log('WithdrawFund BODY', body);
    const data = await Axios.post(WITHDRAW_FUND, body, config);
    return data;
  },
};

export default MonieHarvestServices;
