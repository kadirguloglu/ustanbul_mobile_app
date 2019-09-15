import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Alert
} from "react-native";
import { Spinner } from "native-base";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as Facebook from "expo-facebook";

import {
  emailValidatePost,
  customerRegisterPost
} from "../../src/actions/customerService";
import { loginPost } from "../../src/actions/generalServiceGet";

import i18n from "../../constants/strings";

const { width, height } = Dimensions.get("window");
function FacebookForm({ login_form }) {
  const [logoHeight, setLogoHeight] = useState(height);
  const [isLoader, setIsLoader] = useState(false);

  const dispatch = useDispatch();

  const { getLanguageData, getSiteData } = useSelector(
    state => state.generalServiceGetResponse
  );

  async function _handleRegisterFacebook() {
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
          `https://graph.facebook.com/me?fields=email,first_name,last_name&access_token=${token}`
        );
        const {
          error,
          email,
          first_name,
          last_name,
          id
        } = await response.json();

        if (error) {
          Alert.alert(i18n.t("text_51"), i18n.t("text_8"), [
            { text: i18n.t("text_6") }
          ]);
        } else {
          if (email) {
            dispatch(
              emailValidatePost({
                Email: email
              })
            ).then(({ payload }) => {
              if (payload) {
                if (payload.data) {
                  Alert.alert(i18n.t("text_51"), i18n.t("text_196"), [
                    { text: i18n.t("text_6") }
                  ]);
                  login_form();
                } else {
                  const registerModel = {
                    Name: first_name,
                    Surname: last_name,
                    Email: email,
                    Password: "",
                    SiteID: getSiteData.Id,
                    LangID: getLanguageData.Id,
                    CreateType: "Facebook"
                  };
                  dispatch(customerRegisterPost(registerModel)).then(
                    ({ payload }) => {
                      if (payload) {
                        if (payload.data) {
                          if (payload.data.State) {
                            dispatch(
                              loginPost({
                                Email: email,
                                RegisterType: "Facebook"
                              })
                            ).then(({ payload }) => {
                              if (payload) {
                                if (payload.data) {
                                  if (!payload.data.State) {
                                    switch (payload.data.ExceptionType) {
                                      case 1:
                                        Alert.alert(
                                          i18n.t("text_51"),
                                          i18n.t("text_198"),
                                          [{ text: i18n.t("text_6") }]
                                        );
                                        break;
                                      case 2:
                                        Alert.alert(
                                          i18n.t("text_51"),
                                          i18n.t("text_199"),
                                          [{ text: i18n.t("text_6") }]
                                        );
                                        break;
                                      case 3:
                                        Alert.alert(
                                          i18n.t("text_51"),
                                          i18n.t("text_200"),
                                          [{ text: i18n.t("text_6") }]
                                        );
                                        break;
                                      default:
                                        break;
                                    }
                                  }
                                }
                              }
                            });
                            Alert.alert(
                              i18n.t("text_51"),
                              i18n.t("text_197", { v: "Facebook" }),
                              [{ text: i18n.t("text_6") }]
                            );
                          } else {
                            Alert.alert(
                              i18n.t("text_51"),
                              payload.data.Message,
                              [{ text: i18n.t("text_6") }]
                            );
                          }
                        }
                      }
                    }
                  );
                  // if (payload.data.State) {
                  //   navigation.navigate("Home");
                  //   setIsLoader(false);
                  // } else {
                  //   let toastMessage = "";
                  //   if (payload.data.ExceptionType == 1) {
                  //     toastMessage =
                  //       "Üyelik bulunamadı. Lütfen ilk önce üye olunuz.";
                  //   }
                  //   if (payload.data.ExceptionType == 2) {
                  //     toastMessage =
                  //       "Üyelik aktivasyonu geçersiz. Lütfen üyeliğiniz aktif ediniz.";
                  //   }
                  //   if (payload.data.ExceptionType == 3) {
                  //     toastMessage =
                  //       "Bu üyelik sosyal medya hesabı ile kayıt olmamıştır. Lütfen şifreniz ile giriş yapınız.";
                  //   }
                  //   Alert.alert("Uyarı", toastMessage, [{ text: "Tamam" }]);
                  //   setIsLoader(false);
                  // }
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
      Alert.alert("Uyarı", "Giriş işlemi başarısız. Hata mesajı: " + message, [
        { text: "Tamam" }
      ]);
      setIsLoader(false);
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="zoomIn"
        delay={500}
        style={[styles.logoView, { height: logoHeight }]}
      >
        <Text style={[styles.logoText]}>Ustanbul</Text>
      </Animatable.View>
      <Animatable.View
        animation="zoomIn"
        delay={1500}
        onAnimationBegin={() => setLogoHeight(height * 0.1)}
        style={styles.loginFormView}
      >
        <View style={styles.iconContainer}>
          <FontAwesome style={styles.facebookIcon} name="facebook" size={100} />
        </View>
        <View style={styles.view1}>
          <Text style={styles.text_3}>Facebook {i18n.t("text_194")} </Text>
          <Text style={styles.text_4}>{i18n.t("text_2")}</Text>
        </View>
        <View style={styles.view_2}>
          <Text style={styles.text_5}>{i18n.t("text_195")}</Text>
        </View>
        <View style={styles.view_3}>
          <TouchableHighlight
            style={[styles.button, styles.searchMasterButton]}
            onPress={() => (isLoader ? null : _handleRegisterFacebook())}
          >
            {isLoader ? (
              <Spinner></Spinner>
            ) : (
              <Text style={[styles.buttonText, styles.searchMasterText]}>
                {i18n.t("text_191")}
              </Text>
            )}
          </TouchableHighlight>
        </View>
        {/* <View style={{ marginBottom: 10 }}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => console.log("")}
            >
              <Text style={styles.buttonText}>Ustayım</Text>
            </TouchableHighlight>
          </View>
          <View style={{ marginBottom: 10 }}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => console.log("")}
            >
              <Text style={styles.buttonText}>Şirketim</Text>
            </TouchableHighlight>
          </View> */}
        <TouchableHighlight
          onPress={() => login_form()}
          style={styles.registerTextContainer}
        >
          <View style={styles.view_4}>
            <Text style={[styles.text_1]}>
              {i18n.t("text_193")}
              {"   "}
            </Text>
            <Text style={[styles.text_2]}>{i18n.t("giris_yap")}</Text>
          </View>
        </TouchableHighlight>
      </Animatable.View>
    </View>
  );
}

export default FacebookForm;

const styles = StyleSheet.create({
  container: { backgroundColor: "#3B5998", width: width, height: height },
  logoView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  logoText: {
    fontFamily: "Raleway_Bold",
    fontSize: 22,
    color: "#fff"
  },
  loginFormView: {
    flexDirection: "column",
    justifyContent: "flex-start",
    height: height * 0.9,
    paddingLeft: width * 0.1,
    paddingRight: width * 0.1
  },
  registerTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: width
  },
  text_1: {
    fontFamily: "Raleway_Light",
    fontSize: 14,
    color: "#fff"
  },
  text_2: {
    fontFamily: "Raleway_Bold",
    fontSize: 14,
    color: "#fff"
  },
  button: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 44
  },
  buttonText: {
    fontFamily: "Ubuntu_L",
    fontSize: 16,
    color: "white"
  },
  searchMasterButton: {
    borderWidth: 0,
    backgroundColor: "#9DACCB"
  },
  searchMasterText: {
    color: "black"
  },
  iconContainer: { flexDirection: "row", justifyContent: "center" },
  facebookIcon: { color: "white" },
  view1: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 19
  },
  text_3: {
    fontFamily: "Raleway_Light",
    fontSize: 21,
    color: "#fff"
  },
  text_4: {
    fontFamily: "Raleway_Bold",
    fontSize: 21,
    color: "#fff"
  },
  view_2: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 19
  },
  text_5: {
    fontFamily: "Raleway_Light",
    fontSize: 14,
    color: "#fff"
  },
  view_3: { marginBottom: 10, marginTop: 24 },
  view_4: { flexDirection: "row" }
});
