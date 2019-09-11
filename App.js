import React from "react";
import { AppLoading, Notifications } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Root } from "native-base";
import { StatusBar, AsyncStorage } from "react-native";

import Main from "./src/Main";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./src/reducers";
import { Provider } from "react-redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import logger from "redux-logger";
import Sentry from "sentry-expo";

import * as Permissions from "expo-permissions";

Sentry.enableInExpoDevelopment = true;

const _apiUrl = "http://api.ustanbul.net";
const _getTokenUrl = "/api/Token";
let token = "";

async function notificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

Sentry.config(
  "https://49f724a6070f44efb4f9fcc909980b8a@sentry.io/1462198"
).install();

const client = axios.create({
  baseURL: _apiUrl,
  responseType: "json"
});

client.interceptors.request.use(request => {
  //alert("Request : " + JSON.stringify(request));
  request.headers["Authorization"] = token;
  //console.log("Request : ", request);

  return request;
});

client.interceptors.response.use(response => {
  //alert("Response:", JSON.stringify(response));
  //console.log("Response : ", response);
  return response;
});

const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk, axiosMiddleware(client))
);

export default class App extends React.Component {
  state = {
    isLoadingToken: true,
    isLoadingFontAndAssets: true
  };

  async componentWillMount() {
    notificationPermission();
    this.getToken();
    Notifications.addListener(notification => {
      console.log(
        "LOG: -----------------------------------------------------------"
      );
      console.log(
        "LOG: App -> componentWillMount -> notification",
        notification
      );
      console.log(
        "LOG: -----------------------------------------------------------"
      );
    });
  }

  getToken() {
    axios
      .post(_apiUrl + _getTokenUrl, {
        UserName: "9e897927c9c127643be5c73df535d07c",
        Password: "9e897927c9c127643be5c73df535d07c"
      })
      .then(({ data }) => {
        if (data) {
          if (data.Token) {
            token = "Bearer " + data.Token;
            try {
              AsyncStorage.setItem("@bearerToken", "Bearer " + data.Token);
            } catch (error) {
              // Error saving data
            }
            this.setState({ isLoadingToken: false });
          }
        }
      })
      .catch(function(ex) {});
  }

  render() {
    return (
      <Root>
        <StatusBar hidden />
        <Provider store={store}>
          {this.state.isLoadingToken || this.state.isLoadingFontAndAssets ? (
            <AppLoading
              startAsync={this._loadResourcesAsync}
              onError={this._handleLoadingError}
              onFinish={this._handleFinishLoading}
            />
          ) : (
            <Main />
          )}
        </Provider>
      </Root>
    );
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([]),
      Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
        Georgia: require("./assets/fonts/Georgia.ttf"),
        Raleway_Black: require("./assets/fonts/Raleway_Black.ttf"),
        Raleway_BlackItalic: require("./assets/fonts/Raleway_BlackItalic.ttf"),
        Raleway_Bold: require("./assets/fonts/Raleway_Bold.ttf"),
        Raleway_BoldItalic: require("./assets/fonts/Raleway_BoldItalic.ttf"),
        Raleway_ExtraBold: require("./assets/fonts/Raleway_ExtraBold.ttf"),
        Raleway_ExtraBoldItalic: require("./assets/fonts/Raleway_ExtraBoldItalic.ttf"),
        Raleway_ExtraLight: require("./assets/fonts/Raleway_ExtraLight.ttf"),
        Raleway_ExtraLightItalic: require("./assets/fonts/Raleway_ExtraLightItalic.ttf"),
        Raleway_Italic: require("./assets/fonts/Raleway_Italic.ttf"),
        Raleway_Light: require("./assets/fonts/Raleway_Light.ttf"),
        Raleway_LightItalic: require("./assets/fonts/Raleway_LightItalic.ttf"),
        Raleway_Medium: require("./assets/fonts/Raleway_Medium.ttf"),
        Raleway_MediumItalic: require("./assets/fonts/Raleway_MediumItalic.ttf"),
        Raleway_Regular: require("./assets/fonts/Raleway_Regular.ttf"),
        Raleway_SemiBold: require("./assets/fonts/Raleway_SemiBold.ttf"),
        Raleway_SemiBoldItalic: require("./assets/fonts/Raleway_SemiBoldItalic.ttf"),
        Raleway_Thin: require("./assets/fonts/Raleway_Thin.ttf"),
        Raleway_ThinItalic: require("./assets/fonts/Raleway_ThinItalic.ttf"),
        Ubuntu_B: require("./assets/fonts/Ubuntu_B.ttf"),
        Ubuntu_BI: require("./assets/fonts/Ubuntu_BI.ttf"),
        Ubuntu_C: require("./assets/fonts/Ubuntu_C.ttf"),
        Ubuntu_L: require("./assets/fonts/Ubuntu_L.ttf"),
        Ubuntu_LI: require("./assets/fonts/Ubuntu_LI.ttf"),
        Ubuntu_M: require("./assets/fonts/Ubuntu_M.ttf"),
        Ubuntu_MI: require("./assets/fonts/Ubuntu_MI.ttf"),
        Ubuntu_R: require("./assets/fonts/Ubuntu_R.ttf"),
        Ubuntu_RI: require("./assets/fonts/Ubuntu_RI.ttf"),
        "Ubuntu-Bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
        "Ubuntu-Light": require("./assets/fonts/Ubuntu-Light.ttf"),
        "Ubuntu-Light-Italic": require("./assets/fonts/Ubuntu-Light-Italic.ttf"),
        UbuntuMono_B: require("./assets/fonts/UbuntuMono_B.ttf"),
        UbuntuMono_BI: require("./assets/fonts/UbuntuMono_BI.ttf"),
        UbuntuMono_R: require("./assets/fonts/UbuntuMono_R.ttf"),
        UbuntuMono_RI: require("./assets/fonts/UbuntuMono_RI.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingFontAndAssets: false });
  };
}
