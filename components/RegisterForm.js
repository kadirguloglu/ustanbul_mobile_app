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
  Dimensions
} from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeColor } from "../src/functions";
import MasterForm from "./RegisterTypeForms/MasterForm";
import CompanyForm from "./RegisterTypeForms/CompanyForm";
import CustomerForm from "./RegisterTypeForms/CustomerForm";
import FacebookForm from "./RegisterTypeForms/FacebookForm";
import GooglePlusForm from "./RegisterTypeForms/GooglePlusForm";
import TwitterForm from "./RegisterTypeForms/TwitterForm";

const { width, height } = Dimensions.get("window");
class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoHeight: height,
      RegisterFormType: null
    };
    this.registerFormNull = this.registerFormNull.bind(this);
  }
  registerFormNull() {
    this.setState({ RegisterFormType: null });
  }
  componentWillMount() {}
  render() {
    const { generalServiceGetResponse } = this.props;
    const { getSiteData } = generalServiceGetResponse;
    if (this.state.RegisterFormType == "Customer") {
      return (
        <CustomerForm
          open_register_form={this.registerFormNull}
          navigation={this.props.navigation}
          login_form={this.props.form_change}
        />
      );
    }
    if (this.state.RegisterFormType == "Master") {
      return (
        <MasterForm
          open_register_form={this.registerFormNull}
          navigation={this.props.navigation}
          login_form={this.props.form_change}
        />
      );
    }
    if (this.state.RegisterFormType == "Company") {
      return (
        <CompanyForm
          open_register_form={this.registerFormNull}
          navigation={this.props.navigation}
          login_form={this.props.form_change}
        />
      );
    }
    if (this.state.RegisterFormType == "Facebook") {
      return (
        <FacebookForm
          open_register_form={this.registerFormNull}
          login_form={this.props.form_change}
          navigation={this.props.navigation}
        />
      );
    }
    if (this.state.RegisterFormType == "Twitter") {
      return (
        <TwitterForm
          open_register_form={this.registerFormNull}
          login_form={this.props.form_change}
          navigation={this.props.navigation}
        />
      );
    }
    if (this.state.RegisterFormType == "GooglePlus") {
      return (
        <GooglePlusForm
          open_register_form={this.registerFormNull}
          login_form={this.props.form_change}
          navigation={this.props.navigation}
        />
      );
    }
    if (this.state.RegisterFormType == null) {
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
              <View style={{ marginBottom: 10 }}>
                <Button
                  style={styles.button}
                  title="Usta Arıyorum"
                  onPress={() =>
                    this.setState({ RegisterFormType: "Customer" })
                  }
                  color="#d6471a"
                  navigation={this.props.navigation}
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                <Button
                  style={styles.button}
                  title="Ustayım"
                  onPress={() => this.setState({ RegisterFormType: "Master" })}
                  color="#19c53b"
                  navigation={this.props.navigation}
                />
              </View>
              {/* <View style={{ marginBottom: 10 }}>
                <Button
                  style={styles.button}
                  title="Şirketim"
                  onPress={() => this.setState({ RegisterFormType: "Company" })}
                  color={ThemeColor}
                />
              </View> */}
              <View style={styles.lineByLine}>
                <View style={styles.line} />
                <Text style={styles.lineByText}>sosyal medya ile kayıt ol</Text>
                <View style={styles.line} />
              </View>
              <View style={styles.socialLoginContainer}>
                {/* <FontAwesome
                  style={styles.socialLoginIcon}
                  name="google"
                  size={19}
                  onPress={() =>
                    this.setState({ RegisterFormType: "GooglePlus" })
                  }
                /> */}
                <FontAwesome
                  style={styles.socialLoginIcon}
                  name="facebook"
                  size={19}
                  onPress={() =>
                    this.setState({ RegisterFormType: "Facebook" })
                  }
                />
                {/* <FontAwesome
                  style={styles.socialLoginIcon}
                  name="twitter"
                  size={19}
                  onPress={() => this.setState({ RegisterFormType: "Twitter" })}
                /> */}
              </View>

              <TouchableHighlight
                onPress={() => this.props.form_change()}
                style={styles.registerTextContainer}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.text_1]}>Hesabım var mı?{"   "}</Text>
                  <Text style={[styles.text_2]}>Giriş Yap</Text>
                </View>
              </TouchableHighlight>
            </Animatable.View>
          </Animatable.View>
        </ImageBackground>
      );
    }
  }
}

const mapStateToProps = ({ generalServiceGetResponse }) => ({
  generalServiceGetResponse
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);

const styles = StyleSheet.create({
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
    fontSize: 40,
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
    alignItems: "center",
    height: height
  },
  loginFormView: {
    flexDirection: "column",
    justifyContent: "flex-start",
    height: height * 0.8
  },
  registerTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "column",
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
