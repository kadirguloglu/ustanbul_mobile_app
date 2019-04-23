import {
  GET_SERVICE_CREATE_DATA,
  GET_SERVICE_CREATE_DATA_URL,
  SET_SERVICE_CREATE,
  SET_SERVICE_CREATE_URL,
  SET_USER_CHAT_MESSAGE_OLD,
  SET_USER_CHAT_MESSAGE_OLD_URL
} from "../types/serviceService";

export function serviceCreateData(categoryid, siteid, langid) {
  return {
    type: GET_SERVICE_CREATE_DATA,
    payload: {
      request: {
        url: GET_SERVICE_CREATE_DATA_URL + `/${categoryid}/${siteid}/${langid}`
      }
    }
  };
}

export function createService(serviceData, postedData) {
  let bodyFormData = new FormData();
  bodyFormData.append("service", JSON.stringify(postedData));
  serviceData.serviceImages.map((item, index) => {
    if (item.uri.uri) {
      bodyFormData.append("file" + index, {
        uri: item.uri.uri,
        type: item.image.type,
        name: item.image.fileName
      });
    }
  });
  return {
    type: SET_SERVICE_CREATE,
    payload: {
      request: {
        url: SET_SERVICE_CREATE_URL,
        method: "POST",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    }
  };
}

export function userChatMessageOld(openingUserID) {
  return {
    type: SET_USER_CHAT_MESSAGE_OLD,
    payload: {
      request: {
        url:
          SET_USER_CHAT_MESSAGE_OLD_URL +
          `/${states.activeUser.ID}/${openingUserID}`
      }
    }
  };
}
