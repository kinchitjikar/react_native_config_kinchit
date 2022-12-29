import {BASE_URL} from './constant';

//auth
export const LOGIN = BASE_URL + 'auth_token';
export const REGISTER = BASE_URL + 'signup';
export const SIGNUP_OTP_VERIFY = BASE_URL + 'signup_otp_verify';
export const RESET_PASSWORD_EMAIL = BASE_URL + 'forgot_password_confirm_email';
export const RESET_PASSWORD_OTP_VERIFY =
  BASE_URL + 'forgot_password_otp_verify';
export const SET_NEW_PASSORD = BASE_URL + 'forgot_password_set_new_password';
export const GET_USER_INFO = BASE_URL + 'users/info';
export const GENERATE_OTP_TEXT = BASE_URL + 'generate_transaction_otp';
export const UPDATE_PROFILE = BASE_URL + 'users/update_profile';
export const UPDATE_PHOTO = BASE_URL + 'users/update_profile_photo';
export const GET_FAQS = BASE_URL + 'faqs';
export const ADD_BVN = BASE_URL + 'bvn/add';

//dashboard
export const SIGNUP_DASHBOARD = BASE_URL + 'signup_dashboard';
export const SIGNIN_DASHBOARD = BASE_URL + 'login_dashboard';
export const MONIETREE_PAGE = BASE_URL + 'monie_tree';
export const MONIETREE_SAVINGS = BASE_URL + 'my_savings';
export const REQUEST_INVESTMENT = BASE_URL + 'request_investment_certificate';

//product deposit
export const PRODUCT_DEPOSIT_PAGE = BASE_URL + 'product_deposit_page';
export const DUE_AMOUNT = BASE_URL + 'calculate_due_amount';

//feedback

export const NEW_SUGGESTION = BASE_URL + 'new_suggestion';

//forgot_password_confirm_email

// investment product
export const INVESTMENT_VIEW_OF_PRODUCT =
  BASE_URL + 'investment_view_of_product';
export const GENERATE_CERTIFICATE = BASE_URL + 'request_certificate';
export const PAYMENT_PRODUCT_INFO = BASE_URL + 'product_payment_info';
export const PAYMENT_PRODUCT_INFO_CONFIRM =
  BASE_URL + 'product_payment_info/confirm';

// Monie Harvest
export const MONIE_HARVEST_DASHBOARD =
  BASE_URL + 'wallet_monieharvest/dashboard';
export const MONIE_HARVEST_RECORDS =
  BASE_URL + 'wallet_monieharvest/transactions';

// bank
export const BANK_SERVICES = BASE_URL + 'bank/connected_banks';
export const BANK_LIST = BASE_URL + 'bank/bank_list';
export const ADD_NEW_BANK = BASE_URL + 'bank/add_new_bank';
export const DELETE_BANK = BASE_URL + 'bank/remove_connected_bank';
export const ACCOUNT_NAME = BASE_URL + 'bank/get_account_name';

//cards
export const BANK_CARDS = BASE_URL + 'card/connected_cards';
export const DELETE_CARDS = BASE_URL + 'card/remove_connected_card';
export const ADD_NEW_CARD = BASE_URL + 'card/add_new_card';

//fund wallet

export const GET_FUND_WALLET_PAYMENT =
  BASE_URL + 'wallet_monieharvest/payment_mode';
export const FUND_WALLET = BASE_URL + 'wallet_monieharvest/add_fund';

//transfer fund
export const TRANSFER_FUND = BASE_URL + 'wallet_monieharvest/transfer_fund';

//withdraw fund
export const WITHDRAW_FUND = BASE_URL + 'wallet_monieharvest/withdraw';
