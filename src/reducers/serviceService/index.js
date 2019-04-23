import {
  GET_SERVICE_CREATE_DATA,
  GET_SERVICE_CREATE_DATA_SUCCESS,
  GET_SERVICE_CREATE_DATA_FAIL,
  SET_SERVICE_CREATE,
  SET_SERVICE_CREATE_SUCCESS,
  SET_SERVICE_CREATE_FAIL,
  SET_USER_CHAT_MESSAGE_OLD,
  SET_USER_CHAT_MESSAGE_OLD_SUCCESS,
  SET_USER_CHAT_MESSAGE_OLD_FAIL
} from "../../types/serviceService";

const INITIAL_STATE = {
  serviceCreateDataLoading: null,
  serviceCreateDataResult: {},
  error: "",
  serviceCreateLoading: null,
  oldChatMessageLoading: null,
  oldChatMessageDataState: null,
  oldChatMessageDataResult: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SERVICE_CREATE_DATA:
      return { ...state, serviceCreateDataLoading: true };
    case GET_SERVICE_CREATE_DATA_SUCCESS:
      return {
        ...state,
        serviceCreateDataLoading: false,
        serviceCreateDataResult: action.payload.data
      };
    case GET_SERVICE_CREATE_DATA_FAIL:
      return { ...state, serviceCreateDataLoading: false, error: "hata" };

    case SET_SERVICE_CREATE:
      return { ...state, serviceCreateLoading: true };
    case SET_SERVICE_CREATE_SUCCESS:
      return { ...state, serviceCreateLoading: false };
    case SET_SERVICE_CREATE_FAIL:
      return { ...state, serviceCreateLoading: false, error: "hata" };

    case SET_USER_CHAT_MESSAGE_OLD:
      return {
        ...state,
        oldChatMessageLoading: true,
        oldChatMessageDataState: true
      };
    case SET_USER_CHAT_MESSAGE_OLD_SUCCESS:
      return {
        ...state,
        oldChatMessageLoading: false,
        oldChatMessageDataState: true,
        oldChatMessageDataResult: action.payload.data
      };
    case SET_USER_CHAT_MESSAGE_OLD_FAIL:
      return {
        ...state,
        oldChatMessageLoading: false,
        oldChatMessageDataState: false
      };
    default:
      return { ...state };
  }
};
