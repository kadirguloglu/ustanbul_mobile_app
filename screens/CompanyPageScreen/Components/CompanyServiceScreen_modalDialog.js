import React from "react";
import { ScrollView } from "react-native";
import Modal from "react-native-modal";
import { View, Spinner, Text } from "native-base";

import i18n from "../../../constants/strings";
import MyButton from "../../../components/MyButton";

export default ModalDialog = props => {
  const {
    modalIsVisible,
    styles,
    servicePreviewDetailLoading,
    servicePreviewDetailResult,
    servicePreviewDetailQuestionLoading,
    servicePreviewDetailQuestionResult,
    setInitialState
  } = props;
  return (
    <Modal isVisible={modalIsVisible}>
      <ScrollView>
        <View style={styles.view4}>
          {servicePreviewDetailLoading ? (
            <Spinner />
          ) : servicePreviewDetailResult ? (
            <View>
              <Text style={styles.ServicePreviewItemText}>
                {i18n.t("text_117")}
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.AddressDescription}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                {i18n.t("text_130")}
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.Note}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                {i18n.t("text_118")}
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsGuarantor
                  ? i18n.t("text_69")
                  : i18n.t("text_68")}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                {i18n.t("text_119")}
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsApproved
                  ? i18n.t("text_69")
                  : i18n.t("text_68")}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                {i18n.t("text_120")}
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsMasterApproved
                  ? i18n.t("text_69")
                  : i18n.t("text_68")}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                {i18n.t("text_121")}
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsDiscovery
                  ? i18n.t("text_69")
                  : i18n.t("text_68")}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                {i18n.t("text_122")}
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsPayment
                  ? i18n.t("text_69")
                  : i18n.t("text_68")}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                {i18n.t("text_123")}
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsActive
                  ? i18n.t("text_69")
                  : i18n.t("text_68")}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                {i18n.t("text_124")}
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.CountryName
                  ? servicePreviewDetailResult.CountryName.trim()
                  : ""}{" "}
                /{" "}
                {servicePreviewDetailResult.CountyName
                  ? servicePreviewDetailResult.CountyName.trim()
                  : ""}{" "}
                /{" "}
                {servicePreviewDetailResult.DiscrictName
                  ? servicePreviewDetailResult.DiscrictName.trim()
                  : ""}{" "}
                /{" "}
                {servicePreviewDetailResult.NeigborhoodName
                  ? servicePreviewDetailResult.NeigborhoodName.trim()
                  : ""}
              </Text>
              <Text style={styles.ServicePreviewItemText}>Hizmet kodu</Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.ID}
                {servicePreviewDetailResult.CodeText}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                {i18n.t("text_184")}
              </Text>
              {servicePreviewDetailQuestionLoading ? (
                <Spinner />
              ) : (
                servicePreviewDetailQuestionResult.map((item, index) => {
                  return (
                    <Text
                      key={"Answers" + index}
                      style={[
                        styles.QuestionAndAnswer,
                        styles.ServicePreviewItemTextAnswer
                      ]}
                    >
                      {item.Question} : {item.Answer}
                    </Text>
                  );
                })
              )}
            </View>
          ) : (
            <Spinner />
          )}
          <MyButton
            press={() => setInitialState("modalIsVisible", false)}
            text={i18n.t("text_125")}
            full={true}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};
