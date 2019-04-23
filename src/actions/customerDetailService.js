import {
  GET_CUSTOMER_SERVICE_COUNT,
  GET_CUSTOMER_SERVICE_COUNT_URL,
  SET_USER_UPDATE,
  SET_USER_UPDATE_URL,
  SET_CUSTOMER_UPDATE,
  SET_CUSTOMER_UPDATE_URL
} from "../types/customerDetailService";

export function customerServiceCountData() {
  return {
    type: GET_CUSTOMER_SERVICE_COUNT,
    payload: {
      request: {
        url: GET_CUSTOMER_SERVICE_COUNT_URL + `/${states.activeUser.ID}`
      }
    }
  };
}

export function userUpdateData(userData) {
  delete userData.ProfilePicturePath;
  return {
    type: SET_USER_UPDATE,
    payload: {
      request: {
        url: SET_USER_UPDATE_URL,
        data: {
          u: JSON.stringify(userData),
          langID: states.LangID
        },
        method: "POST"
      }
    }
  };
}

export function customerUpdateData(customer) {
  return {
    type: SET_CUSTOMER_UPDATE,
    payload: {
      request: {
        url: SET_CUSTOMER_UPDATE_URL,
        data: customer,
        method: "POST"
      }
    }
  };
}
