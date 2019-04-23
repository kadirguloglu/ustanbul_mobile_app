import {
  GET_USER_MESSAGE_LIST,
  GET_USER_MESSAGE_LIST_URL
} from "../types/messageServiceGet";

export function messageUserList() {
  return {
    type: GET_USER_MESSAGE_LIST,
    payload: {
      request: {
        url: GET_USER_MESSAGE_LIST_URL + `/${states.activeUser.ID}`
      }
    }
  };
}
