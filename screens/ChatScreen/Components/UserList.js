import React from "react";
import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Text,
  Thumbnail
} from "native-base";
import moment from "moment";
import { RefreshControl } from "react-native";
import { SmallPath } from "../../../src/functions";

function UserList(props) {
  const {
    refreshingChatUserList,
    _handleRefreshChatUserList,
    handlerMessageList,
    _handleGetWritingText,
    messageUserListResult
  } = props;
  return (
    <List
      refreshControl={
        <RefreshControl
          refreshing={refreshingChatUserList}
          onRefresh={() => _handleRefreshChatUserList()}
        />
      }
    >
      {messageUserListResult
        ? messageUserListResult.map((item, index) => {
            return (
              <ListItem
                onPress={() => handlerMessageList(item)}
                key={"UserList" + index}
                avatar
              >
                <Left>
                  <Thumbnail source={SmallPath(item.PicturePath)} />
                </Left>
                <Body>
                  <Text>{item.SenderName}</Text>
                  <Text note>{item.Message}</Text>
                </Body>
                <Right>
                  <Text note>
                    {moment(item.CreateDate).format("DD-MM-YYYY") ===
                    moment().format("DD-MM-YYYY")
                      ? moment(item.CreateDate).format("hh:mm")
                      : moment(item.CreateDate).format("DD.MM.YYYY hh:mm")}
                  </Text>
                  {_handleGetWritingText(item.UserID)}
                </Right>
              </ListItem>
            );
          })
        : null}
    </List>
  );
}

export default UserList;
