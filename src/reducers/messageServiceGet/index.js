import {
  GET_USER_MESSAGE_LIST,
  GET_USER_MESSAGE_LIST_SUCCESS,
  GET_USER_MESSAGE_LIST_FAIL
} from "../../types/messageServiceGet";
import Sentry from "sentry-expo";

const INITIAL_STATE = {
  messageUserListLoading: true,
  messageUserListResult: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_MESSAGE_LIST:
      return { ...state, messageUserListLoading: true };
    case GET_USER_MESSAGE_LIST_SUCCESS:
      return {
        ...state,
        messageUserListLoading: false,
        messageUserListResult: action.payload.data
      };
    case GET_USER_MESSAGE_LIST_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "GET_USER_MESSAGE_LIST_FAIL",
            error: action
          })
        )
      );
      return { ...state, messageUserListLoading: false };
    default:
      return { ...state };
  }
};
