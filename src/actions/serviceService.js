import {
  GET_SERVICE_CREATE_DATA,
  GET_SERVICE_CREATE_DATA_URL,
  SET_USER_CHAT_MESSAGE_OLD,
  SET_USER_CHAT_MESSAGE_OLD_URL,
  GET_PROPOSAL_DETAIL,
  GET_PROPOSAL_DETAIL_URL,
  UPDATE_PROPOSAL_PRICE,
  UPDATE_PROPOSAL_PRICE_URL,
  GET_SERVICE_CUSTOMER_PAGE,
  GET_SERVICE_CUSTOMER_PAGE_URL,
  GET_SERVICE_COMPANY_PAGE,
  GET_SERVICE_COMPANY_PAGE_URL,
  GET_MASTER_SERVICE_PROPOSAL_QUESTION_PAGE,
  GET_MASTER_SERVICE_PROPOSAL_QUESTION_PAGE_URL,
  POST_SERVICE_SEND_PROPOSAL,
  POST_SERVICE_SEND_PROPOSAL_URL,
  GET_SERVICE_PROPOSAL_PREVIEW,
  GET_SERVICE_PROPOSAL_PREVIEW_URL
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

export function proposalDetailData(proposalID) {
  return {
    type: GET_PROPOSAL_DETAIL,
    payload: {
      request: {
        url: GET_PROPOSAL_DETAIL_URL + `/${proposalID}`
      }
    }
  };
}

export function updateServiceProposal(price, proposalId) {
  return {
    type: UPDATE_PROPOSAL_PRICE,
    payload: {
      request: {
        url: UPDATE_PROPOSAL_PRICE_URL,
        data: { newPrice: price, Id: proposalId },
        method: "POST"
      }
    }
  };
}

export function getServiceCustomerPage(serviceId) {
  return {
    type: GET_SERVICE_CUSTOMER_PAGE,
    payload: {
      request: {
        url: `${GET_SERVICE_CUSTOMER_PAGE_URL}/${serviceId}`
      }
    }
  };
}

export function getServiceCompanyPage(activeUserId, page, count) {
  return {
    type: GET_SERVICE_COMPANY_PAGE,
    payload: {
      request: {
        url: `${GET_SERVICE_COMPANY_PAGE_URL}/${activeUserId}/${page}/${count}`
      }
    }
  };
}

export function getMasterServiceProposalQuestionPage(
  categoryId,
  siteId,
  langId
) {
  return {
    type: GET_MASTER_SERVICE_PROPOSAL_QUESTION_PAGE,
    payload: {
      request: {
        url: `${GET_MASTER_SERVICE_PROPOSAL_QUESTION_PAGE_URL}/${categoryId}/${siteId}/${langId}`
      }
    }
  };
}

export function sendServiceProposal(proposal) {
  return {
    type: POST_SERVICE_SEND_PROPOSAL,
    payload: {
      request: {
        url: POST_SERVICE_SEND_PROPOSAL_URL,
        data: proposal,
        method: "POST"
      }
    }
  };
}

export function serviceProposalPreview(proposalId) {
  return {
    type: GET_SERVICE_PROPOSAL_PREVIEW,
    payload: {
      request: {
        url: `${GET_SERVICE_PROPOSAL_PREVIEW_URL}/${proposalId}`
      }
    }
  };
}
