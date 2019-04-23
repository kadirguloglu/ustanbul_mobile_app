import { Toast } from "native-base";
import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";

export function MidPath(PicturePaths) {
  try {
    if (PicturePaths.length != 0) {
      PicturePaths.map(x => {
        if (x.Key == "Mid") {
          return x.Value;
        }
      });
    } else {
      return "../assets/image-place-holder.png";
    }
  } catch (error) {
    return "../assets/image-place-holder.png";
  }

  return "../assets/image-place-holder.png";
}
export function IsValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

export function ProjectAlert(message) {
  alert(message);
}

export function MyToast(text, btntext, duration) {
  if (duration) {
    duration = 2500;
  }
  if (btntext)
    Toast.show({
      text: text,
      buttonText: btntext,
      duration: duration
    });
  else
    Toast.show({
      text: text,
      duration: duration
    });
}

export var storage = new Storage({
  // maximum capacity, default 1000
  //size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  // defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  // enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  // sync : {
  // 	// we'll talk about the details later.
  // }
});

export let ThemeColor = "#59aae1";

export let IsFullData = false;

export let IsExpoActive = false;

export let ChatConnectionUrl = "http://demo.kadirguloglu.com";

export const isAutoLogin = false;
