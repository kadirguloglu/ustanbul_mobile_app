import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content } from "native-base";
import { TouchableHighlight, Text } from "react-native";
import { logoutUser } from "../reducer-functions";
import MyFooter from "../../components/MyFooter";

class UserMenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}
  render() {
    return (
      <Container>
        <Content style={{ marginTop: 30 }}>
          {this.props.generalServiceGetResponse.activeUser.Id !== 0 ? (
            <TouchableHighlight onPress={() => this.props.logoutUser()}>
              <Text>Çıkış yap</Text>
            </TouchableHighlight>
          ) : (
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text>Giriş yap</Text>
            </TouchableHighlight>
          )}
        </Content>
        {/* <MyFooter active_tab={4} /> */}
      </Container>
    );
  }
}
const mapStateToProps = ({ generalServiceGetResponse }) => ({
  generalServiceGetResponse
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenuScreen);
