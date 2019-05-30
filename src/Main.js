import React from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { Spinner } from "native-base";

import {
  loginUser,
  getLanguage,
  getSite
} from "../src/actions/generalServiceGet";
import AppNavigator from "../navigation/AppNavigator";
import { isAutoLogin } from "../src/functions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      isIntro: true,
      isLoggedIn: false, // Is the user authenticated?
      isLoading: false, // Is the user loggingIn/signinUp?
      isAppReady: false, // Has the app completed the login animation?
      isTokenLoading: true
    };
  }
  async componentWillMount() {
    const { loginUser, getLanguage, getSite } = this.props;
    if (isAutoLogin) loginUser("kadirguloglu1@gmail.com", "123", "");
    getLanguage(1);
    getSite(1);
    // let deviceId = "undefined";
    // try {
    //   deviceId = DeviceInfo.getDeviceId();
    // } catch (err) {
    //   deviceId = "undefined";
    // }
    // if (deviceId === "undefined") {
    //   axios
    //     .get(apiUrl + "/GeneralServiceGet/getToken/true/" + deviceId)
    //     .then(function(response) {
    //       apiToken = response.data.GetTokenResult;
    //       AsyncStorage.setItem("_getUserToken", apiToken);
    //       instance.defaults.headers["securetoken"] = apiToken;
    //     });
    // } else {
    //   try {
    //     const value = await AsyncStorage.getItem("_getUserToken");
    //     // if (value !== null && value !== '') {
    //     if (true) {
    //       apiToken = value;
    //       instance.defaults.headers["securetoken"] = apiToken;
    //       this.setState({ isTokenLoading: false });
    //     } else {
    //       axios
    //         .get(apiUrl + "/GeneralServiceGet/getToken/true/" + deviceId)
    //         .then(function(response) {
    //           apiToken = response.data;
    //           AsyncStorage.setItem("_getUserToken", apiToken);
    //           instance.defaults.headers["securetoken"] = apiToken;
    //           this.setState({ isTokenLoading: false });
    //         })
    //         .catch(function(error) {});
    //     }
    //   } catch (error) {
    //     axios
    //       .get(apiUrl + "/GeneralServiceGet/getToken/true/" + deviceId)
    //       .then(function(response) {
    //         apiToken = response.data;
    //         AsyncStorage.setItem("_getUserToken", apiToken);
    //         instance.defaults.headers["securetoken"] = apiToken;
    //         this.setState({ isTokenLoading: false });
    //       });
    //   }
    // }

    try {
      const value = await AsyncStorage.getItem("_activeUserID");
      if (value !== null) {
        this.props
          .loginUser("", "", value)
          .then(({ payload }) => {
            this.setState({ isLoggedIn: true });
          })
          .catch(() => {
            this.setState({ isLoggedIn: false });
          });
      } else {
        this.setState({ isLoggedIn: false });
      }
    } catch (err) {
      this.setState({ isLoggedIn: false });
    }

    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem("_getIsIntroScreen");
        if (value !== null) {
          this.setState({ isIntro: false });
        } else {
          this.setState({ isIntro: true });
        }
      } catch (err) {
        this.setState({ isIntro: true });
      }
    };
    this.setState({ isReady: true });
  }

  _simulateLogin = (username, password) => {
    this.props
      .loginUser(username, password, "")
      .then(({ payload }) => {
        AsyncStorage.setItem("_activeUserID", payload.data.ID);
        this.setState({ isLoggedIn: true, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoggedIn: false, isLoading: false });
      });
  };

  _simulateSignup = (username, password, fullName) => {
    this.setState({ isLoading: true });
    setTimeout(
      () => this.setState({ isLoggedIn: true, isLoading: false }),
      1000
    );
  };
  render() {
    const { generalServiceGetResponse } = this.props;
    const {
      getSiteLoading,
      getLanguageLoading,
      getSiteError,
      getLanguageError
    } = generalServiceGetResponse;

    if (getSiteLoading || getLanguageLoading) {
      return <Spinner />;
    }

    if (getSiteError || getLanguageError) {
      return <Spinner />;
    }

    return (
      <View style={styles.container}>
        {/* {Platform.OS === "ios" && <StatusBar barStyle="default" />} */}
        <AppNavigator />
      </View>
    );
  }
}

const mapStateToProps = ({ generalServiceGetResponse }) => {
  return {
    generalServiceGetResponse
  };
};

const mapDispatchToProps = {
  loginUser,
  getLanguage,
  getSite
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
