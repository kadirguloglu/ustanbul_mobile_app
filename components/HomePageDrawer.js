import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  ViewPropTypes,
  Button,
  Image,
  TouchableHighlight
} from "react-native";

import i18n from "../constants/strings";
import { Container, Content, Text, View, Icon, Spinner } from "native-base";
import { connect } from "react-redux";
import { MidPath } from "../src/functions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "red"
  }
});

class HomePageDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicturePath: ""
    };
  }
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string
  };

  static contextTypes = {
    drawer: PropTypes.object
  };
  componentWillMount() {
    this.ErrorProfilePicture = function() {
      this.setState({
        profilePicturePath: require("../assets/profile-photo.jpg")
      });
    };
  }
  render() {
    const { activeUser } = this.props;
    if (activeUser == null) return <Text>Non active user</Text>;
    return (
      <Container>
        <Content>
          {activeUser.ProfilePicturePath ? (
            <Image
              source={
                this.state.profilePicturePath == ""
                  ? { uri: MidPath(activeUser.ProfilePicturePath) }
                  : this.state.profilePicturePath
              }
              onError={() => this.ErrorProfilePicture()}
              square
              style={{
                height: 120,
                width: 120,
                position: "absolute",
                alignSelf: "center",
                top: 20
              }}
            />
          ) : null}
          <View>
            {activeUser != null && activeUser.IsCompany ? (
              <View>
                <Text
                  style={{ marginTop: 135, textAlign: "center", fontSize: 12 }}
                >
                  {i18n.t("kullanici_kodu")} :{" "}
                  {activeUser.Code ? activeUser.Code.CodeText : ""}
                  {activeUser.ID}
                </Text>
                <Text
                  style={{ marginTop: 0, textAlign: "center", fontSize: 12 }}
                >
                  {i18n.t("kasadaki_tutar")} : 250 ₺{" "}
                  <Icon style={{ fontSize: 12 }} name="ios-help" />
                </Text>
                <Text>{activeUser.Company.CompanyName}</Text>
                {routesCompany.map(data => {
                  return (
                    <TouchableHighlight
                      onPress={() => this.props.navigation.navigate(data.Route)}
                      key={"menu-item-company-" + data.Text}
                    >
                      <Text>{data.Text}</Text>
                    </TouchableHighlight>
                  );
                })}
                {/* <List
                  contentContainerStyle={{ marginTop: 0 }}
                  dataArray={routesCompany}
                  renderRow={data => {
                    return (
                      <ListItem
                        button
                        onPress={() =>
                          this.props.navigation.navigate(data.Route)
                        }
                      >
                        <Text>{data.Text}</Text>
                      </ListItem>
                    );
                  }}
                /> */}
              </View>
            ) : (
              <Container>
                <View>
                  <Text
                    style={{
                      marginTop: 135,
                      textAlign: "center",
                      fontSize: 12
                    }}
                  >
                    {i18n.t("kullanici_kodu")} : {activeUser.Code.CodeText}
                    {activeUser.ID}
                  </Text>
                  <Text
                    style={{ marginTop: 0, textAlign: "center", fontSize: 12 }}
                  >
                    {i18n.t("kasadaki_tutar")} : 250 ₺{" "}
                    <Icon style={{ fontSize: 12 }} name="ios-help" />
                  </Text>
                  <Text>{activeUser.Company.CompanyName}</Text>
                  {routesCustomer.map(data => {
                    return (
                      <TouchableHighlight
                        onPress={() =>
                          this.props.navigation.navigate(data.Route)
                        }
                        key={"menu-item-" + data.Text}
                      >
                        <Text>{data.Text}</Text>
                      </TouchableHighlight>
                    );
                  })}
                  {/* <List
                    contentContainerStyle={{ marginTop: 0 }}
                    dataArray={routesCustomer}
                    renderRow={data => {
                      return (
                        <ListItem
                          button
                          onPress={() =>
                            this.props.navigation.navigate(data.Route)
                          }
                        >
                          <Text>{data.Text}</Text>
                        </ListItem>
                      );
                    }}
                  /> */}
                </View>
              </Container>
            )}
          </View>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = ({ activeUser }) => ({
  activeUser
});

const mapDispatchToProps = {};

const routesCustomer = [
  {
    Route: "Home",
    Text: "Anasayfa"
  },

  {
    Route: "CustomerDetail",
    Text: "Hesap Özeti"
  },

  {
    Route: "ContactPage",
    Text: "Bize Ulaş"
  },

  {
    Route: "Logout",
    Text: "Çıkış Yap"
  }
];
const routesCompany = [
  {
    Route: "Home",
    Text: "Anasayfa"
  },

  {
    Route: "CompanyService",
    Text: "Teklif Ver Para Kazan"
  },

  {
    Route: "CustomerDetail",
    Text: "Hesap Özeti"
  },

  {
    Route: "Chat",
    Text: "Kartlarım"
  },

  {
    Route: "ContactPage",
    Text: "Bize Ulaş"
  },

  {
    Route: "Chat",
    Text: "Üyeliği Uzat"
  },

  {
    Route: "Logout",
    Text: "Çıkış Yap"
  }
];

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageDrawer);
