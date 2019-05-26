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
  GET_SITE_FAIL
} from "../../types/generalServiceGet";
import Sentry from "sentry-expo";

const INITIAL_STATE = {
  activeUser: {
    Id: 0
  },
  apiToken: "",
  error: "",
  getSiteLoading: true,
  getLanguageLoading: true
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
      return { ...state };
    case LOGIN_AUTHENTICATION_USER_SUCCESS:
      return { ...state, activeUser: action.payload.data };
    case LOGIN_AUTHENTICATION_USER_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "LOGIN_AUTHENTICATION_USER_FAIL",
            error: action
          })
        )
      );
      return { ...state };

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
      return { ...state, getLanguageLoading: true };
    case GET_LANGUAGE_SUCCESS:
      return {
        ...state,
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
      return { ...state, getLanguageLoading: false, error: "hata" };

    case GET_SITE:
      return { ...state, getSiteLoading: true };
    case GET_SITE_SUCCESS:
      return {
        ...state,
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
      return { ...state, getSiteLoading: false, error: "hata" };
    default:
      return { ...state };
  }
};
