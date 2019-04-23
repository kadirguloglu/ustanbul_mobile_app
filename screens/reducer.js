import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { ProjectAlert, storage } from './functions'
import * as contants from './contants'
let apiUrl = 'http://192.168.193.2:45455';
let apiToken = '';

const initialState = {
  popularCategoriesResult: [],
  searchCategoriesResult: [],
  activeUser: null,
  serviceCategoriesResult: [],
  serviceCreateDataResult: [],
  customerServiceCountResult: [],
  messageUserListResult: [],
  activeLang: {
    ID: 1
  },
  LangID: 1,
  SiteID: 1,
  oldChatMessageDataResult: [],
  contactSubjectResult: [],
  contactMessagePostResult: false,
  servicePreviewDetailResult: {},
  servicePreviewDetailQuestionResult: [],
  proposalDetailResult: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case contants.GET_POPULAR_CATEGORIES:
      return { ...state, loading: true };
    case contants.GET_POPULAR_CATEGORIES_SUCCESS:
      return { ...state, loading: false, popularCategoriesResult: action.payload.data.Data };
    case contants.GET_POPULAR_CATEGORIES_FAIL:
      return { ...state, loading: false, error: 'hata' };


    case contants.GET_SEARCH_CATEGORIES:
      return { ...state, searchLoading: true };
    case contants.GET_SEARCH_CATEGORIES_SUCCESS:
      return { ...state, searchLoading: false, searchCategoriesResult: action.payload.data.Data };
    case contants.GET_SEARCH_CATEGORIES_FAIL:
      return { ...state, searchLoading: false, error: 'hata' };


    case contants.GET_TOKEN:
      return { ...state };
    case contants.GET_TOKEN_SUCCESS:
      return { ...state, apiToken: action.payload.data.Data };
    case contants.GET_TOKEN_FAIL:
      return { ...state, error: 'hata' };


    case contants.GET_CATEGORIES_AND_SUBCATEGORIES:
      return { ...state };
    case contants.GET_CATEGORIES_AND_SUBCATEGORIES_SUCCESS:
      return { ...state, serviceCategoriesResult: action.payload.data };
    case contants.GET_CATEGORIES_AND_SUBCATEGORIES_FAIL:
      return { ...state, error: 'hata' };


    case contants.GET_SERVICE_CREATE_DATA:
      return { ...state, serviceCreateDataLoading: true };
    case contants.GET_SERVICE_CREATE_DATA_SUCCESS:
      return { ...state, serviceCreateDataLoading: false, serviceCreateDataResult: action.payload.data };
    case contants.GET_SERVICE_CREATE_DATA_FAIL:
      return { ...state, serviceCreateDataLoading: false, error: 'hata' };


    case contants.SET_SERVICE_CREATE:
      return { ...state, serviceCreateLoading: true };
    case contants.SET_SERVICE_CREATE_SUCCESS:
      return { ...state, serviceCreateLoading: false, };
    case contants.SET_SERVICE_CREATE_FAIL:
      return { ...state, serviceCreateLoading: false, error: 'hata' };


    case contants.GET_CUSTOMER_SERVICE_COUNT:
      return { ...state, customerServiceCountLoading: true };
    case contants.GET_CUSTOMER_SERVICE_COUNT_SUCCESS:
      return { ...state, customerServiceCountLoading: false, customerServiceCountResult: action.payload.data };
    case contants.GET_CUSTOMER_SERVICE_COUNT_FAIL:
      return { ...state, customerServiceCountLoading: false, error: 'hata' };


    case contants.SET_USER_UPDATE:
      return { ...state, userUpdateLoading: true, userUpdateResult: undefined };
    case contants.SET_USER_UPDATE_SUCCESS:
      let result = false;
      if (action.payload.data.editUserResult) {
        result = action.payload.data.editUserResult;
      } else {
        result = action.payload.data;
      }
      if (typeof (result) == "string")
        result = result == "true";
      return { ...state, userUpdateLoading: false, userUpdateResult: result };
    case contants.SET_USER_UPDATE_FAIL:
      return { ...state, userUpdateLoading: false, userUpdateResult: false, error: 'hata' };


    case contants.SET_CUSTOMER_UPDATE:
      return { ...state, userUpdateLoading: true, userUpdateResult: undefined };
    case contants.SET_CUSTOMER_UPDATE_SUCCESS:
      let result1 = false;
      if (action.payload.data.editCustomer) {
        result1 = action.payload.data.editCustomerResult;
      } else {
        result1 = action.payload.data;
      }
      if (typeof (result1) == "string")
        result1 = result1 == "true";
      return { ...state, userUpdateLoading: false, userUpdateResult: result1 };
    case contants.SET_CUSTOMER_UPDATE_FAIL:
      return { ...state, userUpdateLoading: false, userUpdateResult: false, error: 'hata' };


    case contants.REFRESH_AUTHENTICATION_USER:
      return { ...state };
    case contants.REFRESH_AUTHENTICATION_USER_SUCCESS:
      AsyncStorage.setItem('_AuthenticationUser', JSON.stringify(action.payload.data));
      return { ...state, activeUser: action.payload.data };
    case contants.REFRESH_AUTHENTICATION_USER_FAIL:
      return { ...state };


    case contants.GET_USER_MESSAGE_LIST:
      return { ...state, messageUserListLoading: true };
    case contants.GET_USER_MESSAGE_LIST_SUCCESS:
      return { ...state, messageUserListLoading: false, messageUserListResult: action.payload.data };
    case contants.GET_USER_MESSAGE_LIST_FAIL:
      return { ...state, messageUserListLoading: false };


    case contants.POST_USER_CHAT_READ_MESSAGE:
      return { ...state };
    case contants.POST_USER_CHAT_READ_MESSAGE_SUCCESS:
      return { ...state };
    case contants.POST_USER_CHAT_READ_MESSAGE_FAIL:
      return { ...state };


    case contants.SET_USER_CHAT_MESSAGE_OLD:
      return { ...state, oldChatMessageLoading: true, oldChatMessageDataState: true };
    case contants.SET_USER_CHAT_MESSAGE_OLD_SUCCESS:
      return { ...state, oldChatMessageLoading: false, oldChatMessageDataState: true, oldChatMessageDataResult: action.payload.data };
    case contants.SET_USER_CHAT_MESSAGE_OLD_FAIL:
      return { ...state, oldChatMessageLoading: false, oldChatMessageDataState: false };


    case contants.GET_CONTACT_MESSAGE_SUBJECT:
      return { ...state, contactSubjectLoading: true };
    case contants.GET_CONTACT_MESSAGE_SUBJECT_SUCCESS:
      return { ...state, contactSubjectLoading: false, contactSubjectResult: action.payload.data };
    case contants.GET_CONTACT_MESSAGE_SUBJECT_FAIL:
      return { ...state, contactSubjectLoading: false };


    case contants.POST_CONTACT_MESSAGE:
      return { ...state, contactSubjectLoading: true };
    case contants.POST_CONTACT_MESSAGE_SUCCESS:
      return { ...state, contactSubjectLoading: false, contactMessagePostResult: action.payload.data };
    case contants.POST_CONTACT_MESSAGE_FAIL:
      return { ...state, contactSubjectLoading: false };


    case contants.GET_COMPANY_SERVICE_PREVIVEW:
      return { ...state, companyServicePreviewLoading: true };
    case contants.GET_COMPANY_SERVICE_PREVIVEW_SUCCESS:
      return { ...state, companyServicePreviewLoading: false, servicePreviewListResult: action.payload.data };
    case contants.GET_COMPANY_SERVICE_PREVIVEW_FAIL:
      return { ...state, companyServicePreviewLoading: false };


    case contants.GET_SERVICE_PREVIEW_DETAIL:
      return { ...state, servicePreviewDetailLoading: true };
    case contants.GET_SERVICE_PREVIEW_DETAIL_SUCCESS:
      return { ...state, servicePreviewDetailLoading: false, servicePreviewDetailResult: action.payload.data };
    case contants.GET_SERVICE_PREVIEW_DETAIL_FAIL:
      return { ...state, servicePreviewDetailLoading: false };


    case contants.GET_SERVICE_PREVIEW_DETAIL_QUESTION:
      return { ...state, servicePreviewDetailQuestionLoading: true };
    case contants.GET_SERVICE_PREVIEW_DETAIL_QUESTION_SUCCESS:
      return { ...state, servicePreviewDetailQuestionLoading: false, servicePreviewDetailQuestionResult: action.payload.data };
    case contants.GET_SERVICE_PREVIEW_DETAIL_QUESTION_FAIL:
      return { ...state, servicePreviewDetailQuestionLoading: false };


    case contants.LOGOUT_USER:
      storage.remove({
        key: 'AuthenticationUser'
      });
      storage.remove({
        key: 'activeUserID'
      });
      return { ...state, isLoginState: false, activeUser: null };
    case contants.LOGOUT_USER_SUCCESS:
      return { ...state };
    case contants.LOGOUT_USER_FAIL:
      return { ...state };


    case contants.LOGIN_USER:
      return { ...state, activeUser: null, isLoginState: true };
    case contants.LOGIN_USER_SUCCESS:
      if (action.payload.data.GetActiveUserViewResult.ErrorText == "") {
        storage.save({
          key: 'AuthenticationUser',
          data: action.payload.data.GetActiveUserViewResult
        });
        storage.save({
          key: 'activeUserID',
          data: action.payload.data.GetActiveUserViewResult.ID
        })
        return { ...state, activeUser: action.payload.data.GetActiveUserViewResult, errorLoginUser: action.payload.data.GetActiveUserViewResult, isLoginState: false };
      }
      return { ...state, errorLoginUser: action.payload.data.GetActiveUserViewResult, isLoginState: false }
    case contants.LOGIN_USER_FAIL:
      return { ...state, activeUser: null, isLoginState: false };


    case contants.GET_PROPOSAL_DETAIL:
      return { ...state, proposalDetailLoading: true };
    case contants.GET_PROPOSAL_DETAIL_SUCCESS:
      return { ...state, proposalDetailLoading: false, proposalDetailResult: action.payload.data };
    case contants.GET_PROPOSAL_DETAIL_FAIL:
      return { ...state, proposalDetailLoading: false };


    case contants.UPDATE_PROPOSAL_PRICE:
      return { ...state, updateServiceProposalLoading: true };
    case contants.UPDATE_PROPOSAL_PRICE_SUCCESS:
      return { ...state, updateServiceProposalLoading: false, updateServiceProposalResult: action.payload.data };
    case contants.UPDATE_PROPOSAL_PRICE_FAIL:
      return { ...state, updateServiceProposalLoading: false };


    case contants.GET_CUSTOMER_SERVICE_PREVIVEW:
      return { ...state, customerServicePreviewLoading: true };
    case contants.GET_CUSTOMER_SERVICE_PREVIVEW_SUCCESS:
      return { ...state, customerServicePreviewLoading: false, servicePreviewListResult: action.payload.data };
    case contants.GET_CUSTOMER_SERVICE_PREVIVEW_FAIL:
      return { ...state, customerServicePreviewLoading: false };
    default:
      return state;
  }
}

export const states = initialState;