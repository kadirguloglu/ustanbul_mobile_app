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
  Dimensions
} from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeColor } from "../src/functions";
import { loginUser } from "../src/actions/generalServiceGet";
import styles from "./LoginFormCss";

const { height } = Dimensions.get("window");
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      logoHeight: height
    };
  }
  componentWillMount() {}

  handlePressLogin = () => {
    this.props
      .loginUser(this.state.email, this.state.password)
      .then(({ payload }) => {
        if (payload.data.ErrorText !== "") {
          alert(payload.data.ErrorText);
        } else {
          this.props.navigation.navigate("Home");
        }
      });
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/background/login-register-background.png")}
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
            style={[styles.logoView, { height: this.state.logoHeight }]}
          >
            <Text style={[styles.logoText]}>FixMasTR</Text>
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
            {this.props.isLoginState ? (
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
              <FontAwesome
                style={styles.socialLoginIcon}
                name="google"
                size={19}
                onPress={() => console.log("google ile giriş yap")}
              />
              <FontAwesome
                style={styles.socialLoginIcon}
                name="facebook"
                size={19}
                onPress={() => console.log("facebook ile giriş yap")}
              />
              <FontAwesome
                style={styles.socialLoginIcon}
                name="twitter"
                size={19}
                onPress={() => console.log("twitter ile giriş yap")}
              />
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

const mapStateToProps = ({ isLoginState, errorLoginUser }) => ({
  isLoginState,
  errorLoginUser
});

const mapDispatchToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
