import React from "react";
import { AppLoading, Asset, Font, Icon } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { Root } from "native-base";
import { StatusBar } from "react-native";

import Main from "./src/Main";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./src/reducers";
import { Provider } from "react-redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import logger from "redux-logger";
import AppNavigator from "./navigation/AppNavigator";

const client = axios.create({
  baseURL: "http://api.kadirguloglu.com",
  responseType: "json"
});

client.interceptors.request.use(request => {
  //alert("Request : " + JSON.stringify(request));
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
    isLoadingComplete: false
  };

  render() {
    return (
      <Root>
        <StatusBar hidden />
        <Provider store={store}>
          {!this.state.isLoadingComplete && !this.props.skipLoadingScreen ? (
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
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
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
    this.setState({ isLoadingComplete: true });
  };
}
