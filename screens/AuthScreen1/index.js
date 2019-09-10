import React, { Component } from "react";
import { Content } from "native-base";
import { connect } from "react-redux";
import { StyleSheet, StatusBar } from "react-native";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

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

  componentDidMount() {
    this._onFocusListener = this.props.navigation.addListener(
      "didFocus",
      payload => {
        const { navigation } = this.props;
        this.setState({ pageState: navigation.getParam("pageState", "login") });
      }
    );
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
        {this.state.pageState == "login" ? (
          <LoginForm
            navigation={this.props.navigation}
            form_change={this.getRegisterPage}
          />
        ) : this.state.pageState == "register" ? (
          <RegisterForm
            form_change={this.getLoginPage}
            navigation={this.props.navigation}
          />
        ) : null}
      </Content>
    );
  }
}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const styles = StyleSheet.create({});
