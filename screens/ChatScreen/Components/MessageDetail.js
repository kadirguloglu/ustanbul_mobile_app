import React from "react";
import { ScrollView, TouchableHighlight, TextInput } from "react-native";
import { View, Icon } from "native-base";

const MessageDetail = props => {
  const {
    deviceHeight,
    headerHeight,
    chatTextBoxHeight,
    _handlerUserChatMessage,
    _handlerWriting,
    writingMessage,
    _handlerSetMessage,
    setChatTextBoxHeight,
    _handleScrollViewWithChatMessageList
  } = props;
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: deviceHeight - headerHeight - chatTextBoxHeight - 5
        }}
      >
        <ScrollView
          scrollEnabled={true}
          ref={scroll => {
            _handleScrollViewWithChatMessageList(scroll);
          }}
        >
          {_handlerUserChatMessage()}
        </ScrollView>
      </View>
      <View
        onLayout={e => setChatTextBoxHeight(e.nativeEvent.layout.height)}
        style={{
          height: chatTextBoxHeight,
          paddingLeft: 20,
          paddingRight: 20,
          marginBottom: 5,
          borderTopWidth: 1,
          borderTopColor: "#dedede"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <TextInput
            placeholder="Mesajınız"
            onChangeText={value => _handlerWriting(value)}
            value={writingMessage}
          />
          <TouchableHighlight
            onPress={() => _handlerSetMessage()}
            underlayColor="green"
          >
            <Icon
              name="ios-send"
              color="#59aae1"
              style={{
                color: "#59aae1",
                textAlign: "center"
              }}
            />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default MessageDetail;
