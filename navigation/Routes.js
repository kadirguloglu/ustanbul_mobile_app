import { connect } from "react-redux";
import React from "react";
import { Text, List, ListItem } from "native-base";

import { logoutUser } from "../src/actions/generalServiceGet";
import { routesCustomer, routesCompany } from "../constants/StaticRoutes";
class DrawerLinks extends React.Component {
  _handleLogout = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };
  checkPermission = data => {
    const { navigation } = this.props;
    return (
      <ListItem
        button
        onPress={() =>
          data.isFunction
            ? data.to === "Logout"
              ? this._handleLogout()
              : null
            : navigation.navigate(data.to)
        }
        keyExtractor={(item, index) => "render-routes--1"}
      >
        <Text>{data.name}</Text>
      </ListItem>
    );
  };
  render() {
    if (this.props.generalServiceGetResponse.activeUser.Id === 0) {
      return (
        <List
          dataArray={[0]}
          contentContainerStyle={{ marginTop: 120 }}
          renderRow={data => {
            return (
              <React.Fragment>
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate("Home")}
                >
                  <Text>{"Anasayfa"}</Text>
                </ListItem>
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  <Text>{"Giriş yap"}</Text>
                </ListItem>
              </React.Fragment>
            );
          }}
          keyExtractor={(item, index) => "render-routes-" + index.toString()}
        />
      );
    }
    return (
      <List
        dataArray={
          this.props.generalServiceGetResponse.activeUser.IsCompany
            ? routesCompany
            : routesCustomer
        }
        contentContainerStyle={{ marginTop: 120 }}
        renderRow={data => {
          return this.checkPermission(data);
        }}
        keyExtractor={(item, index) => "render-routes-" + index.toString()}
      />
    );
  }
}

const mapStateToProps = ({ generalServiceGetResponse }) => {
  return {
    generalServiceGetResponse
  };
};

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerLinks);
