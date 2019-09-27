import React, { Component } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import {
  Icon,
  Button,
  Content,
  Toast,
  Root,
  Text,
  Input,
  Item,
  Header,
  Left,
  Right,
  Body,
  Title,
  CheckBox,
  ListItem,
  Spinner,
  Picker,
  View
} from "native-base";
import { connect } from "react-redux";

import i18n from "../../constants/strings";
import {
  userUpdateData,
  customerUpdateData
} from "../../src/actions/customerDetailService";
import {
  refreshAuthenticatedUser,
  loginUser
} from "../../src/actions/generalServiceGet";
import MyButton from "../../components/MyButton";

class CustomerDetailProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoading: true,
      getToast: false,

      UserParameter: {
        UserName: "",
        Email: "",
        PhoneNumber: "",
        Password: "",
        NotificationType: -1,
        IsSubscriber: false
      },
      CustomerParameter: {
        Name: "",
        Surname: ""
      }
    };
  }
  componentWillMount() {
    const { activeUser } = this.props.generalServiceGetResponse;
    this.setState({
      UserParameter: activeUser,
      CustomerParameter: activeUser.Customers,
      pageLoading: false
    });
  }

  handlerUserUpdate = () => {
    this.props.userUpdateData(this.state.UserParameter).then(({ payload }) => {
      if (payload) {
        if (payload.data) {
          Toast.show({
            text: i18n.t("text_84"),
            buttonText: "Tamam",
            duration: 2500
          });
          this.props.loginUser("", "", UserParameter.Id);
        } else {
          Toast.show({
            text: i18n.t("text_85"),
            buttonText: "Tamam",
            duration: 2500
          });
        }
      } else {
        Toast.show({
          text: i18n.t("text_85"),
          buttonText: "Tamam",
          duration: 2500
        });
      }
    });
  };

  handlerCustomerUpdate = () => {
    this.props
      .customerUpdateData(this.state.CustomerParameter)
      .then(({ payload }) => {
        if (payload) {
          if (payload.data) {
            Toast.show({
              text: i18n.t("text_84"),
              buttonText: "Tamam",
              duration: 2500
            });
            this.props.loginUser("", "", UserParameter.Id);
          } else {
            Toast.show({
              text: i18n.t("text_85"),
              buttonText: "Tamam",
              duration: 2500
            });
          }
        } else {
          Toast.show({
            text: i18n.t("text_85"),
            buttonText: "Tamam",
            duration: 2500
          });
        }
      });
  };

  render() {
    return (
      <React.Element>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.toggleDrawer()}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>{i18n.t("text_86")}</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ padding: 10 }}>
          <View>
            <Text
              style={{
                textAlign: "center",
                paddingLeft: 20,
                paddingRight: 20,
                fontSize: 24
              }}
            >
              {i18n.t("text_86")}
            </Text>
          </View>
          <View>
            <View>
              <Text>{i18n.t("text_87")}</Text>
            </View>
            <View>
              <Item rounded>
                <Input
                  placeholder={i18n.t("text_87")}
                  onChangeText={value =>
                    this.setState({
                      UserParameter: {
                        ...this.state.UserParameter,
                        UserName: value
                      }
                    })
                  }
                  value={this.state.UserParameter.UserName}
                />
              </Item>
            </View>
            <View>
              <Text
                style={
                  this.state.UserParameter.UserName.length > 10 &&
                  this.state.UserParameter.UserName.length < 50
                    ? styles.help_block_success
                    : styles.help_block_error
                }
              >
                ** {this.state.UserParameter.UserName.length} / 50{" "}
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text>{i18n.t("text_88")}</Text>
            </View>
            <View>
              <Item rounded>
                <Input
                  placeholder={i18n.t("text_88")}
                  onChangeText={value =>
                    this.setState({
                      UserParameter: {
                        ...this.state.UserParameter,
                        Email: value
                      }
                    })
                  }
                  value={this.state.UserParameter.Email}
                />
              </Item>
            </View>
            <View>
              <Text
                style={
                  this.state.UserParameter.Email.length > 10 &&
                  this.state.UserParameter.Email.length < 50
                    ? styles.help_block_success
                    : styles.help_block_error
                }
              >
                ** {this.state.UserParameter.Email.length} / 50{" "}
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text>{i18n.t("text_89")}</Text>
            </View>
            <View>
              <Item rounded>
                <Input
                  placeholder={i18n.t("text_89")}
                  onChangeText={value =>
                    this.setState({
                      UserParameter: {
                        ...this.state.UserParameter,
                        PhoneNumber: value
                      }
                    })
                  }
                  value={this.state.UserParameter.PhoneNumber}
                />
              </Item>
            </View>
            <View>
              <Text
                style={
                  this.state.UserParameter.PhoneNumber.length > 9 &&
                  this.state.UserParameter.PhoneNumber.length < 20
                    ? styles.help_block_success
                    : styles.help_block_error
                }
              >
                {this.state.UserParameter.PhoneNumber.length} / 20{" "}
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text>{i18n.t("text_90")}</Text>
            </View>
            <View>
              <Item rounded>
                <Input
                  placeholder={i18n.t("text_90")}
                  onChangeText={value =>
                    this.setState({
                      UserParameter: {
                        ...this.state.UserParameter,
                        Password: value
                      }
                    })
                  }
                  value={this.state.UserParameter.Password}
                  secureTextEntry={true}
                />
              </Item>
            </View>
            <View>
              <Text
                style={
                  this.state.UserParameter.Password.length > 6 &&
                  this.state.UserParameter.Password.length < 50
                    ? styles.help_block_success
                    : styles.help_block_error
                }
              >
                {i18n.t("text_91")} {this.state.UserParameter.Password.length} /
                50{" "}
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text>{i18n.t("text_92")}</Text>
            </View>
            <View>
              <Item rounded>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  placeholder={i18n.t("text_92")}
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined }}
                  selectedValue={this.state.UserParameter.NotificationType}
                  onValueChange={value =>
                    this.setState({
                      UserParameter: {
                        ...this.state.UserParameter,
                        NotificationType: value
                      }
                    })
                  }
                >
                  <Picker.Item label={i18n.t("text_93")} value={1} />
                  <Picker.Item label={i18n.t("text_94")} value={2} />
                  <Picker.Item label={i18n.t("text_95")} value={3} />
                </Picker>
              </Item>
            </View>
            <View>
              <Text />
            </View>
          </View>
          <View>
            <View>
              <Text>{i18n.t("text_96")}</Text>
            </View>
            <View>
              <ListItem
                onPress={() =>
                  this.setState({
                    UserParameter: {
                      ...this.state.UserParameter,
                      IsSubscriber: !this.state.UserParameter.IsSubscriber
                    }
                  })
                }
              >
                <CheckBox checked={this.state.UserParameter.IsSubscriber} />
                <Body
                  onPress={() =>
                    this.setState({
                      UserParameter: {
                        ...this.state.UserParameter,
                        IsSubscriber: !this.state.UserParameter.IsSubscriber
                      }
                    })
                  }
                >
                  <Text>{i18n.t("text_96")}</Text>
                </Body>
              </ListItem>
            </View>
            <View>
              <Text />
            </View>
          </View>
          <View>
            <MyButton
              press={() => this.handlerUserUpdate()}
              text={i18n.t("text_97")}
            />
            {/* <TouchableHighlight onPress={() => this.handlerUserUpdate()}>
                                <Text>Hesap Bilgilerimi Kaydet</Text>
                            </TouchableHighlight> */}
          </View>
          <View>
            <Text
              style={{
                textAlign: "center",
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                fontSize: 24
              }}
            >
              {i18n.t("text_98")}
            </Text>
          </View>
          <View>
            <View>
              <Text>{i18n.t("text_99")}</Text>
            </View>
            <View>
              <Item rounded>
                <Input
                  placeholder={i18n.t("text_99")}
                  onChangeText={value =>
                    this.setState({
                      CustomerParameter: {
                        ...this.state.CustomerParameter,
                        Name: value
                      }
                    })
                  }
                  value={this.state.CustomerParameter.Name}
                />
              </Item>
            </View>
            <View>
              <Text
                style={
                  this.state.CustomerParameter.Name.length > 3 &&
                  this.state.CustomerParameter.Name.length < 50
                    ? styles.help_block_success
                    : styles.help_block_error
                }
              >
                ** {this.state.CustomerParameter.Name.length} / 50{" "}
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text>{i18n.t("text_100")}</Text>
            </View>
            <View>
              <Item rounded>
                <Input
                  placeholder={i18n.t("text_100")}
                  onChangeText={value =>
                    this.setState({
                      CustomerParameter: {
                        ...this.state.CustomerParameter,
                        Surname: value
                      }
                    })
                  }
                  value={this.state.CustomerParameter.Surname}
                />
              </Item>
            </View>
            <View>
              <Text
                style={
                  this.state.CustomerParameter.Surname.length > 3 &&
                  this.state.CustomerParameter.Surname.length < 50
                    ? styles.help_block_success
                    : styles.help_block_error
                }
              >
                ** {this.state.CustomerParameter.Surname.length} / 50{" "}
              </Text>
            </View>
          </View>
          <View style={{ paddingBottom: 20 }}>
            <MyButton
              press={() => this.handlerCustomerUpdate()}
              text={i18n.t("text_101")}
            />
          </View>
        </Content>
      </React.Element>
    );
  }
}

const mapStateToProps = ({
  activeUser,
  userUpdateLoading,
  userUpdateResult
}) => ({
  activeUser,
  userUpdateLoading,
  userUpdateResult
});

const mapDispatchToProps = {
  userUpdateData,
  customerUpdateData,
  refreshAuthenticatedUser,
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetailProfileScreen);

const styles = StyleSheet.create({
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
