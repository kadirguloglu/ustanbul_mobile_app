import {
  POST_USER_CHAT_READ_MESSAGE,
  POST_USER_CHAT_READ_MESSAGE_URL
} from "../types/messageServicePost";

export function userChatReadMessage(ID, openingUserID) {
  return {
    type: POST_USER_CHAT_READ_MESSAGE,
    payload: {
      request: {
        url: `${POST_USER_CHAT_READ_MESSAGE_URL}/${ID}/${openingUserID}`
      }
    }
  };
}
