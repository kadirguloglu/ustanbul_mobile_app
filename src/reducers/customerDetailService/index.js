import {
  GET_CUSTOMER_SERVICE_COUNT,
  GET_CUSTOMER_SERVICE_COUNT_SUCCESS,
  GET_CUSTOMER_SERVICE_COUNT_FAIL,
  SET_USER_UPDATE,
  SET_USER_UPDATE_SUCCESS,
  SET_USER_UPDATE_FAIL,
  SET_CUSTOMER_UPDATE,
  SET_CUSTOMER_UPDATE_SUCCESS,
  SET_CUSTOMER_UPDATE_FAIL,
  GET_CUSTOMER_SERVICE_PREVIVEW,
  GET_CUSTOMER_SERVICE_PREVIVEW_SUCCESS,
  GET_CUSTOMER_SERVICE_PREVIVEW_FAIL,
  GET_SERVICE_PREVIEW_DETAIL_QUESTION,
  GET_SERVICE_PREVIEW_DETAIL_QUESTION_SUCCESS,
  GET_SERVICE_PREVIEW_DETAIL_QUESTION_FAIL
} from "../../types/customerDetailService";

const INITIAL_STATE = {
  customerServiceCountLoading: null,
  customerServiceCountResult: {},
  userUpdateLoading: null,
  userUpdateResult: null,
  error: "",
  customerServicePreviewLoading: true,
  servicePreviewListResult: [],
  servicePreviewDetailQuestionLoading: true,
  servicePreviewDetailQuestionResult: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CUSTOMER_SERVICE_COUNT:
      return { ...state, customerServiceCountLoading: true };
    case GET_CUSTOMER_SERVICE_COUNT_SUCCESS:
      return {
        ...state,
        customerServiceCountLoading: false,
        customerServiceCountResult: action.payload.data
      };
    case GET_CUSTOMER_SERVICE_COUNT_FAIL:
      return { ...state, customerServiceCountLoading: false, error: "hata" };

    case GET_CUSTOMER_SERVICE_PREVIVEW:
      return { ...state, customerServicePreviewLoading: true };
    case GET_CUSTOMER_SERVICE_PREVIVEW_SUCCESS:
      return {
        ...state,
        customerServicePreviewLoading: false,
        servicePreviewListResult: action.payload.data
      };
    case GET_CUSTOMER_SERVICE_PREVIVEW_FAIL:
      return { ...state, customerServicePreviewLoading: false };

    case SET_USER_UPDATE:
      return { ...state, userUpdateLoading: true, userUpdateResult: undefined };
    case SET_USER_UPDATE_SUCCESS:
      let result = false;
      if (action.payload.data.editUserResult) {
        result = action.payload.data.editUserResult;
      } else {
        result = action.payload.data;
      }
      if (typeof result == "string") result = result == "true";
      return { ...state, userUpdateLoading: false, userUpdateResult: result };
    case SET_USER_UPDATE_FAIL:
      return {
        ...state,
        userUpdateLoading: false,
        userUpdateResult: false,
        error: "hata"
      };

    case SET_CUSTOMER_UPDATE:
      return { ...state, userUpdateLoading: true, userUpdateResult: undefined };
    case SET_CUSTOMER_UPDATE_SUCCESS:
      let result1 = false;
      if (action.payload.data.editCustomer) {
        result1 = action.payload.data.editCustomerResult;
      } else {
        result1 = action.payload.data;
      }
      if (typeof result1 == "string") result1 = result1 == "true";
      return { ...state, userUpdateLoading: false, userUpdateResult: result1 };
    case SET_CUSTOMER_UPDATE_FAIL:
      return {
        ...state,
        userUpdateLoading: false,
        userUpdateResult: false,
        error: "hata"
      };

    case GET_SERVICE_PREVIEW_DETAIL_QUESTION:
      return { ...state, servicePreviewDetailQuestionLoading: true };
    case GET_SERVICE_PREVIEW_DETAIL_QUESTION_SUCCESS:
      return {
        ...state,
        servicePreviewDetailQuestionLoading: false,
        servicePreviewDetailQuestionResult: action.payload.data
      };
    case GET_SERVICE_PREVIEW_DETAIL_QUESTION_FAIL:
      return { ...state, servicePreviewDetailQuestionLoading: false };
    default:
      return { ...state };
  }
};
