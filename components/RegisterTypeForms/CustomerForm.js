import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ImageBackground,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Button,
  TouchableHighlight,
  Dimensions,
  Platform
} from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";
import { Toast } from "native-base";

import { ThemeColor } from "../../src/functions";
import {
  customerRegisterPost,
  emailValidatePost
} from "../../src/actions/customerService";

const { width, height } = Dimensions.get("window");
class CustomerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoHeight: height,
      model: {
        Name: "",
        Surname: "",
        Email: "",
        Phone: "",
        Password: ""
      }
    };
  }

  validate = () => {
    const { model } = this.state;
    if (model.Name.length < 1) {
      Toast.show({
        text: "Adı alanı boş geçilemez.",
        buttonText: "Tamam",
        type: "danger",
        duration: 2500
      });
      return false;
    }
    if (model.Name.length > 50) {
      Toast.show({
        text: "Adı alanı için en fazla 50 karakter girebilirisiniz.",
        buttonText: "Tamam",
        type: "danger",
        duration: 2500
      });
      return false;
    }

    if (model.Surname.length < 1) {
      Toast.show({
        text: "Soyadı alanı boş geçilemez.",
        buttonText: "Tamam",
        type: "danger",
        duration: 2500
      });
      return false;
    }
    if (model.Surname.length > 50) {
      Toast.show({
        text: "Soyadı alanı için en fazla 50 karakter girebilirisiniz.",
        buttonText: "Tamam",
        type: "danger",
        duration: 2500
      });
      return false;
    }

    if (model.Phone.length < 1) {
      Toast.show({
        text: "Telefon numarası alanı boş geçilemez.",
        buttonText: "Tamam",
        type: "danger",
        duration: 2500
      });
      return false;
    }
    if (model.Phone.length > 20) {
      Toast.show({
        text:
          "Telefon numarası alanı için en fazla 20 karakter girebilirisiniz.",
        buttonText: "Tamam",
        type: "danger",
        duration: 2500
      });
      return false;
    }

    if (model.Password.length < 6) {
      Toast.show({
        text: "Parola alanı en az 6 karakter olmalıdır.",
        buttonText: "Tamam",
        type: "danger",
        duration: 2500
      });
      return false;
    }
    if (model.Password.length > 20) {
      Toast.show({
        text: "Parola alanı için en fazla 20 karakter girebilirisiniz.",
        buttonText: "Tamam",
        type: "danger",
        duration: 2500
      });
      return false;
    }

    return true;
  };

  _handleSubmitRegisterCustomer = () => {
    const { model } = this.state;
    const {
      customerRegisterPost,
      generalServiceGetResponse,
      navigation,
      emailValidatePost
    } = this.props;
    const { getSiteData, getLanguageData } = generalServiceGetResponse;
    model.SiteId = getSiteData.Id;
    model.LangId = getLanguageData.Id;
    if (this.validate()) {
      emailValidatePost(model).then(({ payload }) => {
        if (payload) {
          if (payload.data !== undefined && payload.data !== null) {
            if (payload.data == "1") {
              Toast.show({
                text: "Mail adresi kullanımda.",
                buttonText: "Tamam",
                type: "danger",
                duration: 3500
              });
              return;
            } else {
              customerRegisterPost(model).then(y => {
                const payloadRegister = y.payload;
                if (payloadRegister) {
                  if (payloadRegister.data) {
                    if (payloadRegister.data.State) {
                      Toast.show({
                        text:
                          "Kayıt olma işleminiz başarıyla tamamlandı. Hemen mail adresinize girerek üyeliğinizi onaylayınız.",
                        buttonText: "Tamam",
                        type: "success",
                        duration: 10000
                      });
                      navigation.navigate("Home");
                      return;
                    } else {
                      Toast.show({
                        text: payloadRegister.data.Message.split(
                          "Hata Mesajı: "
                        )[1],
                        buttonText: "Tamam",
                        type: "danger",
                        duration: 3500
                      });
                      return;
                    }
                  }
                }
                Toast.show({
                  text:
                    "İşlem sırasında hata oluştu. İnternet bağlantınız kontrol ediniz.",
                  buttonText: "Tamam",
                  type: "danger",
                  duration: 3500
                });
                return;
              });
            }
          }
        }
      });
    }
  };

  componentWillMount() {}
  render() {
    const { model, logoHeight } = this.state;
    const { Name, Surname, Email, Phone, Password } = model;
    const { customerServiceResponse, generalServiceGetResponse } = this.props;
    const {
      customerRegisterPostLoading,
      emailValidatePostLoading
    } = customerServiceResponse;
    const { getSiteData } = generalServiceGetResponse;
    return (
      <ImageBackground
        source={require("../../assets/background/login-register-background.png")}
        style={styles.fullBackgroundImage}
        resizeMode="cover"
      >
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
              this.setState({ logoHeight: height * 0.2 });
            }}
            style={styles.loginFormView}
          >
            <View style={styles.inputContainer}>
              <FontAwesome style={styles.inputIcon} name="user" size={16} />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Adınız"
                onChangeText={v =>
                  this.setState({ model: { ...model, Name: v } })
                }
                value={Name}
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome style={styles.inputIcon} name="user" size={16} />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Soyadınız"
                onChangeText={v =>
                  this.setState({ model: { ...model, Surname: v } })
                }
                value={Surname}
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome style={styles.inputIcon} name="user" size={16} />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Email"
                onChangeText={v =>
                  this.setState({ model: { ...model, Email: v } })
                }
                value={Email}
                keyboardType={
                  Platform.OS == "ios" ? "email-address" : "email-address"
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome style={styles.inputIcon} name="user" size={16} />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Telefon numaranız"
                onChangeText={v =>
                  this.setState({ model: { ...model, Phone: v } })
                }
                value={Phone}
                keyboardType={Platform.OS == "ios" ? "phone-pad" : "phone-pad"}
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome style={styles.inputIcon} name="user" size={16} />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Şifreniz"
                onChangeText={v =>
                  this.setState({ model: { ...model, Password: v } })
                }
                value={Password}
                keyboardType={
                  Platform.OS == "ios" ? "numeric" : "visible-password"
                }
              />
            </View>

            {customerRegisterPostLoading || emailValidatePostLoading ? (
              <ActivityIndicator style={styles.button} color={ThemeColor} />
            ) : (
              <Button
                style={styles.button}
                title="Giriş yap"
                onPress={() => this._handleSubmitRegisterCustomer()}
                color={ThemeColor}
              />
            )}
          </Animatable.View>
        </Animatable.View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({
  customerServiceResponse,
  generalServiceGetResponse
}) => ({
  customerServiceResponse,
  generalServiceGetResponse
});

const mapDispatchToProps = {
  customerRegisterPost,
  emailValidatePost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerForm);

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    width: width * 0.8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 44,
    marginBottom: 10
  },
  inputIcon: {
    color: "white",
    paddingRight: 7,
    width: 18
  },
  input: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: 14,
    fontFamily: "Raleway_Light",
    borderBottomColor: "transparent",
    borderBottomWidth: 0,
    width: width * 0.8 - 30 - 18
  },
  button: {
    borderRadius: 10,
    width: width * 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 44
  },
  lineByLine: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 18
  },
  line: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 55
  },
  lineByText: {
    textAlign: "center",
    height: 15,
    color: "white",
    fontSize: 14,
    fontFamily: "Raleway_Light",
    paddingLeft: 5,
    paddingRight: 5
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  socialLoginIcon: {
    color: "white",
    paddingLeft: 10,
    paddingRight: 10
  },
  logoView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  logoText: {
    fontFamily: "Raleway_Bold",
    fontSize: 54,
    color: "#fff"
  },
  fullBackgroundImage: {
    width: width,
    height: height,
    flex: 1
  },
  loginScreenView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  loginFormView: {
    flexDirection: "column",
    justifyContent: "center",
    height: height * 0.8
  },
  registerTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.8,
    marginBottom: 10
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
  }
});
