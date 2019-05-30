import React from "react";
import { StyleSheet } from "react-native";
import { View, Item, Picker, Icon, Spinner, Input, Text } from "native-base";

import MyButton from "../../../components/MyButton";

const ComplaintService = props => {
  const {
    _handleSetInitialState,
    getComplaintOptionListLoading,
    getComplaintOptionListResult,
    ComplaintOptionId,
    Description,
    _handlePostServiceComplaint
  } = props;
  if (getComplaintOptionListLoading) {
    return <Spinner />;
  }

  return (
    <View padder>
      <View style={styles.topView}>
        <Text style={styles.questionText}>Şikayet Konusu</Text>
        <Item>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="ios-arrow-down" />}
            placeholder={"Şikayet Konusu"}
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            style={{ width: undefined }}
            selectedValue={ComplaintOptionId}
            onValueChange={value =>
              _handleSetInitialState("ComplaintOptionId", value)
            }
          >
            <Picker.Item key={"dropdown-0"} label={"Seçiniz"} value={0} />
            {getComplaintOptionListResult.map(item => {
              return (
                <Picker.Item
                  key={"dropdown" + item.ComplaintOptionId}
                  label={item.Title}
                  value={item.ComplaintOptionId}
                />
              );
            })}
          </Picker>
        </Item>
      </View>
      <View style={styles.topView}>
        <Text style={styles.questionText}>Şikayetiniz</Text>
        <Item>
          <Input
            onChangeText={value => _handleSetInitialState("Description", value)}
            value={Description}
          />
        </Item>
      </View>
      <View style={styles.topView}>
        <MyButton
          full={true}
          text="Şikayet Mesajını Gönder"
          press={_handlePostServiceComplaint}
        />
      </View>
    </View>
  );
};

export default ComplaintService;

const styles = StyleSheet.create({
  topView: {
    marginBottom: 10
  },
  questionText: {
    marginBottom: 5
  }
});
