import {
  GET_CATEGORIES_AND_SUBCATEGORIES,
  GET_CATEGORIES_AND_SUBCATEGORIES_SUCCESS,
  GET_CATEGORIES_AND_SUBCATEGORIES_FAIL
} from "../../types/categoryService";
import Sentry from "sentry-expo";

const INITIAL_STATE = {
  serviceCategoriesResult: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORIES_AND_SUBCATEGORIES:
      return { ...state };
    case GET_CATEGORIES_AND_SUBCATEGORIES_SUCCESS:
      return { ...state, serviceCategoriesResult: action.payload.data };
    case GET_CATEGORIES_AND_SUBCATEGORIES_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "REFRESH_AUTHENTICATION_USER_FAIL",
            error: action
          })
        )
      );
      return { ...state, error: "hata" };
    default:
      return { ...state };
  }
};
