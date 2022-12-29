import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {BASE_URL, Axios, asyncStorage, headersData} from './constant';
import {
  MONIETREE_PAGE,
  MONIETREE_SAVINGS,
  NEW_SUGGESTION,
  REQUEST_INVESTMENT,
  SIGNIN_DASHBOARD,
  SIGNUP_DASHBOARD,
} from './endpoints';

const DashboardService = {
  BASE_URL: BASE_URL,
  AsyncStorage: asyncStorage,
  Getsignupdashboard: async () => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    const data = await Axios.post(SIGNUP_DASHBOARD, body, config);
    return data;
  },
  Getsignindashboard: async () => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    const data = await Axios.post(SIGNIN_DASHBOARD, body, config);
    return data;
  },
  Getmonietree: async () => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    const data = await Axios.post(MONIETREE_PAGE, body, config);
    return data;
  },
  GetSavingsMonietree: async () => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    const data = await Axios.post(MONIETREE_SAVINGS, body, config);
    return data;
  },
  SubmitFeedBack: async (desc: string) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('suggestion', `${desc}`);
    const data = await Axios.post(NEW_SUGGESTION, body, config);
    return data;
  },
  RequestInvestmentCertificate: async () => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);

    const data = await Axios.post(REQUEST_INVESTMENT, body, config);
    return data;
  },
};

export default DashboardService;
