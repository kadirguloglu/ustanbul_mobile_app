import React from "react";
import { StyleSheet } from "react-native";
import { View, Item, Picker, Icon, Spinner, Input, Text } from "native-base";

import i18n from "../../../constants/strings";
import MyButton from "../../../components/MyButton";

const ComplaintService = props => {
  const {
    setComplaintOptionId,
    setDescription,
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
        <Text style={styles.questionText}>{i18n.t("text_135")}</Text>
        <Item>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="ios-arrow-down" />}
            placeholder={i18n.t("text_135")}
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            style={{ width: undefined }}
            selectedValue={ComplaintOptionId}
            onValueChange={value => setComplaintOptionId(value)}
          >
            <Picker.Item
              key={"dropdown-0"}
              label={i18n.t("text_136")}
              value={0}
            />
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
        <Text style={styles.questionText}>{i18n.t("text_137")}</Text>
        <Item>
          <Input
            onChangeText={value => setDescription(value)}
            value={Description}
          />
        </Item>
      </View>
      <View style={styles.topView}>
        <MyButton
          full={true}
          text={i18n.t("text_138")}
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
