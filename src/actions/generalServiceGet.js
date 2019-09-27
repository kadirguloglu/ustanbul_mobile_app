import {
  REFRESH_AUTHENTICATION_USER,
  REFRESH_AUTHENTICATION_USER_URL,
  GET_TOKEN,
  GET_TOKEN_URL,
  LOGIN_AUTHENTICATION_USER,
  LOGIN_AUTHENTICATION_USER_URL,
  GET_LANGUAGE,
  GET_LANGUAGE_URL,
  GET_SITE,
  GET_SITE_URL,
  GET_QR_CODE,
  GET_QR_CODE_URL,
  GET_COMPLAINT_OPTION_LIST,
  GET_COMPLAINT_OPTION_LIST_URL,
  LOGOUT_USER,
  LOGOUT_USER_URL,
  LOGIN_POST,
  LOGIN_POST_URL
} from "../types/generalServiceGet";

export function loginUser(email, password, id) {
  if (id === null) id = 0;
  if (id === undefined) id = 0;
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

export function refreshAuthenticatedUser(Id) {
  return {
    type: REFRESH_AUTHENTICATION_USER,
    payload: {
      request: {
        url: REFRESH_AUTHENTICATION_USER_URL + `?Email=&Password=&ID=${Id}`
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

export function getLanguage(languageId) {
  return {
    type: GET_LANGUAGE,
    payload: {
      request: {
        url: `${GET_LANGUAGE_URL}/${languageId}`
      }
    }
  };
}

export function getSite(siteId) {
  return {
    type: GET_SITE,
    payload: {
      request: {
        url: `${GET_SITE_URL}/${siteId}`
      }
    }
  };
}

export function getQrCode(serviceId) {
  return {
    type: GET_QR_CODE,
    payload: {
      request: {
        url: `${GET_QR_CODE_URL}/${serviceId}`
      }
    }
  };
}

export function getComplaintOptionList(langId) {
  return {
    type: GET_COMPLAINT_OPTION_LIST,
    payload: {
      request: {
        url: `${GET_COMPLAINT_OPTION_LIST_URL}/${langId}`
      }
    }
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: {
      request: {
        url: `${LOGOUT_USER_URL}`
      }
    }
  };
}

export function loginPost(userData) {
  return {
    type: LOGIN_POST,
    payload: {
      request: {
        url: LOGIN_POST_URL,
        data: userData,
        method: "POST"
      }
    }
  };
}
