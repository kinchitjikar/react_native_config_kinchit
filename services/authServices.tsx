import {Alert, PermissionsAndroid, Platform, View, Text} from 'react-native';
import {changeStack} from '../../navigation.service';
import {
  BASE_URL,
  Axios,
  asyncStorage,
  headersData,
  checkInterNet,
} from './constant';
import {
  ADD_BVN,
  GENERATE_OTP_TEXT,
  GET_FAQS,
  GET_USER_INFO,
  LOGIN,
  REGISTER,
  RESET_PASSWORD_EMAIL,
  RESET_PASSWORD_OTP_VERIFY,
  SET_NEW_PASSORD,
  SIGNUP_OTP_VERIFY,
  UPDATE_PHOTO,
  UPDATE_PROFILE,
} from './endpoints';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';

const AuthService = {
  BASE_URL: BASE_URL,
  AsyncStorage: asyncStorage,
  UserLogin: async (body: FormData) => {
    console.log('loginbody', body);
    const config = await headersData();
    const notification_token = await asyncStorage.getItem('notification_token');
    console.log(DeviceInfo.getDeviceId());
    console.log(Platform.Version);
    console.log(DeviceInfo.getVersion());
    body.append('mobile_os', `${Platform.Version}`);
    body.append('mobile_device_id', `${DeviceInfo.getDeviceId()}`);
    body.append('app_version', `${DeviceInfo.getVersion()}`);
    body.append(
      'mobile_device_type',
      `${Platform.OS === 'android' ? 'A' : 'I'}`,
    );
    if (notification_token !== null) {
      console.log('inside login', notification_token);
      body.append('push_notification_id', `${notification_token}`);
    }

    const data = await Axios.post(LOGIN, body, config);
    return data;
  },
  UserRegister: async (body: FormData) => {
    const config = await headersData();
    const data = await Axios.post(REGISTER, body, config);
    // console.log('Data', data);
    return data;
  },
  UserOtpVerify: async (body: FormData) => {
    const config = await headersData();
    const data = await Axios.post(SIGNUP_OTP_VERIFY, body, config);
    return data;
  },
  UserResetPassword: async (body: FormData) => {
    const config = await headersData();
    const data = await Axios.post(RESET_PASSWORD_EMAIL, body, config);
    return data;
  },
  UserResetPasswordVerify: async (body: FormData) => {
    const config = await headersData();
    const data = await Axios.post(RESET_PASSWORD_OTP_VERIFY, body, config);
    return data;
  },
  UserChangePassword: async (body: FormData) => {
    const config = await headersData();
    const data = await Axios.post(SET_NEW_PASSORD, body, config);
    return data;
  },
  tempData: async data => {
    if (data.code !== '200') {
      // console.log(typeof data)
      return `${data.message}`;
    } else if (data.code === '407') {
      return `${data.message}`;
    } else if (data.code === 'IN') {
      console.log('no');
      return `${data.message}`;
    } else {
      return data;
    }
  },
  sessionTimeOut: async () => {
    await asyncStorage
      .clear()
      .then(() => {
        changeStack('AuthStack');
      })
      .catch(() => {});
  },
  validEmail: async (email, simple) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(email)) {
      return '';
      // return true;
    } else if (email !== '') {
      return 'Enter a valid email/phone number';
    } else if (email !== '' && simple) {
      return 'Enter a valid email';
    }
  },
  CheckInternet: () => {
    NetInfo.fetch().then(async state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
      } else {
        return false;
      }
    });
  },
  GetUserInfo: async () => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    const data = await Axios.post(GET_USER_INFO, body, config);
    return data;
  },
  GenerateOtp: async otpText => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('otp_text', `${otpText}`);
    const data = await Axios.post(GENERATE_OTP_TEXT, body, config);
    return data;
  },
  UpdateProfile: async (
    gender: string,
    email: string,
    mobile: string,
    first_name: string,
    last_name: string,
  ) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('gender', gender === 'Male' ? 'M' : 'F');
    body.append('email', `${email}`);
    body.append('mobile', `${mobile}`);
    body.append('first_name', `${first_name}`);
    body.append('last_name', `${last_name}`);
    console.log('BODY', body);
    const data = await Axios.post(UPDATE_PROFILE, body, config);
    return data;
  },
  UpdatePhoto: async (photo: object) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('photo', photo);

    const data = await Axios.post(UPDATE_PHOTO, body, config);
    return data;
  },
  GetFaqs: async () => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    const data = await Axios.post(GET_FAQS, body, config);
    return data;
  },
  AddBvn: async (bvn: string) => {
    const config = await headersData();
    const body = new FormData();
    const token = await asyncStorage.getItem('api_token');
    body.append('api_token', `${token}`);
    body.append('bvn', bvn);

    const data = await Axios.post(ADD_BVN, body, config);
    return data;
  },
};

export default AuthService;
