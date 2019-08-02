import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ImageBackground,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Button,
  TouchableHighlight,
  Dimensions,
  AsyncStorage
} from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";
import * as Facebook from "expo-facebook";
import { Toast } from "native-base";
import { AppAuth } from "expo-app-auth";
import * as Constants from "expo-constants";

import { ThemeColor, Loader } from "../src/functions";

import { loginUser, loginPost } from "../src/actions/generalServiceGet";
import styles from "./LoginFormCss";

const { height } = Dimensions.get("window");

const config = {
  issuer: "https://accounts.google.com",
  scopes: ["openid", "profile"],
  /* This is the CLIENT_ID generated from a Firebase project */
  clientId:
    "101589148647-a2r4erngf2ou7deslr3tl85ifqc0nd85.apps.googleusercontent.com"
};

/*
 * StorageKey is used for caching the OAuth Key in your app so you can use it later.
 * This can be any string value, but usually it follows this format: @AppName:NameOfValue
 */
const StorageKey = "@PillarValley:GoogleOAuthKey";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "kadirguloglu1@gmail.com",
      password: "123",
      logoHeight: height,
      isLoader: false
    };
  }
  async componentWillMount() {}

  /*
   * Notice that Sign-In / Sign-Out aren't operations provided by this module.
   * We emulate them by using authAsync / revokeAsync.
   * For instance if you wanted an "isAuthenticated" flag, you would observe your local tokens.
   * If the tokens exist then you are "Signed-In".
   * Likewise if you cannot refresh the tokens, or they don't exist, then you are "Signed-Out"
   */
  signInAsync = async () => {
    const authState = await AppAuth.authAsync(config);
    await cacheAuthAsync(authState);
    return authState;
  };

  /* Let's save our user tokens so when the app resets we can try and get them later */
  cacheAuthAsync = async authState => {
    return AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
  };

  /* Before we start our app, we should check to see if a user is signed-in or not */
  getCachedAuthAsync = async () => {
    /* First we will try and get the cached auth */
    const value = await AsyncStorage.getItem(StorageKey);
    /* Async Storage stores data as strings, we should parse our data back into a JSON */
    const authState = JSON.parse(value);
    if (authState) {
      /* If our data exists, than we should see if it's expired */
      if (checkIfTokenExpired(authState)) {
        /*
         * The session has expired.
         * Let's try and refresh it using the refresh token that some
         * OAuth providers will return when we sign-in initially.
         */
        return refreshAuthAsync(authState);
      } else {
        return authState;
      }
    }
    return null;
  };

  /*
   * You might be familiar with the term "Session Expired", this method will check if our session has expired.
   * An expired session means that we should reauthenticate our user.
   * You can learn more about why on the internet: https://www.quora.com/Why-do-web-sessions-expire
   * > Fun Fact: Charlie Cheever the creator of Expo also made Quora :D
   */
  checkIfTokenExpired = ({ accessTokenExpirationDate }) => {
    return new Date(accessTokenExpirationDate) < new Date();
  };

  /*
   * Some OAuth providers will return a "Refresh Token" when you sign-in initially.
   * When our session expires, we can exchange the refresh token to get new auth tokens.
   * > Auth tokens are not the same as a Refresh token
   *
   * Not every provider (very few actually) will return a new "Refresh Token".
   * This just means the user will have to Sign-In more often.
   */
  refreshAuthAsync = async ({ refreshToken }) => {
    const authState = await AppAuth.refreshAsync(config, refreshToken);
    await cacheAuthAsync(authState);
    return authState;
  };

  /*
   * To sign-out we want to revoke our tokens.
   * This is what high-level auth solutions like FBSDK are doing behind the scenes.
   */
  signOutAsync = async ({ accessToken }) => {
    try {
      await AppAuth.revokeAsync(config, {
        token: accessToken,
        isClientIdProvided: true
      });
      /*
       * We are removing the cached tokens so we can check on our auth state later.
       * No tokens = Not Signed-In :)
       */
      await AsyncStorage.removeItem(StorageKey);
      return null;
    } catch ({ message }) {
      alert(`Failed to revoke token: ${message}`);
    }
  };

  handlePressLogin = () => {
    this.props
      .loginUser(this.state.email, this.state.password)
      .then(({ payload }) => {
        if (payload) {
          if (payload.data) {
            if (payload.data.ErrorText !== "") {
              alert(payload.data.ErrorText);
            } else {
              AsyncStorage.setItem("@activeUserID", payload.data.Id + "");
              this.props.navigation.navigate("Home");
            }
          }
        }
      });
  };

  _loginWithGoogle = async () => {
    await this.signInAsync();
  };

  _loginWithFacebook = async () => {
    const { loginPost, navigation } = this.props;
    this.setState({ isLoader: true });
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync("445869672863651", {
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?fields=email&access_token=${token}`
        );
        var facebookResult = await response.json();

        if (facebookResult.error) {
          Toast.show({
            text: "İnternet bağlantınızı kontrol ediniz.",
            type: "danger",
            duration: "3500"
          });
        } else {
          if (facebookResult.email) {
            loginPost({
              Email: facebookResult.email,
              RegisterType: "Facebook"
            }).then(({ payload }) => {
              if (payload) {
                if (payload.data) {
                  if (payload.data.State) {
                    navigation.navigate("Home");
                    this.setState({ isLoader: false });
                  } else {
                    let toastMessage = "";
                    if (payload.data.ExceptionType == 1) {
                      toastMessage =
                        "Üyelik bulunamadı. Lütfen ilk önce üye olunuz.";
                    }
                    if (payload.data.ExceptionType == 2) {
                      toastMessage =
                        "Üyelik aktivasyonu geçersiz. Lütfen üyeliğiniz aktif ediniz.";
                    }
                    if (payload.data.ExceptionType == 3) {
                      toastMessage =
                        "Bu üyelik sosyal medya hesabı ile kayıt olmamıştır. Lütfen şifreniz ile giriş yapınız.";
                    }
                    Toast.show({
                      text: toastMessage,
                      type: "danger",
                      duration: "3500"
                    });
                    this.setState({ isLoader: false });
                  }
                }
              }
            });
          } else {
            Toast.show({
              text: "Mail adresiniz bulunamadı.",
              type: "danger",
              duration: "3500"
            });
            this.setState({ isLoader: false });
          }
        }
      } else {
        if (type === "cancel") {
          Toast.show({
            text: "İşlem iptal edildi.",
            type: "danger",
            duration: "3500"
          });
          this.setState({ isLoader: false });
        } else this.setState({ isLoader: false });
      }
    } catch ({ message }) {
      Toast.show({
        text: `Giriş işlemi başarısız. Hata mesajı : ${message}`,
        type: "danger",
        duration: "3500"
      });
      this.setState({ isLoader: false });
    }
  };
  render() {
    const { isLoader } = this.state;
    const { generalServiceGetResponse } = this.props;
    const {
      getSiteData,
      loginAuthenticationUserLoading,
      loginPostLoading
    } = generalServiceGetResponse;
    // if (loginPostLoading) return <Loader />;
    return (
      <ImageBackground
        source={require("../assets/background/login-register-background.png")}
        style={styles.fullBackgroundImage}
        resizeMode="cover"
      >
        {isLoader ? <Loader /> : null}
        <Animatable.View
          animation="bounceInDown"
          style={[styles.loginScreenView]}
        >
          <Animatable.View
            animation="zoomIn"
            delay={500}
            style={[styles.logoView, { height: this.state.logoHeight }]}
          >
            <Text style={[styles.logoText]}>{getSiteData.Name}</Text>
          </Animatable.View>
          <Animatable.View
            animation="zoomIn"
            delay={1500}
            onAnimationBegin={() => {
              this.setState({ logoHeight: height * 0.4 });
            }}
            style={styles.loginFormView}
          >
            <View style={styles.inputContainer}>
              <FontAwesome style={styles.inputIcon} name="user" size={16} />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Mail adresiniz"
                onChangeText={v => this.setState({ email: v })}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome style={styles.inputIcon} name="lock" size={16} />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Şifreniz"
                secureTextEntry={true}
                onChangeText={v => this.setState({ password: v })}
              />
            </View>
            {loginAuthenticationUserLoading ? (
              <ActivityIndicator style={styles.button} color={ThemeColor} />
            ) : (
              <Button
                style={styles.button}
                title="Giriş yap"
                onPress={() => this.handlePressLogin()}
                color={ThemeColor}
              />
            )}
            <View style={styles.lineByLine}>
              <View style={styles.line} />
              <Text style={styles.lineByText}>veya diğer seçenekler</Text>
              <View style={styles.line} />
            </View>
            <View style={styles.socialLoginContainer}>
              {/* <FontAwesome
                style={styles.socialLoginIcon}
                name="google"
                size={19}
                onPress={() => this._loginWithGoogle()}
              /> */}
              <FontAwesome
                style={styles.socialLoginIcon}
                name="facebook"
                size={19}
                onPress={() => this._loginWithFacebook()}
              />
              {/* <FontAwesome
                style={styles.socialLoginIcon}
                name="twitter"
                size={19}
                onPress={() => console.log("twitter ile giriş yap")}
              /> */}
            </View>
            <TouchableHighlight
              onPress={() => this.props.form_change()}
              style={styles.registerTextContainer}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text_1}>Hala hesabın yok mu?{"   "}</Text>
                <Text style={styles.text_2}>Kayıt Ol</Text>
              </View>
            </TouchableHighlight>
          </Animatable.View>
        </Animatable.View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ generalServiceGetResponse }) => ({
  generalServiceGetResponse
});

const mapDispatchToProps = {
  loginUser,
  loginPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
