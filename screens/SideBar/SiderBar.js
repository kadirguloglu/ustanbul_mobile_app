import React from "react";
import { Image } from "react-native";
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  View,
  Icon,
  Spinner
} from "native-base";
import { MidPath } from "../functions";
import { connect } from "react-redux";
import i18n from "../../constants/strings";

const routesCustomer = [
  {
    Route: "Home",
    Text: i18n.t("anasayfa")
  },

  {
    Route: "CustomerDetail",
    Text: i18n.t("hesap_ozeti")
  },

  {
    Route: "ContactPage",
    Text: i18n.t("bize_ulas")
  },

  {
    Route: "Logout",
    Text: i18n.t("cikis_yap")
  }
];
const routesCompany = [
  {
    Route: "Home",
    Text: i18n.t("anasayfa")
  },

  {
    Route: "CompanyService",
    Text: i18n.t("teklif_ver_para_kazan")
  },

  {
    Route: "CustomerDetail",
    Text: i18n.t("hesap_ozeti")
  },

  {
    Route: "Chat",
    Text: i18n.t("kartlarim")
  },

  {
    Route: "ContactPage",
    Text: i18n.t("bize_ulas")
  },

  {
    Route: "Chat",
    Text: i18n.t("uyeligi_uzat")
  },

  {
    Route: "Logout",
    Text: i18n.t("cikis_yap")
  }
];
class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { activeUser } = this.props;
    if (activeUser == null) return <Spinner />;
    return (
      <Container>
        <Content>
          {activeUser.ProfilePicturePath ? (
            <Image
              source={{ uri: MidPath(activeUser.ProfilePicturePath) }}
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
                <List
                  contentContainerStyle={{ marginTop: 0 }}
                  dataArray={routesCompany}
                  renderRow={(data, index) => {
                    return (
                      <ListItem
                        button
                        onPress={() =>
                          this.props.navigation.navigate(data.Route)
                        }
                        key={"menu-item" + index}
                      >
                        <Text>{data.Text}</Text>
                      </ListItem>
                    );
                  }}
                />
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
                  <List
                    contentContainerStyle={{ marginTop: 0 }}
                    dataArray={routesCustomer}
                    renderRow={(data, index) => {
                      return (
                        <ListItem
                          button
                          onPress={() =>
                            this.props.navigation.navigate(data.Route)
                          }
                          key={"menu-item" + index}
                        >
                          <Text>{data.Text}</Text>
                        </ListItem>
                      );
                    }}
                  />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
