import {
  GET_COMPANY_SERVICE_PREVIEW,
  GET_COMPANY_SERVICE_PREVIEW_URL,
  GET_SERVICE_PREVIEW_DETAIL,
  GET_SERVICE_PREVIEW_DETAIL_URL,
  GET_COMPANY_SERVICE_RATE,
  GET_COMPANY_SERVICE_RATE_URL,
  GET_CUSTOMER_SERVICE_IS_POINT,
  GET_CUSTOMER_SERVICE_IS_POINT_URL,
  GET_CUSTOMER_SERVICE_OLD_POINT,
  GET_CUSTOMER_SERVICE_OLD_POINT_URL,
  GET_SERVICE_POINT_LIST,
  GET_SERVICE_POINT_LIST_URL
} from "../types/companyDetailService";

export function companyServicePreviewData(activeUserId, langId) {
  return {
    type: GET_COMPANY_SERVICE_PREVIEW,
    payload: {
      request: {
        url: GET_COMPANY_SERVICE_PREVIEW_URL + `/${activeUserId}/${langId}`
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

export function companyServiceRateData(masterId, langId) {
  return {
    type: GET_COMPANY_SERVICE_RATE,
    payload: {
      request: {
        url: `${GET_COMPANY_SERVICE_RATE_URL}/${masterId}/${langId}`
      }
    }
  };
}

export function customerServiceIsPointData(serviceId, langId) {
  return {
    type: GET_CUSTOMER_SERVICE_IS_POINT,
    payload: {
      request: {
        url: `${GET_CUSTOMER_SERVICE_IS_POINT_URL}/${serviceId}/${langId}`
      }
    }
  };
}

export function customerServiceOldPointData(serviceId, langId) {
  return {
    type: GET_CUSTOMER_SERVICE_OLD_POINT,
    payload: {
      request: {
        url: `${GET_CUSTOMER_SERVICE_OLD_POINT_URL}/${serviceId}/${langId}`
      }
    }
  };
}

export function servicePointListData(langId) {
  return {
    type: GET_SERVICE_POINT_LIST,
    payload: {
      request: {
        url: `${GET_SERVICE_POINT_LIST_URL}/${langId}`
      }
    }
  };
}
