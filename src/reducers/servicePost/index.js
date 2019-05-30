import {
  SET_SERVICE_CREATE,
  SET_SERVICE_CREATE_SUCCESS,
  SET_SERVICE_CREATE_FAIL,
  SET_SERVICE_POST_SERVICE,
  SET_SERVICE_POST_SERVICE_SUCCESS,
  SET_SERVICE_POST_SERVICE_FAIL,
  GET_READ_QR_CODE,
  GET_READ_QR_CODE_SUCCESS,
  GET_READ_QR_CODE_FAIL,
  POST_SERVICE_COMPLAINT,
  POST_SERVICE_COMPLAINT_SUCCESS,
  POST_SERVICE_COMPLAINT_FAIL
} from "../../types/servicePost";
import Sentry from "sentry-expo";

const INITIAL_STATE = {
  serviceCreateLoading: false,
  servicePostServiceLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SERVICE_CREATE:
      return { ...state, serviceCreateLoading: true };
    case SET_SERVICE_CREATE_SUCCESS:
      return { ...state, serviceCreateLoading: false };
    case SET_SERVICE_CREATE_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "SET_SERVICE_CREATE_FAIL",
            error: action
          })
        )
      );
      return { ...state, serviceCreateLoading: false, error: "hata" };

    case SET_SERVICE_POST_SERVICE:
      return { ...state, servicePostServiceLoading: true };
    case SET_SERVICE_POST_SERVICE_SUCCESS:
      return {
        ...state,
        servicePostServiceLoading: false,
        servicePostServiceResult: action.payload.data
      };
    case SET_SERVICE_POST_SERVICE_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "SET_SERVICE_POST_SERVICE_FAIL",
            error: action
          })
        )
      );
      return { ...state, servicePostServiceLoading: false, error: "hata" };

    case GET_READ_QR_CODE:
      return { ...state, readQrCodeLoading: true };
    case GET_READ_QR_CODE_SUCCESS:
      return {
        ...state,
        readQrCodeLoading: false,
        readQrCodeResult: action.payload.data
      };
    case GET_READ_QR_CODE_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_READ_QR_CODE_FAIL",
            error: action
          })
        )
      );
      return { ...state, readQrCodeLoading: false, error: "hata" };

    case POST_SERVICE_COMPLAINT:
      return { ...state, postServiceComplaintLoading: true };
    case POST_SERVICE_COMPLAINT_SUCCESS:
      return {
        ...state,
        postServiceComplaintLoading: false,
        postServiceComplaintResult: action.payload.data
      };
    case POST_SERVICE_COMPLAINT_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "POST_SERVICE_COMPLAINT_FAIL",
            error: action
          })
        )
      );
      return { ...state, postServiceComplaintLoading: false, error: "hata" };
    default:
      return { ...state };
  }
};
