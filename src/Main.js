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

import { isAutoLogin, Loader } from "../src/functions";

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

    try {
      const value = await AsyncStorage.getItem("@activeUserID");
      if (value !== null) {
        loginUser("", "", value).then(({ payload }) => {
          if (payload) {
            if (payload.data) {
              if (payload.data.ErrorText !== "") {
                alert(payload.data.ErrorText);
              } else {
                AsyncStorage.setItem("@activeUserID", payload.data.Id + "");
              }
            }
          }
        });
      } else {
      }
    } catch (err) {}
  }

  render() {
    const { generalServiceGetResponse } = this.props;
    const {
      getSiteLoading,
      getLanguageLoading,
      getSiteError,
      getLanguageError
    } = generalServiceGetResponse;
    if (getSiteLoading || getLanguageLoading) {
      return <Loader />;
    }
    if (getSiteError || getLanguageError) {
      return <Loader />;
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
