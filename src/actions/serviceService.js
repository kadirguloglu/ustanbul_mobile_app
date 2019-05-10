import {
  GET_SERVICE_CREATE_DATA,
  GET_SERVICE_CREATE_DATA_URL, 
  SET_USER_CHAT_MESSAGE_OLD,
  SET_USER_CHAT_MESSAGE_OLD_URL,
  GET_PROPOSAL_DETAIL,
  GET_PROPOSAL_DETAIL_URL,
  UPDATE_PROPOSAL_PRICE,
  UPDATE_PROPOSAL_PRICE_URL
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
