import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {BASE_URL, Axios, asyncStorage, headersData} from './constant';
import {
  ADD_NEW_BANK,
  BANK_LIST,
  BANK_SERVICES,
  DELETE_BANK,
  BANK_CARDS,
  DELETE_CARDS,
  ADD_NEW_CARD,
  ACCOUNT_NAME,
} from './endpoints';

const BankServices = {
  BASE_URL: BASE_URL,
  AsyncStorage: asyncStorage,
  GetUserBanks: async () => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    const data = await Axios.post(BANK_SERVICES, body, config);
    return data;
  },
  GetDropdownBankList: async () => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    const data = await Axios.post(BANK_LIST, body, config);
    return data;
  },
  AddNewBank: async (
    bank_id: string,
    account_number: string,
    account_name: string,
  ) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('bank_code', `${bank_id}`);
    body.append('account_number', `${account_number}`);
    body.append('account_name', `${account_name}`);
    // console.log("ADD NEW BANK BODY",body)
    // body.append('verify_account_number', `${verify_account_number}`);

    const data = await Axios.post(ADD_NEW_BANK, body, config);
    return data;
  },
  DeleteBank: async (id: string) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('id', `${id}`);
    const data = await Axios.post(DELETE_BANK, body, config);
    return data;
  },
  GetUserCards: async () => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    const data = await Axios.post(BANK_CARDS, body, config);
    return data;
  },
  DeleteCards: async (id: string) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('id', `${id}`);
    const data = await Axios.post(DELETE_CARDS, body, config);
    return data;
  },
  AddNewCard: async (
    cc_number: string,
    cc_expiry_date: string,
    cc_cvv: string,
    // cc_pin: string,
  ) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('cc_number', `${cc_number}`);
    body.append('cc_expiry_date', `${cc_expiry_date}`);
    body.append('cc_cvv', `${cc_cvv}`);
    // body.append('cc_pin', `${cc_pin}`);
    console.log(body);
    const data = await Axios.post(ADD_NEW_CARD, body, config);
    return data;
  },
  GetAccountName: async (bank_code: string, account_number: string) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('bank_code', `${bank_code}`);
    body.append('account_number', `${account_number}`);
    const data = await Axios.post(ACCOUNT_NAME, body, config);
    return data;
  },
};

export default BankServices;
