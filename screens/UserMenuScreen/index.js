import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content } from "native-base";
import {
  Text,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Button,
  Icon
} from "native-base";
import { Image } from "react-native";

import { ThemeColor } from "../../src/functions";
import { routesCustomer, routesCompany } from "../../constants/StaticRoutes";
import { logoutUser } from "../../src/actions/generalServiceGet";

class UserMenuScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}

  _handleLogout = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };

  checkPermission = (data, index) => {
    const { navigation } = this.props;
    if (!data.menu) {
      return null;
    }
    return (
      <ListItem
        key={"menuItem-" + index}
        button
        onPress={() =>
          data.isFunction
            ? data.to === "Logout"
              ? this._handleLogout()
              : null
            : navigation.navigate(data.to)
        }
        icon
        key={"loginUserMenu" + index}
      >
        <Left>
          <Icon
            color={ThemeColor}
            style={{ color: ThemeColor }}
            active
            name={data.icon}
          />
        </Left>
        <Body>
          <Text>{data.name}</Text>
        </Body>
      </ListItem>
    );
  };

  render() {
    const { generalServiceGetResponse, navigation } = this.props;
    const { activeUser } = generalServiceGetResponse;
    if (activeUser.Id === 0) {
      return (
        <Container>
          <Content>
            <Image
              square
              style={{
                height: 80,
                position: "absolute",
                alignSelf: "center",
                resizeMode: "contain",
                top: 20
              }}
              source={require("../../assets/icon.png")}
            />
            <List
              dataArray={[0]}
              contentContainerStyle={{ marginTop: 120 }}
              renderRow={data => {
                return (
                  <ListItem
                    button
                    onPress={() => navigation.navigate("Login")}
                    icon
                    key={"loginUserMenu"}
                  >
                    <Left>
                      <Icon
                        color={ThemeColor}
                        style={{ color: ThemeColor }}
                        active
                        name="ios-folder"
                      />
                    </Left>
                    <Body>
                      <Text>{"Giriş yap"}</Text>
                    </Body>
                  </ListItem>
                );
              }}
            />
          </Content>
        </Container>
      );
    }
    return (
      <Container>
        <Content>
          <Image
            square
            style={{
              height: 80,
              width: 70,
              position: "absolute",
              alignSelf: "center",
              top: 20
            }}
            source={
              activeUser.Id != 0
                ? activeUser.ProfilePicturePath
                  ? activeUser.ProfilePicturePath.Thumb == ""
                    ? require("../../assets/icon.png")
                    : {
                        uri: activeUser.ProfilePicturePath.Thumb
                      }
                  : require("../../assets/icon.png")
                : require("../../assets/icon.png")
            }
          />
          <List
            dataArray={activeUser.IsCompany ? routesCompany : routesCustomer}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={(data, index) => {
              return this.checkPermission(data, index);
            }}
          />
        </Content>
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
