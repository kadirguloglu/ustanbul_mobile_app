import {
  POST_USER_CHAT_READ_MESSAGE,
  POST_USER_CHAT_READ_MESSAGE_SUCCESS,
  POST_USER_CHAT_READ_MESSAGE_FAIL
} from "../../types/messageServicePost";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_USER_CHAT_READ_MESSAGE:
      return { ...state };
    case POST_USER_CHAT_READ_MESSAGE_SUCCESS:
      return { ...state };
    case POST_USER_CHAT_READ_MESSAGE_FAIL:
      return { ...state };
    default:
      return { ...state };
  }
};
