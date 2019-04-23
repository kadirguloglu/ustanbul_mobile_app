import React from "react";
import { Image } from "react-native";
import { Container, Content, Text, List, ListItem, View, Icon, Spinner } from "native-base";
import { MidPath } from '../functions'
import { connect } from 'react-redux';
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
  }];
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
  }];
class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { activeUser } = this.props;
    if (activeUser == null)
      return (
        <Spinner />
      )
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
              }} />
          ) : (null)}
          <View>
            {activeUser != null && activeUser.IsCompany ? (
              <View>
                <Text style={{ marginTop: 135, textAlign: 'center', fontSize: 12 }}>
                  Kullanıcı Kodu : {activeUser.Code ? activeUser.Code.CodeText : ''}{activeUser.ID}
                </Text>
                <Text style={{ marginTop: 0, textAlign: 'center', fontSize: 12 }}>
                  Kasadaki Tutar : 250 ₺ <Icon style={{ fontSize: 12 }} name="ios-help"></Icon>
                </Text>
                <Text>{activeUser.Company.CompanyName}</Text>
                <List
                  contentContainerStyle={{ marginTop: 0 }}
                  dataArray={routesCompany}
                  renderRow={data => {
                    return (
                      <ListItem
                        button
                        onPress={() => this.props.navigation.navigate(data.Route)}>
                        <Text>{data.Text}</Text>
                      </ListItem>
                    );
                  }}
                />
              </View>
            ) : (
                <Container>
                  <View>
                    <Text style={{ marginTop: 135, textAlign: 'center', fontSize: 12 }}>
                      Kullanıcı Kodu : {activeUser.Code.CodeText}{activeUser.ID}
                    </Text>
                    <Text style={{ marginTop: 0, textAlign: 'center', fontSize: 12 }}>
                      Kasadaki Tutar : 250 ₺ <Icon style={{ fontSize: 12 }} name="ios-help"></Icon>
                    </Text>
                    <Text>{activeUser.Company.CompanyName}</Text>
                    <List
                      contentContainerStyle={{ marginTop: 0 }}
                      dataArray={routesCustomer}
                      renderRow={data => {
                        return (
                          <ListItem
                            button
                            onPress={() => this.props.navigation.navigate(data.Route)}>
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

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);