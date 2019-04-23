import {
  POST_USER_CHAT_READ_MESSAGE,
  POST_USER_CHAT_READ_MESSAGE_URL
} from "../types/messageServicePost";

export function userChatReadMessage(openingUserID) {
  return {
    type: POST_USER_CHAT_READ_MESSAGE,
    payload: {
      request: {
        url: POST_USER_CHAT_READ_MESSAGE_URL,
        data: {
          activeUserId: states.activeUser.ID,
          openingUserId: openingUserID
        },
        method: "POST"
      }
    }
  };
}
