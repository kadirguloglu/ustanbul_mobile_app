import {
  GET_CUSTOMER_SERVICE_COUNT,
  GET_CUSTOMER_SERVICE_COUNT_URL,
  SET_USER_UPDATE,
  SET_USER_UPDATE_URL,
  SET_CUSTOMER_UPDATE,
  SET_CUSTOMER_UPDATE_URL,
  GET_CUSTOMER_SERVICE_PREVIEW,
  GET_CUSTOMER_SERVICE_PREVIEW_URL,
  GET_SERVICE_PREVIEW_DETAIL_QUESTION,
  GET_SERVICE_PREVIEW_DETAIL_QUESTION_URL,
  POST_SEND_SERVICE_POINT,
  POST_SEND_SERVICE_POINT_URL,
  POST_APPROVED_SERVICE,
  POST_APPROVED_SERVICE_URL,
  GET_CANCEL_SERVICE,
  GET_CANCEL_SERVICE_URL
} from "../types/customerDetailService";

export function customerServiceCountData(activeUserId) {
  return {
    type: GET_CUSTOMER_SERVICE_COUNT,
    payload: {
      request: {
        url: GET_CUSTOMER_SERVICE_COUNT_URL + `/${activeUserId}`
      }
    }
  };
}

export function customerServicePreviewData(activeUserId, langId) {
  return {
    type: GET_CUSTOMER_SERVICE_PREVIEW,
    payload: {
      request: {
        url: GET_CUSTOMER_SERVICE_PREVIEW_URL + `/${activeUserId}/${langId}`
      }
    }
  };
}

export function userUpdateData(userData, langId) {
  delete userData.ProfilePicturePath;
  return {
    type: SET_USER_UPDATE,
    payload: {
      request: {
        url: SET_USER_UPDATE_URL,
        data: {
          u: JSON.stringify(userData),
          langID: langId
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

export function servicePreviewDetailQuestionData(serviceID) {
  return {
    type: GET_SERVICE_PREVIEW_DETAIL_QUESTION,
    payload: {
      request: {
        url: `${GET_SERVICE_PREVIEW_DETAIL_QUESTION_URL}/${serviceID}`
      }
    }
  };
}

export function sendServicePoint(data) {
  return {
    type: POST_SEND_SERVICE_POINT,
    payload: {
      request: {
        url: POST_SEND_SERVICE_POINT_URL,
        data: data,
        method: "POST"
      }
    }
  };
}

export function approvedService(Id) {
  return {
    type: POST_APPROVED_SERVICE,
    payload: {
      request: {
        url: `${POST_APPROVED_SERVICE_URL}/${Id}`
      }
    }
  };
}

export function cancelService(Id) {
  return {
    type: GET_CANCEL_SERVICE,
    payload: {
      request: {
        url: `${GET_CANCEL_SERVICE_URL}/${Id}`
      }
    }
  };
}
