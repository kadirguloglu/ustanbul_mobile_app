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
  GET_CUSTOMER_SERVICE_PREVIEW,
  GET_CUSTOMER_SERVICE_PREVIEW_SUCCESS,
  GET_CUSTOMER_SERVICE_PREVIEW_FAIL,
  GET_SERVICE_PREVIEW_DETAIL_QUESTION,
  GET_SERVICE_PREVIEW_DETAIL_QUESTION_SUCCESS,
  GET_SERVICE_PREVIEW_DETAIL_QUESTION_FAIL,
  POST_SEND_SERVICE_POINT,
  POST_SEND_SERVICE_POINT_SUCCESS,
  POST_SEND_SERVICE_POINT_FAIL,
  POST_APPROVED_SERVICE,
  POST_APPROVED_SERVICE_SUCCESS,
  POST_APPROVED_SERVICE_FAIL,
  GET_CANCEL_SERVICE,
  GET_CANCEL_SERVICE_SUCCESS,
  GET_CANCEL_SERVICE_FAIL
} from "../../types/customerDetailService";
import Sentry from "sentry-expo";

const INITIAL_STATE = {
  customerServiceCountLoading: null,
  customerServiceCountResult: {},
  userUpdateLoading: null,
  userUpdateResult: null,
  error: "",
  customerServicePreviewLoading: true,
  servicePreviewListResult: [],
  servicePreviewDetailQuestionLoading: true,
  servicePreviewDetailQuestionResult: [],
  approvedServiceLoading: false,
  getCancelServiceLoading: false
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
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_CUSTOMER_SERVICE_COUNT_FAIL",
            error: action
          })
        )
      );
      return { ...state, customerServiceCountLoading: false, error: "hata" };

    case GET_CUSTOMER_SERVICE_PREVIEW:
      return { ...state, customerServicePreviewLoading: true };
    case GET_CUSTOMER_SERVICE_PREVIEW_SUCCESS:
      return {
        ...state,
        customerServicePreviewLoading: false,
        servicePreviewListResult: action.payload.data
      };
    case GET_CUSTOMER_SERVICE_PREVIEW_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_CUSTOMER_SERVICE_PREVIEW_FAIL",
            error: action
          })
        )
      );
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
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "SET_USER_UPDATE_FAIL",
            error: action
          })
        )
      );
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
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "SET_CUSTOMER_UPDATE_FAIL",
            error: action
          })
        )
      );
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
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_SERVICE_PREVIEW_DETAIL_QUESTION_FAIL",
            error: action
          })
        )
      );
      return { ...state, servicePreviewDetailQuestionLoading: false };

    case POST_SEND_SERVICE_POINT:
      return { ...state, sendServicePointLoading: true };
    case POST_SEND_SERVICE_POINT_SUCCESS:
      return {
        ...state,
        sendServicePointLoading: false,
        sendServicePointResult: action.payload.data
      };
    case POST_SEND_SERVICE_POINT_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "POST_SEND_SERVICE_POINT_FAIL",
            error: action
          })
        )
      );
      return { ...state, sendServicePointLoading: false };

    case POST_APPROVED_SERVICE:
      return { ...state, approvedServiceLoading: true };
    case POST_APPROVED_SERVICE_SUCCESS:
      return {
        ...state,
        approvedServiceLoading: false,
        approvedServiceResult: action.payload.data
      };
    case POST_APPROVED_SERVICE_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "POST_APPROVED_SERVICE_FAIL",
            error: action
          })
        )
      );
      return { ...state, approvedServiceLoading: false };

    case GET_CANCEL_SERVICE:
      return { ...state, getCancelServiceLoading: true };
    case GET_CANCEL_SERVICE_SUCCESS:
      return {
        ...state,
        getCancelServiceLoading: false,
        getCancelServiceResult: action.payload.data
      };
    case GET_CANCEL_SERVICE_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_CANCEL_SERVICE_FAIL",
            error: action
          })
        )
      );
      return { ...state, getCancelServiceLoading: false };
    default:
      return { ...state };
  }
};
