import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  Root,
  Header,
  Left,
  Right,
  Content,
  Button,
  Icon,
  Title,
  Item,
  Picker,
  Input,
  Body,
  Spinner,
  View,
  Text,
  Container,
  Toast
} from "native-base";

import i18n from "../../constants/strings";
import {
  contactSubjectData,
  postContactSubject
} from "../../src/actions/homeService";
import MyButton from "../../components/MyButton";
import { MyToast } from "../../src/functions";

class ContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const { generalServiceGetResponse, contactSubjectData } = this.props;
    const { activeUser } = generalServiceGetResponse;
    this.setState({
      ContactMessage: {
        MessageSubjectID: -1,
        NameSurname: activeUser.IsCompany
          ? activeUser.Companys.AuthorizedPersonName
          : activeUser.Customer.Name + " " + activeUser.Customer.Surname,
        PhoneNumber: activeUser.PhoneNumber,
        Email: activeUser.Email,
        Title: "",
        Description: "",
        UserID: activeUser.Id,
        SiteID: 1
      }
    });
    contactSubjectData(1, 1);
  }

  handlerContactMessage = () => {
    const { ContactMessage } = this.state;
    const {
      MessageSubjectID,
      NameSurname,
      PhoneNumber,
      Email,
      Title,
      Description
    } = ContactMessage;
    const { postContactSubject } = this.props;
    if (MessageSubjectID == -1) {
      MyToast(i18n.t("text_141"));
      return;
    }
    if (NameSurname.length < 1 || NameSurname.length > 50) {
      MyToast(i18n.t("text_142"));
      return;
    }
    if (PhoneNumber.length < 1 || PhoneNumber.length > 20) {
      MyToast(i18n.t("text_142"));
      return;
    }
    if (Email.length < 1 || Email.length > 50) {
      MyToast(i18n.t("text_142"));
      return;
    }
    if (Title.length < 1 || Title.length > 150) {
      MyToast(i18n.t("text_142"));
      return;
    }
    if (Description.length < 5 || Description.length > 1000) {
      MyToast(i18n.t("text_142"));
      return;
    }
    postContactSubject(ContactMessage).then(({ payload }) => {
      if (payload.data) {
        Toast.show({
          text: i18n.t("text_143"),
          duration: 2500
        });
        this.props.navigation.navigate("Home");
      } else {
        Toast.show({
          text: i18n.t("text_144"),
          duration: 2500
        });
      }
    });
  };

  render() {
    const { homeServiceResponse, navigation } = this.props;
    const { contactSubjectResult, contactSubjectLoading } = homeServiceResponse;
    const { ContactMessage } = this.state;
    const {
      MessageSubjectID,
      NameSurname,
      PhoneNumber,
      Email,
      Description
    } = ContactMessage;
    if (contactSubjectLoading) {
      return <Spinner />;
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.toggleDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{i18n.t("bize_ulas")}</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ padding: 10 }}>
          <View style={styles.pageTopView}>
            <View>
              <Text style={styles.QuestionTitle}>
                {i18n.t("text_145")} {i18n.t("text_146")}
              </Text>
            </View>
            <View>
              <Item rounded>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  placeholder={i18n.t("text_146")}
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined }}
                  selectedValue={MessageSubjectID}
                  onValueChange={value =>
                    this.setState({
                      ContactMessage: {
                        ...ContactMessage,
                        MessageSubjectID: value
                      }
                    })
                  }
                >
                  <Picker.Item
                    key={"dropdown" + -1}
                    label={i18n.t("text_136")}
                    value={-1}
                  />
                  {contactSubjectResult.map(ans => {
                    return (
                      <Picker.Item
                        key={"dropdown" + ans.MessageSubjectID}
                        label={ans.Title}
                        value={ans.MessageSubjectID}
                      />
                    );
                  })}
                </Picker>
              </Item>
            </View>
            <View>
              <Text
                style={
                  MessageSubjectID == -1
                    ? styles.help_block_error
                    : styles.help_block_success
                }
              >
                ** {i18n.t("text_39")}
              </Text>
            </View>
          </View>
          <View style={styles.pageTopView}>
            <View>
              <Text style={styles.QuestionTitle}>
                {i18n.t("text_147")} {i18n.t("text_146")}
              </Text>
            </View>
            <Item rounded>
              <Input
                onChangeText={value =>
                  this.setState({
                    ContactMessage: {
                      ...ContactMessage,
                      NameSurname: value
                    }
                  })
                }
                value={NameSurname}
              />
            </Item>
            <View>
              <Text
                style={
                  NameSurname.length > 1 && NameSurname.length < 50
                    ? styles.help_block_success
                    : styles.help_block_error
                }
              >
                {NameSurname.length} / 50
              </Text>
            </View>
          </View>
          <View style={styles.pageTopView}>
            <View>
              <Text style={styles.QuestionTitle}>
                {i18n.t("text_148")} {i18n.t("text_146")}
              </Text>
            </View>
            <Item rounded>
              <Input
                onChangeText={value =>
                  this.setState({
                    ContactMessage: {
                      ...ContactMessage,
                      PhoneNumber: value
                    }
                  })
                }
                value={PhoneNumber}
              />
            </Item>
            <View>
              <Text
                style={
                  PhoneNumber.length > 1 && PhoneNumber.length < 20
                    ? styles.help_block_success
                    : styles.help_block_error
                }
              >
                {PhoneNumber.length} / 20
              </Text>
            </View>
          </View>
          <View style={styles.pageTopView}>
            <View>
              <Text style={styles.QuestionTitle}>
                {i18n.t("text_149")} {i18n.t("text_146")}
              </Text>
            </View>
            <Item rounded>
              <Input
                onChangeText={value =>
                  this.setState({
                    ContactMessage: {
                      ...ContactMessage,
                      Email: value
                    }
                  })
                }
                value={Email}
              />
            </Item>
            <View>
              <Text
                style={
                  Email.length > 1 && Email.length < 50
                    ? styles.help_block_success
                    : styles.help_block_error
                }
              >
                {Email.length} / 50
              </Text>
            </View>
          </View>
          <View style={styles.pageTopView}>
            <View>
              <Text style={styles.QuestionTitle}>
                {i18n.t("text_150")} {i18n.t("text_146")}
              </Text>
            </View>
            <Item rounded>
              <Input
                onChangeText={value =>
                  this.setState({
                    ContactMessage: {
                      ...ContactMessage,
                      Title: value
                    }
                  })
                }
                value={ContactMessage.Title}
              />
            </Item>
            <View>
              <Text
                style={
                  ContactMessage.Title.length > 1 &&
                  ContactMessage.Title.length < 150
                    ? styles.help_block_success
                    : styles.help_block_error
                }
              >
                {ContactMessage.Title.length} / 150
              </Text>
            </View>
          </View>
          <View style={styles.pageTopView}>
            <View>
              <Text style={styles.QuestionTitle}>
                {i18n.t("text_151")} {i18n.t("text_146")}
              </Text>
            </View>
            <Item rounded>
              <Input
                onChangeText={value =>
                  this.setState({
                    ContactMessage: {
                      ...ContactMessage,
                      Description: value
                    }
                  })
                }
                value={Description}
              />
            </Item>
            <View>
              <Text
                style={
                  Description.length > 5 && Description.length < 1000
                    ? styles.help_block_success
                    : styles.help_block_error
                }
              >
                {Description.length} / 1000
              </Text>
            </View>
          </View>
          <View style={{ paddingBottom: 20 }}>
            <MyButton
              press={() => this.handlerContactMessage()}
              text={i18n.t("text_128")}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({
  homeServiceResponse,
  generalServiceGetResponse
}) => ({
  homeServiceResponse,
  generalServiceGetResponse
});

const mapDispatchToProps = {
  contactSubjectData,
  postContactSubject
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactScreen);

const styles = StyleSheet.create({
  pageTopView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  QuestionTitle: {
    fontSize: 18,
    textAlign: "center",
    padding: 20
  },
  help_block_success: {
    fontSize: 12,
    textAlign: "right",
    color: "green"
  },
  help_block_error: {
    fontSize: 12,
    textAlign: "right",
    color: "red"
  }
});
