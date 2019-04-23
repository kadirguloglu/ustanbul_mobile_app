import {
  GET_USER_MESSAGE_LIST,
  GET_USER_MESSAGE_LIST_SUCCESS,
  GET_USER_MESSAGE_LIST_FAIL
} from "../../types/messageServiceGet";

const INITIAL_STATE = {
  getDepartmentResult: {}
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
      return { ...state, messageUserListLoading: false };
    default:
      return { ...state };
  }
};
