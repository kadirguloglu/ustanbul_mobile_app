import React, { useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";

import { ThemeColor, Loader } from "../src/functions";
import { loginUser, loginPost } from "../src/actions/generalServiceGet";
import styles from "./LoginFormCss";

const { height } = Dimensions.get("window");

function LoginForm({ form_change, navigation }) {
  const [email, setEmail] = useState("kadirguloglu1@gmail.com");
  const [password, setPassword] = useState("123");
  const [logoHeight, setLogoHeight] = useState(height);
  const [isLoader, setIsLoader] = useState(false);

  const {
    getSiteData,
    loginAuthenticationUserLoading,
    loginPostLoading
  } = useSelector(state => state.generalServiceGetResponse);
  const dispatch = useDispatch();

  handlePressLogin = () => {
    dispatch(loginUser(email, password)).then(({ payload }) => {
      if (payload) {
        if (payload.data) {
          if (payload.data.ErrorText !== "") {
            alert(payload.data.ErrorText);
          } else {
            AsyncStorage.setItem("@activeUserID", payload.data.Id + "");
            navigation.navigate("Home");
          }
        }
      }
    });
  };

  _loginWithFacebook = async () => {
    setIsLoader(true);
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
          Alert.alert("Uyarı", "İnternet bağlantınız kontrol ediniz..", [
            { text: "Tamam" }
          ]);
        } else {
          if (facebookResult.email) {
            dispatch(
              loginPost({
                Email: facebookResult.email,
                RegisterType: "Facebook"
              })
            ).then(({ payload }) => {
              if (payload) {
                if (payload.data) {
                  if (payload.data.State) {
                    navigation.navigate("Home");
                    setIsLoader(false);
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
                    Alert.alert("Uyarı", toastMessage, [{ text: "Tamam" }]);
                    setIsLoader(false);
                  }
                }
              }
            });
          } else {
            Alert.alert("Uyarı", "Mail adresiniz bulunamadı.", [
              { text: "Tamam" }
            ]);
            setIsLoader(false);
          }
        }
      } else {
        if (type === "cancel") {
          Alert.alert("Uyarı", "İşlem iptal edildi.", [{ text: "Tamam" }]);
          setIsLoader(false);
        } else {
          setIsLoader(false);
        }
      }
    } catch ({ message }) {
      Alert.alert("Uyarı", "Giriş işlemi başarısız. Hata mesajı:" + message, [
        { text: "Tamam" }
      ]);
      setIsLoader(false);
    }
  };

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
          style={[styles.logoView, { height: logoHeight }]}
        >
          <Text style={[styles.logoText]}>{getSiteData.Name}</Text>
        </Animatable.View>
        <Animatable.View
          animation="zoomIn"
          delay={1500}
          onAnimationBegin={() => {
            setLogoHeight(height * 0.4);
          }}
          style={styles.loginFormView}
        >
          <View style={styles.inputContainer}>
            <FontAwesome style={styles.inputIcon} name="user" size={16} />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Mail adresiniz"
              onChangeText={v => setEmail(v)}
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
              onChangeText={v => setPassword(v)}
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
            onPress={() => form_change()}
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

export default LoginForm;
