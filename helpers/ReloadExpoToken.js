import React, { useEffect } from "react";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { addOrUpdatePushNotification } from "../src/actions/pushNotificationTokens";
import axios from "axios";

export default async function ReloadExpoToken(Id) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();
  if (Id !== 0) {
    axios
      .post(
        "http://api.ustanbul.net/api/PushNotificationTokens/AddOrUpdatePushNotificationToken",
        {
          UserId: Id,
          ExpoToken: token
        }
      )
      .then(({ data }) => {})
      .catch(function(error) {});
    //addOrUpdatePushNotification(Id, token);
  }
}
