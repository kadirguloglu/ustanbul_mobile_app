import React from "react";
import { View, Text, Thumbnail } from "native-base";
import { StyleSheet, ScrollView } from "react-native";

import i18n from "../../../constants/strings";
import { MidPath } from "../../../src/functions";
import MyButton from "../../../components/MyButton";

const ServiceDetail = props => {
  const {
    service,
    _handleSendProposal,
    masterServiceProposalQuestionPageLoading,
    headerHeight,
    _handleSetInitialState
  } = props;

  return (
    <View style={[styles.view1]}>
      <ScrollView>
        <View style={styles.view4}>
          <Text style={styles.strongTitle}>{i18n.t("text_174")}</Text>
          <Text>
            {i18n.t("text_175")} : {service.AddressDescription}
          </Text>
        </View>
        <View style={styles.view4}>
          <Text style={styles.strongTitle}>{i18n.t("text_29")}</Text>
          <Text>{service.Title}</Text>
        </View>
        <View style={styles.view4}>
          <Text style={styles.strongTitle}>{i18n.t("text_30")}</Text>
          <Text>{service.Note}</Text>
        </View>
        <View style={styles.view4}>
          <Text style={styles.strongTitle}>{i18n.t("text_118")}</Text>
          <Text>
            {service.IsGuarantor ? i18n.t("text_69") : i18n.t("text_68")}
          </Text>
        </View>
        <View style={styles.view4}>
          <Text style={styles.strongTitle}>{i18n.t("text_121")}</Text>
          <Text>
            {service.IsDiscovery ? i18n.t("text_69") : i18n.t("text_68")}
          </Text>
        </View>
        {service.Questions.length ? (
          <View>
            <Text style={styles.strongTitle}>{i18n.t("text_176")}</Text>
          </View>
        ) : null}
        {service.Questions.map((item, index) => (
          <View key={"Question-" + index} style={styles.view4}>
            <Text style={styles.strongTitle}>{item.Question}</Text>
            <Text>{item.Answer}</Text>
          </View>
        ))}
        {service.Pictures.length > 0 ? (
          <View>
            <Text style={styles.strongTitle}>{i18n.t("text_177")}</Text>
          </View>
        ) : null}
        <View style={[styles.view2, styles.view4]}>
          {service.Pictures.map((item, index) => (
            <View key={"Picture-" + index} style={styles.view3}>
              <Thumbnail square large source={MidPath(item.PicturePath)} />
            </View>
          ))}
        </View>
      </ScrollView>
      {/* <View>
        <MyButton
          full={true}
          press={() => _handleSendProposal()}
          text={i18n.t("text_173")}
          spinner={masterServiceProposalQuestionPageLoading}
        />
      </View> */}
    </View>
  );
};

export default ServiceDetail;

const styles = StyleSheet.create({
  view1: {
    padding: 5,
    flex: 1
  },
  view2: {
    flexDirection: "row"
  },
  view3: {
    padding: 3
  },
  view4: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#dedede"
  },
  strongTitle: {
    fontWeight: "bold"
  }
});
