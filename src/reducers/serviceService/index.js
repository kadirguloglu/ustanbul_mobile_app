import {
  GET_SERVICE_CREATE_DATA,
  GET_SERVICE_CREATE_DATA_SUCCESS,
  GET_SERVICE_CREATE_DATA_FAIL,
  SET_USER_CHAT_MESSAGE_OLD,
  SET_USER_CHAT_MESSAGE_OLD_SUCCESS,
  SET_USER_CHAT_MESSAGE_OLD_FAIL,
  UPDATE_PROPOSAL_PRICE,
  UPDATE_PROPOSAL_PRICE_SUCCESS,
  UPDATE_PROPOSAL_PRICE_FAIL,
  GET_PROPOSAL_DETAIL,
  GET_PROPOSAL_DETAIL_SUCCESS,
  GET_PROPOSAL_DETAIL_FAIL,
  GET_SERVICE_CUSTOMER_PAGE,
  GET_SERVICE_CUSTOMER_PAGE_SUCCESS,
  GET_SERVICE_CUSTOMER_PAGE_FAIL,
  GET_SERVICE_COMPANY_PAGE,
  GET_SERVICE_COMPANY_PAGE_SUCCESS,
  GET_SERVICE_COMPANY_PAGE_FAIL,
  GET_MASTER_SERVICE_PROPOSAL_QUESTION_PAGE,
  GET_MASTER_SERVICE_PROPOSAL_QUESTION_PAGE_SUCCESS,
  GET_MASTER_SERVICE_PROPOSAL_QUESTION_PAGE_FAIL
} from "../../types/serviceService";
import Sentry from "sentry-expo";

const INITIAL_STATE = {
  serviceCreateDataLoading: true,
  serviceCreateDataResult: {},
  error: "",
  serviceCreateLoading: null,
  oldChatMessageLoading: null,
  oldChatMessageDataState: null,
  oldChatMessageDataResult: {},
  serviceCustomerPageLoading: true,
  serviceCompanyPageLoading: true,
  serviceCompanyPageData: [],
  masterServiceProposalQuestionPageLoading: true,
  masterServiceProposalQuestionPageData: []
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
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_SERVICE_CREATE_DATA_FAIL",
            error: action
          })
        )
      );
      return { ...state, serviceCreateDataLoading: false, error: "hata" };

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
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "SET_USER_CHAT_MESSAGE_OLD_FAIL",
            error: action
          })
        )
      );
      return {
        ...state,
        oldChatMessageLoading: false,
        oldChatMessageDataState: false
      };

    case GET_PROPOSAL_DETAIL:
      return { ...state, proposalDetailLoading: true };
    case GET_PROPOSAL_DETAIL_SUCCESS:
      return {
        ...state,
        proposalDetailLoading: false,
        proposalDetailResult: action.payload.data
      };
    case GET_PROPOSAL_DETAIL_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_PROPOSAL_DETAIL_FAIL",
            error: action
          })
        )
      );
      return { ...state, proposalDetailLoading: false };

    case UPDATE_PROPOSAL_PRICE:
      return { ...state, updateServiceProposalLoading: true };
    case UPDATE_PROPOSAL_PRICE_SUCCESS:
      return {
        ...state,
        updateServiceProposalLoading: false,
        updateServiceProposalResult: action.payload.data
      };
    case UPDATE_PROPOSAL_PRICE_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "UPDATE_PROPOSAL_PRICE_FAIL",
            error: action
          })
        )
      );
      return { ...state, updateServiceProposalLoading: false };

    case GET_SERVICE_CUSTOMER_PAGE:
      return { ...state, serviceCustomerPageLoading: true };
    case GET_SERVICE_CUSTOMER_PAGE_SUCCESS:
      return {
        ...state,
        serviceCustomerPageLoading: false,
        serviceCustomerPageData: action.payload.data
      };
    case GET_SERVICE_CUSTOMER_PAGE_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_SERVICE_CUSTOMER_PAGE_FAIL",
            error: action
          })
        )
      );
      return { ...state, serviceCustomerPageLoading: false };

    case GET_SERVICE_COMPANY_PAGE:
      return { ...state, serviceCompanyPageLoading: true };
    case GET_SERVICE_COMPANY_PAGE_SUCCESS:
      return {
        ...state,
        serviceCompanyPageLoading: false,
        serviceCompanyPageData: action.payload.data
      };
    case GET_SERVICE_COMPANY_PAGE_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_SERVICE_COMPANY_PAGE_FAIL",
            error: action
          })
        )
      );
      return { ...state, serviceCompanyPageLoading: false };

    case GET_MASTER_SERVICE_PROPOSAL_QUESTION_PAGE:
      return { ...state, masterServiceProposalQuestionPageLoading: true };
    case GET_MASTER_SERVICE_PROPOSAL_QUESTION_PAGE_SUCCESS:
      return {
        ...state,
        masterServiceProposalQuestionPageLoading: false,
        masterServiceProposalQuestionPageData: action.payload.data
      };
    case GET_MASTER_SERVICE_PROPOSAL_QUESTION_PAGE_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_MASTER_SERVICE_PROPOSAL_QUESTION_PAGE_FAIL",
            error: action
          })
        )
      );
      return { ...state, masterServiceProposalQuestionPageLoading: false };
    default:
      return { ...state };
  }
};
