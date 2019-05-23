import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";
import {
  Icon,
  Button,
  Toast,
  Root,
  Title,
  Spinner,
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";
import { connect } from "react-redux";
import moment from "moment";

import { messageUserList } from "../../src/actions/messageServiceGet";
import { userChatReadMessage } from "../../src/actions/messageServicePost";
import { userChatMessageOld } from "../../src/actions/serviceService";
import { SmallPath, ChatConnectionUrl, ThemeColor } from "../../src/functions";
import signalr from "react-native-signalr";

let deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      messageDetailBoxY: new Animated.Value(-deviceHeight),
      selectedMessageUser: {},
      writingMessage: "",
      writingText: ". ",
      writing: [],
      IsSendMessageApproved: true
    };
  }
  componentWillMount() {
    this.props.messageUserList(
      this.props.generalServiceGetResponse.activeUser.Id
    );
    //This is the server under /example/server published on azure.
    const connection = signalr.hubConnection(ChatConnectionUrl);
    connection.logging = true;

    const proxy = connection.createHubProxy("liveChatHub");

    proxy.on("readingChatBlock", (readUserId, readingUserId, displayType) => {
      if (readingUserId != this.props.generalServiceGetResponse.activeUser.Id)
        return;
      var writingArray = this.state.writing;
      if (this.state.writing) {
        for (i = 0; i < this.state.writing.length; i++) {
          if (this.state.writing[i].userID == readUserId) {
            if (displayType == "none") writingArray[i].IsWriting = false;
            else writingArray[i].IsWriting = true;
            this.setState({ writing: writingArray });
            return;
          }
        }
      }
      writingArray.push({
        userID: readUserId,
        IsWriting: true
      });
      this.setState({ writing: writingArray });
      //Here I could response by calling something else on the server...
    });

    proxy.on("refreshMessageBlock", (sendUserId, sendedUserId) => {
      if (sendedUserId == this.props.generalServiceGetResponse.activeUser.Id) {
        this.props.messageUserList();
        if (sendUserId == this.state.selectedMessageUser.UserID) {
          this.props.userChatMessageOld(
            this.props.generalServiceGetResponse.activeUser,
            this.state.selectedMessageUser.UserID
          );
          this.props.userChatReadMessage(
            this.props.generalServiceGetResponse.activeUser,
            this.state.selectedMessageUser.UserID
          );
        }
      }
    });

    // atempt connection, and handle errors
    connection
      .start()
      .done(() => {
        console.log("Now connected, connection ID=" + connection.id);

        proxy
          .invoke("helloServer", "Hello Server, how are you?")
          .done(directResponse => {
            console.log("direct-response-from-server", directResponse);
          })
          .fail(() => {
            console.warn(
              "Something went wrong when calling server, it might not be up and running?"
            );
          });
      })
      .fail(() => {
        console.log("connection.start().done Failed : ", arguments);
      });

    //connection-handling
    connection.connectionSlow(() => {
      Toast.show({
        text:
          "Bağlantınız çok yavaş. Bir wifi ağına bağlanmayı deneyebilirsiniz.",
        duration: 2500
      });
    });

    connection.error(error => {
      const errorMessage = error.message;
      let detailedError = "";
      if (error.source && error.source._response) {
        detailedError = error.source._response;
      }
      if (
        detailedError ===
        "An SSL error has occurred and a secure connection to the server cannot be made."
      ) {
        console.log(
          "When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14"
        );
      }
      console.debug("SignalR error: " + errorMessage, detailedError);
    });
    this.returnButtonPressEvent = function() {
      Animated.timing(this.state.messageDetailBoxY, {
        duration: 300,
        toValue: -deviceHeight
      }).start();
      this.setState({ selectedMessageUser: {} });
    };
    this.handlerSetMessage = function() {
      if (this.state.writingMessage < 4) {
        Toast.show({
          text: "En az 4 karakter yazmalısınız.",
          buttonText: "Tamam",
          duration: 2500
        });
        return;
      }
      if (this.state.IsSendMessageApproved) {
        this.setState({ IsSendMessageApproved: false });
        proxy
          .invoke(
            "SendChatMessage",
            this.props.generalServiceGetResponse.activeUser.Id,
            this.state.selectedMessageUser.UserID,
            this.state.writingMessage
          )
          .done(directResponse => {
            this.setState({ writingMessage: "" });
            this.props.userChatMessageOld(
              this.props.generalServiceGetResponse.activeUser,
              this.state.selectedMessageUser.UserID
            );
            this.props.userChatReadMessage(
              this.props.generalServiceGetResponse.activeUser,
              this.state.selectedMessageUser.UserID
            );
            this.setState({ IsSendMessageApproved: true });
          })
          .fail(() => {
            Toast.show({
              text: "Mesajınız gönderilemedi. Tekrar deneyiniz.",
              buttonText: "Tamam",
              duration: 2500
            });
          });
      }
    };
    this.handlerMessageList = function(item) {
      Animated.timing(this.state.messageDetailBoxY, {
        duration: 300,
        toValue: 0
      }).start();
      this.props.userChatMessageOld(
        this.props.generalServiceGetResponse.activeUser,
        item.UserID
      );
      this.props.userChatReadMessage(
        this.props.generalServiceGetResponse.activeUser,
        item.UserID
      );
      this.setState({ selectedMessageUser: item });
    };
    this.handlerUserChatMessage = function() {
      const { serviceServiceResponse, generalServiceGetResponse } = this.props;
      const {
        oldChatMessageLoading,
        oldChatMessageDataState,
        oldChatMessageDataResult
      } = serviceServiceResponse;
      const { activeUser } = generalServiceGetResponse;
      if (oldChatMessageDataState) {
        setTimeout(() => {
          this.refs.chatScrollView.scrollToEnd({ animated: true });
        }, 500);
        if (oldChatMessageDataResult.UserChats) {
          return oldChatMessageDataResult.UserChats.map((item, index) => {
            if (item.UserID == activeUser.Id)
              return (
                <View key={"message" + index} style={styles.messageRightBox}>
                  <Text style={styles.messageRight}>{item.Message}</Text>
                </View>
              );
            else
              return (
                <View key={"message" + index} style={styles.messageLeftBox}>
                  <Text style={styles.messageLeft}>{item.Message}</Text>
                </View>
              );
          });
        }
        return <Spinner />;
      } else {
        return <Text>Mesajlar Yüklenemedi</Text>;
      }
    };
    this.handlerWritingText = function(item) {
      if (this.state.writing) {
        for (i = 0; i < this.state.writing.length; i++) {
          if (this.state.writing[i].userID == item.UserID) {
            if (this.state.writing[i].IsWriting)
              return (
                <Text>
                  <Icon style={[styles.messageWritingIcon]} name="ios-more" />{" "}
                </Text>
              );
            else return null;
          }
        }
      }
      return null;
    };
    let isStartWriting = false;
    this.handlerWriting = function(value) {
      this.setState({ writingMessage: value });
      if (isStartWriting == false) {
        let displayType = "block";
        let userID = this.state.selectedMessageUser.UserID;
        isStartWriting = true;
        if (value.length < 4) {
          displayType = "none";
        }
        setTimeout(() => {
          proxy
            .invoke(
              "ReadingChatHub",
              this.props.generalServiceGetResponse.activeUser.Id,
              userID,
              displayType
            )
            .done(directResponse => {
              console.log("direct-response-from-server", directResponse);
            })
            .fail(() => {
              console.warn(
                "Something went wrong when calling server, it might not be up and running?"
              );
            });
          isStartWriting = false;
        }, 1000);
      }
    };
  }
  render() {
    if (this.state.isLoading) {
      return <Spinner color="blue" />;
    } else {
      return (
        <Root>
          <Container>
            <Header style={{ backgroundColor: ThemeColor }}>
              <Left>
                <Button
                  transparent
                  onPress={() => this.props.navigation.toggleDrawer()}
                >
                  <Icon
                    name="ios-menu"
                    color="white"
                    style={{ color: "white" }}
                  />
                </Button>
              </Left>
              <Body>
                <Title style={{ color: "white" }}>Sohbetler</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              <List>
                {this.props.messageServiceGetResponse.messageUserListResult
                  ? this.props.messageServiceGetResponse.messageUserListResult.map(
                      (item, index) => {
                        return (
                          <ListItem key={"UserList" + index} avatar>
                            <Left>
                              <Thumbnail source={SmallPath(item.PicturePath)} />
                            </Left>
                            <Body>
                              <Text>{item.SenderName}</Text>
                              <Text note>{item.Message}</Text>
                            </Body>
                            <Right>
                              <Text note>
                                {moment(item.CreateDate).format(
                                  "DD-MM-YYYY"
                                ) === moment().format("DD-MM-YYYY")
                                  ? moment(item.CreateDate).format("hh:mm")
                                  : moment(item.CreateDate).format(
                                      "DD.MM.YYYY hh:mm"
                                    )}
                              </Text>
                              <Text note style={styles.writingText}>
                                yazıyor
                              </Text>
                            </Right>
                          </ListItem>
                        );
                      }
                    )
                  : null}
              </List>
            </Content>
          </Container>
          {/* <Content>
            {this.props.messageUserListResult
              ? this.props.messageUserListResult.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={"userList" + index}
                      onPress={() => this.handlerMessageList(item)}
                    >
                      <View style={styles.messageBox}>
                        <View style={styles.messageImageBox}>
                          <Thumbnail
                            small
                            source={{ uri: MidPath(item.PicturePath) }}
                          />
                        </View>
                        <View style={styles.messagePreviewBox}>
                          <Text style={styles.messageTitle}>
                            {this.handlerWritingText(item)}
                            {item.SenderName}
                          </Text>
                          <View stye={styles.messagePreviewAndIcon}>
                            <Text style={styles.messagePreview}>
                              {item.IsReaded == true ? null : (
                                <Text>
                                  <Icon
                                    style={styles.messageNewIcon}
                                    name="ios-alert"
                                  />{" "}
                                </Text>
                              )}
                              {item.Message}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              : null}
          </Content>
          <Animated.View
            style={[
              styles.messageDetailBox,
              { transform: [{ translateY: this.state.messageDetailBoxY }] }
            ]}
          >
            <Header style={{ backgroundColor: ThemeColor }}>
              <Left>
                <Button
                  transparent
                  onPress={() => this.returnButtonPressEvent()}
                >
                  <Icon
                    name="ios-arrow-back"
                    color="white"
                    style={{ color: "white" }}
                  />
                </Button>
              </Left>
              <Body>
                <Title style={{ color: "white" }}>
                  {this.state.selectedMessageUser.SenderName}
                </Title>
              </Body>
              <Right />
            </Header>
            <Content
              contentContainerStyle={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <ScrollView scrollEnabled={true} ref={"chatScrollView"}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  {this.handlerUserChatMessage()}
                </View>
              </ScrollView>
              <View style={{ height: 60 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",
                    alignItems: "center",
                    borderTopWidth: 1,
                    borderTopColor: "#dedede",
                    backgroundColor: "white",
                    padding: 5
                  }}
                >
                  <View style={{ width: deviceWidth * 0.9 }}>
                    <Item rounded>
                      <Input
                        placeholder="Mesajınız"
                        onChangeText={value => this.handlerWriting(value)}
                        value={this.state.writingMessage}
                        style={{ fontSize: 15, margin: 1 }}
                      />
                    </Item>
                  </View>
                  <View style={{ width: deviceWidth * 0.09 }}>
                    <TouchableHighlight
                      onPress={() => this.handlerSetMessage()}
                      underlayColor="green"
                      style={styles.button}
                    >
                      <Icon
                        name="ios-send"
                        color="#59aae1"
                        style={{ color: "#59aae1", textAlign: "center" }}
                      />
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Content>
          </Animated.View> */}
        </Root>
      );
    }
  }
}

const mapStateToProps = ({
  serviceServiceResponse,
  messageServiceGetResponse,
  generalServiceGetResponse
}) => ({
  serviceServiceResponse,
  messageServiceGetResponse,
  generalServiceGetResponse
});

const mapDispatchToProps = {
  messageUserList,
  userChatReadMessage,
  userChatMessageOld
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen);

const styles = StyleSheet.create({
  messageBox: {
    padding: 10,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row"
  },
  messageImageBox: { marginRight: 5 },
  messagePreviewBox: {
    justifyContent: "space-around"
  },
  messagePreviewAndIcon: {},
  messageTitle: {
    fontWeight: "bold",
    fontSize: 14
  },
  messagePreview: {
    fontSize: 12
  },
  messageNewIcon: {
    fontSize: 14,
    color: "green",
    marginLeft: 5
  },
  messageWritingIcon: {
    fontSize: 14,
    color: "blue",
    marginLeft: 5
  },
  messageDetailBox: {
    height: deviceHeight,
    width: deviceWidth,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#ededed",
    justifyContent: "center"
  },
  messageLeftBox: {
    margin: 5,
    flex: 1
  },
  messageLeft: {
    textAlign: "left",
    color: "black",
    backgroundColor: "#f6f7f9",
    padding: 5,
    width: deviceWidth * 0.8
  },
  messageRightBox: {
    margin: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  messageRight: {
    textAlign: "right",
    color: "white",
    backgroundColor: "#59aae1",
    padding: 5,
    width: deviceWidth * 0.8
  },
  writingText: {
    color: "green"
  }
});
