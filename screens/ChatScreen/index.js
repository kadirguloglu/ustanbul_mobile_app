import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { NavigationEvents } from "react-navigation";
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

import i18n from "../../constants/strings";
import { messageUserList } from "../../src/actions/messageServiceGet";
import { userChatReadMessage } from "../../src/actions/messageServicePost";
import { userChatMessageOld } from "../../src/actions/serviceService";
import { ChatConnectionUrl, ThemeColor } from "../../src/functions";
import UserList from "./Components/UserList";
import MessageDetail from "./Components/MessageDetail";

let deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

let isStartWriting = false;

function ChatScreen({ navigation }) {
  this.scrollViewWithChatMessageList = React.createRef();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMessageUser, setSelectedMessageUser] = useState({});
  const [writingMessage, setWritingMessage] = useState("");
  const [writing, setWriting] = useState([]);
  const [IsSendMessageApproved, setIsSendMessageApproved] = useState(false);
  const [refreshingChatUserList, setRefreshingChatUserList] = useState(false);
  const [messageTabPage, setMessageTabPage] = useState(0);
  const [chatTextBoxHeight, setChatTextBoxHeight] = useState(30);
  const [chatBoxFullHeight, setChatBoxFullHeight] = useState(697);
  const [headerHeight, setHeaderHeight] = useState(33);
  const [hubConnection, setHubConnection] = useState(null);
  const dispatch = useDispatch();

  const { activeUser } = useSelector(state => state.generalServiceGetResponse);
  const {
    oldChatMessageLoading,
    oldChatMessageDataState,
    oldChatMessageDataResult
  } = useSelector(state => state.serviceServiceResponse);
  const { messageUserListResult } = useSelector(
    state => state.messageServiceGetResponse
  );

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on(
        "readingChatBlock",
        (readUserId, readingUserId, displayType) => {
          if (readingUserId != activeUser.Id) return;
          var writingArray = writing;
          if (writing) {
            for (i = 0; i < writing.length; i++) {
              if (writing[i].userID == readUserId) {
                if (displayType == "none") writingArray[i].IsWriting = false;
                else writingArray[i].IsWriting = true;
                setWriting(writingArray);
                return;
              }
            }
          }
          writingArray.push({
            userID: readUserId,
            IsWriting: true
          });
          setWriting(writingArray);
        }
      );
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("refreshMessageBlock", (sendUserId, sendedUserId) => {
        if (sendedUserId == activeUser.Id) {
          messageUserList(activeUser.Id, navigation.getParam("blockId", 0));
          if (sendUserId == selectedMessageUser.UserID) {
            dispatch(
              userChatMessageOld(activeUser.Id, selectedMessageUser.UserID)
            );
            userChatReadMessage(activeUser.Id, selectedMessageUser.UserID);
          }
        }
      });
    }
  }, [hubConnection]);

  _handleRefreshChatUserList = () => {
    dispatch(messageUserList(activeUser.Id));
  };

  _handleNavigationComponentWillMount = async () => {
    try {
      const hubConnection = new HubConnectionBuilder()
        .withUrl(ChatConnectionUrl)
        .configureLogging(LogLevel.Debug)
        .build();

      hubConnection
        .start()
        .then(() => {
          setHubConnection(hubConnection);
        })
        .catch(err => {
          console.log("hubConnectionError =", err);
        })
        .onclose(e => {
          console.log("hubConnection onclose =", e);
        });
    } catch (error) {}
    const blockId = navigation.getParam("blockId", 0);
    dispatch(messageUserList(activeUser.Id, blockId)).then(({ payload }) => {
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

  returnButtonPressEvent = () => {
    setSelectedMessageUser({});
    setMessageTabPage(0);
  };

  _handlerSetMessage = () => {
    const { Id } = activeUser;
    const { UserID } = selectedMessageUser;
    if (writingMessage < 4) {
      Toast.show({
        text: i18n.t("text_185", { v: 4 }),
        buttonText: i18n.t("text_6"),
        duration: 2500
      });
      return;
    }
    if (IsSendMessageApproved) {
      setIsSendMessageApproved(false);
      if (hubConnection) {
        hubConnection
          .invoke("SendChatMessage", Id, UserID, writingMessage)
          .then(directResponse => {
            setWritingMessage("");
            userChatMessageOld(Id, UserID);
            dispatch(userChatReadMessage(Id, UserID));
            setIsSendMessageApproved(true);
          })
          .catch(() => {
            Toast.show({
              text: i18n.t("text_186"),
              buttonText: i18n.t("text_6"),
              duration: 2500
            });
          });
      }
    }
  };

  handlerMessageList = item => {
    setSelectedMessageUser(item);
    setMessageTabPage(1);
    dispatch(userChatMessageOld(activeUser.Id, item.UserID));
    dispatch(userChatReadMessage(activeUser.Id, item.UserID));
  };

  _handlerWritingText = item => {
    if (writing) {
      for (i = 0; i < writing.length; i++) {
        if (writing[i].userID == item.UserID) {
          if (writing[i].IsWriting)
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
    setWritingMessage(value);
    if (isStartWriting == false) {
      let displayType = "block";
      let userID = selectedMessageUser.UserID;
      isStartWriting = true;
      if (value.length < 4) {
        displayType = "none";
      }
      setTimeout(() => {
        if (hubConnection) {
          hubConnection
            .invoke("ReadingChatHub", activeUser.Id, userID, displayType)
            .then(directResponse => {})
            .catch(() => {
              console.warn(
                "Something went wrong when calling server, it might not be up and running?"
              );
            });
        }
        isStartWriting = false;
      }, 1000);
    }
  };

  _handleScrollViewWithChatMessageList = scroll => {
    this.scrollViewWithChatMessageList = scroll;
  };

  _handlerUserChatMessage = () => {
    if (oldChatMessageDataState) {
      setTimeout(() => {
        if (this.scrollViewWithChatMessageList) {
          if (this.scrollViewWithChatMessageList.scrollToEnd) {
            this.scrollViewWithChatMessageList.scrollToEnd({ animated: true });
          }
        }
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

  return (
    <Root>
      <NavigationEvents
        onDidFocus={() => this._handleNavigationComponentWillMount()}
      />
      <Container>
        <Header
          onLayout={e => setHeaderHeight(e.nativeEvent.layout.height)}
          style={{ backgroundColor: ThemeColor }}
        >
          <Left>
            {messageTabPage == 1 ? (
              <Button transparent onPress={() => this.returnButtonPressEvent()}>
                <Icon
                  name="ios-arrow-back"
                  color="white"
                  style={{ color: "white" }}
                />
              </Button>
            ) : (
              <Button transparent onPress={() => navigation.toggleDrawer()}>
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
          {isLoading ? (
            <Spinner></Spinner>
          ) : (
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
                  setChatTextBoxHeight={setChatTextBoxHeight}
                  _handleScrollViewWithChatMessageList={
                    this._handleScrollViewWithChatMessageList
                  }
                />
              </Tab>
            </Tabs>
          )}
        </Content>
      </Container>
    </Root>
  );
}

export default ChatScreen;

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
