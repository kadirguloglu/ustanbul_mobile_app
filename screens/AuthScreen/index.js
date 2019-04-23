import React, { Component } from "react";
import { Content } from "native-base";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import {
  ImageBackground,
  Dimensions,
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  StatusBar
} from "react-native";
import { loginUser } from "../../src/actions/generalServiceGet";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

const { width, height } = Dimensions.get("window");
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: '',
      // password: '',
      // logoHeight: height,
      pageState: "login"
    };
    this.getRegisterPage = this.getRegisterPage.bind(this);
    this.getLoginPage = this.getLoginPage.bind(this);
  }
  componentWillMount() {
    StatusBar.setHidden(true);
  }
  getRegisterPage() {
    this.setState({ pageState: "register" });
  }
  getLoginPage() {
    this.setState({ pageState: "login" });
  }
  render() {
    return (
      <Content>
        {}
        {this.state.pageState == "login" ? (
          <LoginForm form_change={this.getRegisterPage} />
        ) : this.state.pageState == "register" ? (
          <RegisterForm form_change={this.getLoginPage} />
        ) : null}
      </Content>
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
)(LoginScreen);

const styles = StyleSheet.create({});
