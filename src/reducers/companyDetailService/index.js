import {
  GET_COMPANY_SERVICE_PREVIVEW,
  GET_COMPANY_SERVICE_PREVIVEW_SUCCESS,
  GET_COMPANY_SERVICE_PREVIVEW_FAIL,
  GET_SERVICE_PREVIEW_DETAIL,
  GET_SERVICE_PREVIEW_DETAIL_SUCCESS,
  GET_SERVICE_PREVIEW_DETAIL_FAIL
} from "../../types/companyDetailService";

const INITIAL_STATE = {
  companyServicePreviewLoading: null,
  servicePreviewListResult: {},
  servicePreviewDetailLoading: null,
  servicePreviewDetailResult: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COMPANY_SERVICE_PREVIVEW:
      return { ...state, companyServicePreviewLoading: true };
    case GET_COMPANY_SERVICE_PREVIVEW_SUCCESS:
      return {
        ...state,
        companyServicePreviewLoading: false,
        servicePreviewListResult: action.payload.data
      };
    case GET_COMPANY_SERVICE_PREVIVEW_FAIL:
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
      return { ...state, servicePreviewDetailLoading: false };
    default:
      return { ...state };
  }
};
