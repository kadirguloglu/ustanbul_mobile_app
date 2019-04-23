import {
  REFRESH_AUTHENTICATION_USER,
  REFRESH_AUTHENTICATION_USER_URL,
  GET_TOKEN,
  GET_TOKEN_URL,
  LOGIN_AUTHENTICATION_USER,
  LOGIN_AUTHENTICATION_USER_URL
} from "../types/generalServiceGet";

export function loginUser(email, password, id) {
  return {
    type: LOGIN_AUTHENTICATION_USER,
    payload: {
      request: {
        url:
          LOGIN_AUTHENTICATION_USER_URL +
          `?Email=${email}&Password=${password}&ID=${id}`
      }
    }
  };
}

export function refreshAuthenticatedUser() {
  return {
    type: REFRESH_AUTHENTICATION_USER,
    payload: {
      request: {
        url:
          REFRESH_AUTHENTICATION_USER_URL +
          `?Email=&Password=&ID=${states.activeUser.ID}`
      }
    }
  };
}

export function getApiToken(deviceid) {
  return {
    type: GET_TOKEN,
    payload: {
      request: {
        url: GET_TOKEN_URL + `/true/${deviceid}`
      }
    }
  };
}
