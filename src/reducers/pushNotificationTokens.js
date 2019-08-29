import {
  POST_ADD_OR_UPDATE_PUSH_NOTIFICATION_TOKEN,
  POST_ADD_OR_UPDATE_PUSH_NOTIFICATION_TOKEN_FAIL,
  POST_ADD_OR_UPDATE_PUSH_NOTIFICATION_TOKEN_SUCCESS
} from "../types/pushNotificationTokens";
import Sentry from "sentry-expo";

const INITIAL_STATE = {
  addOrUpdatePushNotificationTokenLoading: true,
  addOrUpdatePushNotificationTokenError: false,
  addOrUpdatePushNotificationTokenResult: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_ADD_OR_UPDATE_PUSH_NOTIFICATION_TOKEN:
      return {
        ...state,
        addOrUpdatePushNotificationTokenLoading: true,
        addOrUpdatePushNotificationTokenError: false,
        addOrUpdatePushNotificationTokenResult: null
      };
    case POST_ADD_OR_UPDATE_PUSH_NOTIFICATION_TOKEN_SUCCESS:
      return {
        ...state,
        addOrUpdatePushNotificationTokenLoading: true,
        addOrUpdatePushNotificationTokenError: false,
        addOrUpdatePushNotificationTokenResult: action.payload.data
      };
    case POST_ADD_OR_UPDATE_PUSH_NOTIFICATION_TOKEN_FAIL:
      Sentry.captureException(
        new Error(
          JSON.stringify({
            case: "POST_ADD_OR_UPDATE_PUSH_NOTIFICATION_TOKEN_FAIL",
            error: action
          })
        )
      );
      return {
        ...state,
        addOrUpdatePushNotificationTokenLoading: true,
        addOrUpdatePushNotificationTokenError: false,
        addOrUpdatePushNotificationTokenResult: null
      };
    default:
      return { ...state };
  }
};
