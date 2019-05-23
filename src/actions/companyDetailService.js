import {
  GET_COMPANY_SERVICE_PREVIVEW,
  GET_COMPANY_SERVICE_PREVIVEW_URL,
  GET_SERVICE_PREVIEW_DETAIL,
  GET_SERVICE_PREVIEW_DETAIL_URL
} from "../types/companyDetailService";

export function companyServicePreviewData(activeUserId, langId) {
  return {
    type: GET_COMPANY_SERVICE_PREVIVEW,
    payload: {
      request: {
        url: GET_COMPANY_SERVICE_PREVIVEW_URL + `/${activeUserId}/${langId}`
      }
    }
  };
}

export function servicePreviewDetailData(serviceID) {
  return {
    type: GET_SERVICE_PREVIEW_DETAIL,
    payload: {
      request: {
        url: GET_SERVICE_PREVIEW_DETAIL_URL + `/${serviceID}`
      }
    }
  };
}
