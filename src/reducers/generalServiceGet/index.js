import {
  REFRESH_AUTHENTICATION_USER,
  REFRESH_AUTHENTICATION_USER_SUCCESS,
  REFRESH_AUTHENTICATION_USER_FAIL,
  LOGIN_AUTHENTICATION_USER,
  LOGIN_AUTHENTICATION_USER_SUCCESS,
  LOGIN_AUTHENTICATION_USER_FAIL,
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAIL
} from "../../types/generalServiceGet";

const INITIAL_STATE = {
  activeUser: {
    Id: 0
  },
  apiToken: "",
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REFRESH_AUTHENTICATION_USER:
      return { ...state };
    case REFRESH_AUTHENTICATION_USER_SUCCESS:
      return { ...state, activeUser: action.payload.data };
    case REFRESH_AUTHENTICATION_USER_FAIL:
      return { ...state };

    case LOGIN_AUTHENTICATION_USER:
      return { ...state };
    case LOGIN_AUTHENTICATION_USER_SUCCESS:
      return { ...state, activeUser: action.payload.data };
    case LOGIN_AUTHENTICATION_USER_FAIL:
      return { ...state };

    case GET_TOKEN:
      return { ...state };
    case GET_TOKEN_SUCCESS:
      return { ...state, apiToken: action.payload.data.Data };
    case GET_TOKEN_FAIL:
      return { ...state, error: "hata" };
    default:
      return { ...state };
  }
};
