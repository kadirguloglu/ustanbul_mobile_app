import { connect } from "react-redux";
import React from "react";
import { Text, List, ListItem } from "native-base";
import { Platform } from "react-native";

const routesCustomer = [
  {
    to: "Home",
    name: "Anasayfa",
    permission: [],
    IOSonly: true
  },

  {
    to: "CustomerDetail",
    name: "Hesap Özeti",
    permission: [],
    IOSonly: false
  },

  {
    to: "ContactPage",
    name: "Bize Ulaş",
    permission: [],
    IOSonly: false
  },

  {
    to: "Logout",
    name: "Çıkış Yap",
    permission: [],
    IOSonly: false
  }
];
const routesCompany = [
  {
    to: "Home",
    name: "Anasayfa",
    permission: [],
    IOSonly: true
  },

  {
    to: "Home",
    name: "Teklif Ver Para Kazan",
    permission: [],
    IOSonly: false
  },

  {
    to: "CustomerDetail",
    name: "Hesap Özeti",
    permission: [],
    IOSonly: false
  },

  {
    to: "Chat",
    name: "Kartlarım",
    permission: [],
    IOSonly: false
  },

  {
    to: "ContactPage",
    name: "Bize Ulaş",
    permission: [],
    IOSonly: false
  },

  {
    to: "Chat",
    name: "Üyeliği Uzat",
    permission: [],
    IOSonly: false
  },

  {
    to: "Logout",
    name: "Çıkış Yap",
    permission: [],
    IOSonly: false
  }
];
class DrawerLinks extends React.Component {
  checkPermission = data => {
    return (
      <ListItem button onPress={() => this.props.navigation.navigate(data.to)}>
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
              <ListItem
                button
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text>{"Giriş yap"}</Text>
              </ListItem>
            );
          }}
        />
      );
    }
    return (
      <List
        dataArray={
          this.props.generalServiceGetResponse.IsCompany
            ? routesCompany
            : routesCustomer
        }
        contentContainerStyle={{ marginTop: 120 }}
        renderRow={data => {
          return this.checkPermission(data);
        }}
      />
    );
  }
}

const mapStateToProps = ({ generalServiceGetResponse }) => {
  return {
    generalServiceGetResponse
  };
};

export default connect(mapStateToProps)(DrawerLinks);
