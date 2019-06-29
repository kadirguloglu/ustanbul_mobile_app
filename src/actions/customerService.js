import {
  CUSTOMER_REGISTER_POST,
  CUSTOMER_REGISTER_POST_URL,
  MASTER_REGISTER_POST,
  MASTER_REGISTER_POST_URL,
  EMAIL_VALIDATE_POST,
  EMAIL_VALIDATE_POST_URL
} from "../types/customerService";

export function customerRegisterPost(userData) {
  return {
    type: CUSTOMER_REGISTER_POST,
    payload: {
      request: {
        url: CUSTOMER_REGISTER_POST_URL,
        data: userData,
        method: "POST"
      }
    }
  };
}

export function masterRegisterPost(userData) {
  return {
    type: MASTER_REGISTER_POST,
    payload: {
      request: {
        url: MASTER_REGISTER_POST_URL,
        data: userData,
        method: "POST"
      }
    }
  };
}

export function emailValidatePost(userData) {
  return {
    type: EMAIL_VALIDATE_POST,
    payload: {
      request: {
        url: EMAIL_VALIDATE_POST_URL,
        data: userData,
        method: "POST"
      }
    }
  };
}
