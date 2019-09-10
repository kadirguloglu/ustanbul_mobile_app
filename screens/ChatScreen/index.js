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
  Left,
  Body,
  Right,
  Text,
  Tabs,
  Tab
} from "native-base";
import { connect } from "react-redux";
import moment from "moment";
import { NavigationEvents } from "react-navigation";

import i18n from "../../constants/strings";
import { messageUserList } from "../../src/actions/messageServiceGet";
import { userChatReadMessage } from "../../src/actions/messageServicePost";
import { userChatMessageOld } from "../../src/actions/serviceService";
import { SmallPath, ChatConnectionUrl, ThemeColor } from "../../src/functions";
import UserList from "./Components/UserList";
import MessageDetail from "./Components/MessageDetail";

let deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

let isStartWriting = false;
let isMessageTabPageUpdate = false;

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.scrollViewWithChatMessageList = React.createRef();
    this.state = {
      isLoading: false,
      messageDetailBoxY: new Animated.Value(-deviceHeight),
      selectedMessageUser: {},
      writingMessage: "",
      writing: [],
      IsSendMessageApproved: true,
      refreshingChatUserList: false,
      messageTabPage: 0,
      chatTextBoxHeight: 30,
      chatBoxFullHeight: 697,
      headerHeight: 33,
      hubConnection: null
    };
  }

  componentWillMount() {}

  _handleRefreshChatUserList = () => {
    const { generalServiceGetResponse } = this.props;
    const { activeUser } = generalServiceGetResponse;
    messageUserList(activeUser.Id);
  };

  _handleNavigationComponentWillMount = async () => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl(ChatConnectionUrl)
      .configureLogging(LogLevel.Debug)
      .build();

    hubConnection
      .start()
      .then(() => {
        this.setState({ hubConnection: hubConnection });
      })
      .catch(err => console.log("Error while establishing connection", err));
    const {
      messageUserList,
      generalServiceGetResponse,
      navigation
    } = this.props;
    const { activeUser } = generalServiceGetResponse;
    const blockId = navigation.getParam("blockId", 0);
    messageUserList(activeUser.Id, blockId).then(({ payload }) => {
      if (payload) {
        if (payload.data) {
          if (blockId != 0) {
            var item = payload.data.find(function(element) {
              return element.UserID == blockId;
            });
            this.handlerMessageList(item);
          }
        }
      }
    });
  };

  componentDidMount() {
    const {
      messageUserList,
      generalServiceGetResponse,
      navigation
    } = this.props;
    const { activeUser } = generalServiceGetResponse;

    this.state.hubConnection.on(
      "readingChatBlock",
      (readUserId, readingUserId, displayType) => {
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
      }
    );

    this.state.hubConnection.on(
      "refreshMessageBlock",
      (sendUserId, sendedUserId) => {
        if (sendedUserId == activeUser.Id) {
          messageUserList(
            activeUser.Id,
            this.props.navigation.getParam("blockId", 0)
          );
          if (sendUserId == this.state.selectedMessageUser.UserID) {
            this.props.userChatMessageOld(
              this.props.generalServiceGetResponse.activeUser.Id,
              this.state.selectedMessageUser.UserID
            );
            this.props.userChatReadMessage(
              this.props.generalServiceGetResponse.activeUser.Id,
              this.state.selectedMessageUser.UserID
            );
          }
        }
      }
    );
  }

  returnButtonPressEvent = () => {
    this.setState({ selectedMessageUser: {}, messageTabPage: 0 });
  };

  _handlerSetMessage = () => {
    const { selectedMessageUser, writingMessage } = this.state;
    const { generalServiceGetResponse } = this.props;
    const { activeUser } = generalServiceGetResponse;
    const { Id } = activeUser;
    const { UserID } = selectedMessageUser;
    if (this.state.writingMessage < 4) {
      Toast.show({
        text: i18n.t("text_185", { v: 4 }),
        buttonText: i18n.t("text_6"),
        duration: 2500
      });
      return;
    }
    if (this.state.IsSendMessageApproved) {
      this.setState({ IsSendMessageApproved: false });
      this.state.hubConnection
        .invoke("SendChatMessage", Id, UserID, writingMessage)
        .then(directResponse => {
          this.setState({ writingMessage: "" });
          this.props.userChatMessageOld(Id, UserID);
          this.props.userChatReadMessage(Id, UserID);
          this.setState({ IsSendMessageApproved: true });
        })
        .catch(() => {
          Toast.show({
            text: i18n.t("text_186"),
            buttonText: i18n.t("text_6"),
            duration: 2500
          });
        });
    }
  };

  handlerMessageList = item => {
    this.setState({ selectedMessageUser: item, messageTabPage: 1 });
    const {
      generalServiceGetResponse,
      userChatMessageOld,
      userChatReadMessage
    } = this.props;
    const { activeUser } = generalServiceGetResponse;
    userChatMessageOld(activeUser.Id, item.UserID);
    userChatReadMessage(activeUser.Id, item.UserID);
  };

  _handlerWritingText = item => {
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

  _handlerWriting = value => {
    this.setState({ writingMessage: value });
    if (isStartWriting == false) {
      let displayType = "block";
      let userID = this.state.selectedMessageUser.UserID;
      isStartWriting = true;
      if (value.length < 4) {
        displayType = "none";
      }
      setTimeout(() => {
        this.state.hubConnection
          .invoke(
            "ReadingChatHub",
            this.props.generalServiceGetResponse.activeUser.Id,
            userID,
            displayType
          )
          .then(directResponse => {})
          .catch(() => {
            console.warn(
              "Something went wrong when calling server, it might not be up and running?"
            );
          });
        isStartWriting = false;
      }, 1000);
    }
  };

  _handleScrollViewWithChatMessageList = scroll => {
    this.scrollViewWithChatMessageList = scroll;
  };

  _handlerUserChatMessage = () => {
    const { serviceServiceResponse, generalServiceGetResponse } = this.props;
    const {
      oldChatMessageLoading,
      oldChatMessageDataState,
      oldChatMessageDataResult
    } = serviceServiceResponse;
    const { activeUser } = generalServiceGetResponse;
    if (oldChatMessageDataState) {
      setTimeout(() => {
        this.scrollViewWithChatMessageList.scrollToEnd({ animated: true });
      }, 500);
      if (oldChatMessageDataResult.UserChats) {
        return oldChatMessageDataResult.UserChats.map((item, index) => {
          if (item.UserId == activeUser.Id)
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
      return <Spinner key={"message-spin"} />;
    } else {
      return <Text key={"message-error"}>{i18n.t("text_187")}</Text>;
    }
  };

  _handleGetWritingText = UserId => {
    const { writing } = this.state;
    if (writing) {
      for (let i = 0; i < writing.length; i++) {
        const element = writing[i];
        if (element.userID == UserId)
          if (element.IsWriting) {
            return (
              <Text note style={styles.writingText}>
                {i18n.t("text_188")}
              </Text>
            );
          } else return null;
      }
    }
    return null;
  };

  setInitialState = e => {
    this.setState(e);
  };

  render() {
    const { messageServiceGetResponse } = this.props;
    const { messageUserListResult } = messageServiceGetResponse;
    const {
      refreshingChatUserList,
      messageTabPage,
      chatTextBoxHeight,
      chatBoxFullHeight,
      headerHeight,
      selectedMessageUser,
      writingMessage
    } = this.state;

    if (this.state.isLoading) {
      return <Spinner color="blue" />;
    } else {
      return (
        <Root>
          <NavigationEvents
            onDidFocus={() => this._handleNavigationComponentWillMount()}
          />
          <Container>
            <Header
              onLayout={e =>
                this.setState({
                  headerHeight: e.nativeEvent.layout.height
                })
              }
              style={{ backgroundColor: ThemeColor }}
            >
              <Left>
                {messageTabPage == 1 ? (
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
                ) : (
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
                )}
              </Left>
              <Body>
                <Title style={{ color: "white" }}>
                  {messageTabPage == 1
                    ? selectedMessageUser.SenderName
                    : i18n.t("text_189")}
                </Title>
              </Body>
              <Right />
            </Header>
            <Content>
              <Tabs
                renderTabBar={() => <View />}
                page={messageTabPage}
                locked={true}
              >
                <Tab heading={"heading-user-list"}>
                  <UserList
                    messageUserListResult={messageUserListResult}
                    refreshingChatUserList={refreshingChatUserList}
                    _handleRefreshChatUserList={this._handleRefreshChatUserList}
                    handlerMessageList={this.handlerMessageList}
                    _handleGetWritingText={this._handleGetWritingText}
                  />
                </Tab>
                <Tab heading={"heading-message-text"}>
                  <MessageDetail
                    deviceHeight={deviceHeight}
                    headerHeight={headerHeight}
                    chatTextBoxHeight={chatTextBoxHeight}
                    _handlerUserChatMessage={this._handlerUserChatMessage}
                    _handlerWriting={this._handlerWriting}
                    writingMessage={writingMessage}
                    _handlerSetMessage={this._handlerSetMessage}
                    setInitialState={this.setInitialState}
                    _handleScrollViewWithChatMessageList={
                      this._handleScrollViewWithChatMessageList
                    }
                  />
                </Tab>
              </Tabs>
            </Content>
          </Container>
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
    margin: 5
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
