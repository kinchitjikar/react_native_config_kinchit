import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {BASE_URL, Axios, asyncStorage, headersData} from './constant';
import {
  DUE_AMOUNT,
  GENERATE_CERTIFICATE,
  INVESTMENT_VIEW_OF_PRODUCT,
  PAYMENT_PRODUCT_INFO,
  PAYMENT_PRODUCT_INFO_CONFIRM,
  PRODUCT_DEPOSIT_PAGE,
} from './endpoints';

const DepositServices = {
  BASE_URL: BASE_URL,
  AsyncStorage: asyncStorage,
  Productdeposit: async (planId: string) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('plan_id', `${planId}`);
    const data = await Axios.post(PRODUCT_DEPOSIT_PAGE, body, config);
    return data;
  },
  GetDueAmount: async (planId: string, amount: string) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('plan_id', `${planId}`);
    body.append('amount', `${amount}`);

    const data = await Axios.post(DUE_AMOUNT, body, config);
    return data;
  },
  GetInvestmentProduct: async (treeId: string) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('my_tree_id', `${treeId}`);

    const data = await Axios.post(INVESTMENT_VIEW_OF_PRODUCT, body, config);
    return data;
  },
  Genratecertificate: async (treeId: string) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('my_tree_id', `${treeId}`);

    const data = await Axios.post(GENERATE_CERTIFICATE, body, config);
    return data;
  },

  ProductpaymentInfo: async (plan_id: string, amount: string) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('plan_id', `${plan_id}`);
    body.append('amount', `${amount}`);

    const data = await Axios.post(PAYMENT_PRODUCT_INFO, body, config);
    return data;
  },
  ProductpaymentInfoConfirm: async (
    hasval: string,
    type: string,
    isCard: boolean,
    card_id: string,
    // cc_number: string,
    // cc_expiry_date: string,
    // cc_cvv: string,
    // cc_pin: string,
  ) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('hasval', `${hasval}`);
    body.append('payment_mode', `${type}`);
    if (isCard) {
      body.append('card_id', `${card_id}`);
      // body.append('cc_number', `${cc_number}`);
      // body.append('cc_expiry_date', `${cc_expiry_date}`);
      // body.append('cc_cvv', `${cc_cvv}`);
      // body.append('cc_pin', `${cc_pin}`);
    }
    console.log(body);

    const data = await Axios.post(PAYMENT_PRODUCT_INFO_CONFIRM, body, config);
    return data;
  },
};

export default DepositServices;
