import {
  REFRESH_AUTHENTICATION_USER,
  REFRESH_AUTHENTICATION_USER_SUCCESS,
  REFRESH_AUTHENTICATION_USER_FAIL,
  LOGIN_AUTHENTICATION_USER,
  LOGIN_AUTHENTICATION_USER_SUCCESS,
  LOGIN_AUTHENTICATION_USER_FAIL,
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAIL,
  GET_LANGUAGE,
  GET_LANGUAGE_SUCCESS,
  GET_LANGUAGE_FAIL,
  GET_SITE,
  GET_SITE_SUCCESS,
  GET_SITE_FAIL,
  GET_QR_CODE,
  GET_QR_CODE_SUCCESS,
  GET_QR_CODE_FAIL,
  GET_COMPLAINT_OPTION_LIST,
  GET_COMPLAINT_OPTION_LIST_SUCCESS,
  GET_COMPLAINT_OPTION_LIST_FAIL,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGIN_POST,
  LOGIN_POST_FAIL,
  LOGIN_POST_SUCCESS
} from "../../types/generalServiceGet";
import { AsyncStorage } from "react-native";
import Sentry from "sentry-expo";
import ReloadExpoToken from "../../../helpers/ReloadExpoToken";

const INITIAL_STATE = {
  activeUser: {
    Id: 0
  },
  apiToken: "",
  error: "",
  getSiteLoading: true,
  getLanguageLoading: true,
  getQrCodeLoading: false,
  getLanguageError: true,
  getSiteError: true,
  getComplaintOptionListLoading: false,
  loginAuthenticationUserLoading: false,
  loginPostLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REFRESH_AUTHENTICATION_USER:
      return { ...state };
    case REFRESH_AUTHENTICATION_USER_SUCCESS:
      return { ...state, activeUser: action.payload.data };
    case REFRESH_AUTHENTICATION_USER_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "REFRESH_AUTHENTICATION_USER_FAIL",
            error: action
          })
        )
      );
      return { ...state };

    case LOGIN_AUTHENTICATION_USER:
      return { ...state, loginAuthenticationUserLoading: true };
    case LOGIN_AUTHENTICATION_USER_SUCCESS:
      if (action) {
        if (action.payload) {
          if (action.payload.data) {
            AsyncStorage.setItem("@activeUserID", action.payload.data.Id + "");
            ReloadExpoToken(action.payload.data.Id, "");
          }
        }
      }
      return {
        ...state,
        loginAuthenticationUserLoading: false,
        activeUser: action.payload.data
      };
    case LOGIN_AUTHENTICATION_USER_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "LOGIN_AUTHENTICATION_USER_FAIL",
            error: action
          })
        )
      );
      return { ...state, loginAuthenticationUserLoading: false };

    case LOGOUT_USER:
      return { ...state, logoutUserLoading: true };
    case LOGOUT_USER_SUCCESS:
      try {
        AsyncStorage.removeItem("@activeUserID");
      } catch (error) {}
      return {
        ...state,
        logoutUserLoading: false,
        activeUser: { Id: 0 }
      };
    case LOGOUT_USER_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "LOGOUT_USER_FAIL",
            error: action
          })
        )
      );
      return { ...state, logoutUserLoading: false };

    case GET_TOKEN:
      return { ...state };
    case GET_TOKEN_SUCCESS:
      return { ...state, apiToken: action.payload.data.Data };
    case GET_TOKEN_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_TOKEN_FAIL",
            error: action
          })
        )
      );
      return { ...state, error: "hata" };

    case GET_LANGUAGE:
      return { ...state, getLanguageLoading: true, getLanguageError: true };
    case GET_LANGUAGE_SUCCESS:
      return {
        ...state,
        getLanguageError: false,
        getLanguageLoading: false,
        getLanguageData: action.payload.data
      };
    case GET_LANGUAGE_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_LANGUAGE_FAIL",
            error: action
          })
        )
      );
      return {
        ...state,
        getLanguageLoading: false,
        getLanguageError: true,
        error: "hata"
      };

    case GET_SITE:
      return { ...state, getSiteLoading: true, getSiteError: true };
    case GET_SITE_SUCCESS:
      return {
        ...state,
        getSiteError: false,
        getSiteLoading: false,
        getSiteData: action.payload.data
      };
    case GET_SITE_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_SITE_FAIL",
            error: action
          })
        )
      );
      return {
        ...state,
        getSiteError: true,
        getSiteLoading: false,
        error: "hata"
      };

    case GET_QR_CODE:
      return { ...state, getQrCodeLoading: true };
    case GET_QR_CODE_SUCCESS:
      return {
        ...state,
        getQrCodeLoading: false,
        getQrCodeData: action.payload.data
      };
    case GET_QR_CODE_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_QR_CODE_FAIL",
            error: action
          })
        )
      );
      return { ...state, getQrCodeLoading: false, error: "hata" };

    case GET_COMPLAINT_OPTION_LIST:
      return { ...state, getComplaintOptionListLoading: true };
    case GET_COMPLAINT_OPTION_LIST_SUCCESS:
      return {
        ...state,
        getComplaintOptionListLoading: false,
        getComplaintOptionListResult: action.payload.data
      };
    case GET_COMPLAINT_OPTION_LIST_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_COMPLAINT_OPTION_LIST_FAIL",
            error: action
          })
        )
      );
      return { ...state, getComplaintOptionListLoading: false, error: "hata" };

    case LOGIN_POST:
      return { ...state, loginPostLoading: true };
    case LOGIN_POST_SUCCESS:
      let newActiveUser = {
        Id: 0
      };
      if (action) {
        if (action.payload) {
          if (action.payload.data) {
            if (action.payload.data.State) {
              AsyncStorage.setItem(
                "@activeUserID",
                action.payload.data.LoginUserData.Id + ""
              );
              newActiveUser = action.payload.data.LoginUserData;
            }
          }
        }
      }
      return {
        ...state,
        loginPostLoading: false,
        activeUser: newActiveUser
      };
    case LOGIN_POST_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "LOGIN_POST_FAIL",
            error: action
          })
        )
      );
      return {
        ...state,
        loginPostLoading: false,
        loginPostError: true
      };

    default:
      return { ...state };
  }
};
