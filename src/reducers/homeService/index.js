import {
  GET_POPULAR_CATEGORIES,
  GET_POPULAR_CATEGORIES_SUCCESS,
  GET_POPULAR_CATEGORIES_FAIL,
  GET_SEARCH_CATEGORIES,
  GET_SEARCH_CATEGORIES_SUCCESS,
  GET_SEARCH_CATEGORIES_FAIL,
  GET_CONTACT_MESSAGE_SUBJECT,
  GET_CONTACT_MESSAGE_SUBJECT_SUCCESS,
  GET_CONTACT_MESSAGE_SUBJECT_FAIL,
  POST_CONTACT_MESSAGE,
  POST_CONTACT_MESSAGE_SUCCESS,
  POST_CONTACT_MESSAGE_FAIL,
  CATEGORY_SEARCH,
  CATEGORY_SEARCH_SUCCESS,
  CATEGORY_SEARCH_FAIL
} from "../../types/homeService";
import Sentry from "sentry-expo";

const INITIAL_STATE = {
  loading: null,
  popularCategoriesResult: [],
  error: "",
  searchLoading: null,
  searchCategoriesResult: [],
  contactSubjectLoading: true,
  contactSubjectResult: [],
  contactMessagePostResult: {},
  categorySearchData: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POPULAR_CATEGORIES:
      return { ...state, loading: true };
    case GET_POPULAR_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        popularCategoriesResult: action.payload.data
      };
    case GET_POPULAR_CATEGORIES_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_POPULAR_CATEGORIES_FAIL",
            error: action
          })
        )
      );
      return { ...state, loading: false, error: "hata" };

    case GET_SEARCH_CATEGORIES:
      return { ...state, searchLoading: true };
    case GET_SEARCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchCategoriesResult: action.payload.data.Data
      };
    case GET_SEARCH_CATEGORIES_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_SEARCH_CATEGORIES_FAIL",
            error: action
          })
        )
      );
      return { ...state, searchLoading: false, error: "hata" };

    case GET_CONTACT_MESSAGE_SUBJECT:
      return { ...state, contactSubjectLoading: true };
    case GET_CONTACT_MESSAGE_SUBJECT_SUCCESS:
      return {
        ...state,
        contactSubjectLoading: false,
        contactSubjectResult: action.payload.data
      };
    case GET_CONTACT_MESSAGE_SUBJECT_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_CONTACT_MESSAGE_SUBJECT_FAIL",
            error: action
          })
        )
      );
      return { ...state, contactSubjectLoading: false };

    case POST_CONTACT_MESSAGE:
      return { ...state, contactSubjectLoading: true };
    case POST_CONTACT_MESSAGE_SUCCESS:
      return {
        ...state,
        contactSubjectLoading: false,
        contactMessagePostResult: action.payload.data
      };
    case POST_CONTACT_MESSAGE_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "POST_CONTACT_MESSAGE_FAIL",
            error: action
          })
        )
      );
      return { ...state, contactSubjectLoading: false };

    case CATEGORY_SEARCH:
      return { ...state, categorySearchLoading: true };
    case CATEGORY_SEARCH_SUCCESS:
      return {
        ...state,
        categorySearchLoading: false,
        categorySearchData: action.payload.data
      };
    case CATEGORY_SEARCH_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "CATEGORY_SEARCH_FAIL",
            error: action
          })
        )
      );
      return {
        ...state,
        contactSubjectLoading: false,
        categorySearchError: true
      };
    default:
      return { ...state };
  }
};
