import {
  CUSTOMER_REGISTER_POST,
  CUSTOMER_REGISTER_POST_FAIL,
  CUSTOMER_REGISTER_POST_SUCCESS,
  MASTER_REGISTER_POST,
  MASTER_REGISTER_POST_FAIL,
  MASTER_REGISTER_POST_SUCCESS,
  EMAIL_VALIDATE_POST,
  EMAIL_VALIDATE_POST_FAIL,
  EMAIL_VALIDATE_POST_SUCCESS
} from "../types/customerService";
import Sentry from "sentry-expo";
import { AsyncStorage } from "react-native";

const INITIAL_STATE = {
  customerRegisterPostLoading: false,
  emailValidatePostLoading: false,
  loginPostLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CUSTOMER_REGISTER_POST:
      return { ...state, customerRegisterPostLoading: true };
    case CUSTOMER_REGISTER_POST_SUCCESS:
      return {
        ...state,
        customerRegisterPostLoading: false,
        customerRegisterPostResult: action.payload.data
      };
    case CUSTOMER_REGISTER_POST_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "CUSTOMER_REGISTER_POST_FAIL",
            error: action
          })
        )
      );
      return {
        ...state,
        customerRegisterPostLoading: false,
        customerRegisterPostError: true
      };

    case MASTER_REGISTER_POST:
      return { ...state, masterRegisterPostLoading: true };
    case MASTER_REGISTER_POST_SUCCESS:
      return {
        ...state,
        masterRegisterPostLoading: false,
        masterRegisterPostResult: action.payload.data
      };
    case MASTER_REGISTER_POST_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "MASTER_REGISTER_POST_FAIL",
            error: action
          })
        )
      );
      return {
        ...state,
        masterRegisterPostLoading: false,
        masterRegisterPostError: true
      };

    case EMAIL_VALIDATE_POST:
      return { ...state, emailValidatePostLoading: true };
    case EMAIL_VALIDATE_POST_SUCCESS:
      return {
        ...state,
        emailValidatePostLoading: false,
        emailValidatePostResult: action.payload.data
      };
    case EMAIL_VALIDATE_POST_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "EMAIL_VALIDATE_POST_FAIL",
            error: action
          })
        )
      );
      return {
        ...state,
        emailValidatePostLoading: false,
        emailValidatePostError: true
      };
    default:
      return { ...state };
  }
};
