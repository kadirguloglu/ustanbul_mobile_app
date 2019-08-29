import {
  POST_ADD_OR_UPDATE_PUSH_NOTIFICATION_TOKEN,
  POST_ADD_OR_UPDATE_PUSH_NOTIFICATION_TOKEN_URL
} from "../types/pushNotificationTokens";

export function addOrUpdatePushNotification(userId, token) {
  let bodyFormData = new FormData();
  bodyFormData.append("UserId", userId);
  bodyFormData.append("ExpoToken", token);
  return {
    type: POST_ADD_OR_UPDATE_PUSH_NOTIFICATION_TOKEN,
    payload: {
      request: {
        url: POST_ADD_OR_UPDATE_PUSH_NOTIFICATION_TOKEN_URL,
        method: "POST",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    }
  };
}
