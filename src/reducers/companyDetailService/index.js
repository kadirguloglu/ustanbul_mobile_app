import {
  GET_COMPANY_SERVICE_PREVIEW,
  GET_COMPANY_SERVICE_PREVIEW_SUCCESS,
  GET_COMPANY_SERVICE_PREVIEW_FAIL,
  GET_SERVICE_PREVIEW_DETAIL,
  GET_SERVICE_PREVIEW_DETAIL_SUCCESS,
  GET_SERVICE_PREVIEW_DETAIL_FAIL,
  GET_COMPANY_SERVICE_RATE,
  GET_COMPANY_SERVICE_RATE_SUCCESS,
  GET_COMPANY_SERVICE_RATE_FAIL,
  GET_CUSTOMER_SERVICE_IS_POINT,
  GET_CUSTOMER_SERVICE_IS_POINT_SUCCESS,
  GET_CUSTOMER_SERVICE_IS_POINT_FAIL,
  GET_CUSTOMER_SERVICE_OLD_POINT,
  GET_CUSTOMER_SERVICE_OLD_POINT_SUCCESS,
  GET_CUSTOMER_SERVICE_OLD_POINT_FAIL,
  GET_SERVICE_POINT_LIST,
  GET_SERVICE_POINT_LIST_SUCCESS,
  GET_SERVICE_POINT_LIST_FAIL
} from "../../types/companyDetailService";
import Sentry from "sentry-expo";

const INITIAL_STATE = {
  companyServicePreviewLoading: false,
  servicePreviewListResult: [],
  servicePreviewDetailLoading: false,
  servicePreviewDetailResult: [],
  companyServiceRateLoading: true,
  customerServiceIsPointLoading: true,
  customerServiceOldPointLoading: true,
  servicePointListLoading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COMPANY_SERVICE_PREVIEW:
      return { ...state, companyServicePreviewLoading: true };
    case GET_COMPANY_SERVICE_PREVIEW_SUCCESS:
      return {
        ...state,
        companyServicePreviewLoading: false,
        servicePreviewListResult: action.payload.data
      };
    case GET_COMPANY_SERVICE_PREVIEW_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_COMPANY_SERVICE_PREVIEW_FAIL",
            error: action
          })
        )
      );
      return { ...state, companyServicePreviewLoading: false };

    case GET_SERVICE_PREVIEW_DETAIL:
      return { ...state, servicePreviewDetailLoading: true };
    case GET_SERVICE_PREVIEW_DETAIL_SUCCESS:
      return {
        ...state,
        servicePreviewDetailLoading: false,
        servicePreviewDetailResult: action.payload.data
      };
    case GET_SERVICE_PREVIEW_DETAIL_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_SERVICE_PREVIEW_DETAIL_FAIL",
            error: action
          })
        )
      );
      return { ...state, servicePreviewDetailLoading: false };

    case GET_COMPANY_SERVICE_RATE:
      return { ...state, companyServiceRateLoading: true };
    case GET_COMPANY_SERVICE_RATE_SUCCESS:
      return {
        ...state,
        companyServiceRateLoading: false,
        companyServiceRateData: action.payload.data
      };
    case GET_COMPANY_SERVICE_RATE_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_COMPANY_SERVICE_RATE_FAIL",
            error: action
          })
        )
      );
      return { ...state, companyServiceRateLoading: false };

    case GET_CUSTOMER_SERVICE_IS_POINT:
      return { ...state, customerServiceIsPointLoading: true };
    case GET_CUSTOMER_SERVICE_IS_POINT_SUCCESS:
      return {
        ...state,
        customerServiceIsPointLoading: false,
        customerServiceIsPointData: action.payload.data
      };
    case GET_CUSTOMER_SERVICE_IS_POINT_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_CUSTOMER_SERVICE_IS_POINT_FAIL",
            error: action
          })
        )
      );
      return { ...state, customerServiceIsPointLoading: false };

    case GET_CUSTOMER_SERVICE_OLD_POINT:
      return { ...state, customerServiceOldPointLoading: true };
    case GET_CUSTOMER_SERVICE_OLD_POINT_SUCCESS:
      return {
        ...state,
        customerServiceOldPointLoading: false,
        customerServiceOldPointData: action.payload.data
      };
    case GET_CUSTOMER_SERVICE_OLD_POINT_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_CUSTOMER_SERVICE_OLD_POINT_FAIL",
            error: action
          })
        )
      );
      return { ...state, customerServiceOldPointLoading: false };

    case GET_SERVICE_POINT_LIST:
      return { ...state, servicePointListLoading: true };
    case GET_SERVICE_POINT_LIST_SUCCESS:
      return {
        ...state,
        servicePointListLoading: false,
        servicePointListData: action.payload.data
      };
    case GET_SERVICE_POINT_LIST_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_SERVICE_POINT_LIST_FAIL",
            error: action
          })
        )
      );
      return { ...state, servicePointListLoading: false };
    default:
      return { ...state };
  }
};
