import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View, Spinner, Text } from "native-base";

import i18n from "../../../constants/strings";
import MyButton from "../../../components/MyButton";

const ProposalDetail = props => {
  const {
    serviceProposalPreviewLoading,
    serviceProposalPreviewData,
    activeService,
    activeProposal,
    _handleSetInitialState,
    _handleServicePost,
    _handleSendMasterMessage
  } = props;
  const { ServiceCategoryQuestion } = serviceProposalPreviewData;
  if (!activeService) {
    return <Spinner />;
  }
  return (
    <View padder style={{ flex: 1 }}>
      <ScrollView>
        {serviceProposalPreviewLoading ? (
          <Spinner />
        ) : (
          <View>
            {ServiceCategoryQuestion.map((item, index) => {
              return (
                <View style={styles.questionBlock} key={"Answers" + index}>
                  <Text style={styles.questionText}>
                    Soru : {item.Question}
                  </Text>
                  <Text style={styles.answerText}>
                    {i18n.t("text_102")} : {item.Answer}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
        {activeService.IsDiscovery ? (
          <Text style={styles.proposalText}>{`${i18n.t("text_103")} : ${
            activeProposal.Price
          } ₺`}</Text>
        ) : null}
        {!activeService.IsDiscovery ? (
          <Text style={styles.proposalText}>{`${i18n.t("text_104")} : ${
            activeProposal.Price
          } ₺`}</Text>
        ) : null}
        {activeService ? (
          <React.Fragment>
            {activeService.IsDiscovery &&
            !activeProposal.IsDiscoveryApproved ? (
              <MyButton
                buttonStyle={styles.button}
                press={() =>
                  console.log(
                    "activeService.IsDiscovery && !activeProposal.IsDiscoveryApproved ?"
                  )
                }
                text={i18n.t("text_105")}
                full={true}
              />
            ) : null}
            {activeService.IsApproved ? (
              <MyButton
                buttonStyle={styles.button}
                press={() => console.log("activeService.IsApproved ?")}
                text={i18n.t("text_106")}
                full={true}
              />
            ) : null}
            <MyButton
              buttonStyle={styles.button}
              press={_handleSendMasterMessage}
              parameters={[activeService, activeProposal]}
              text={i18n.t("text_107")}
              full={true}
            />
            {!activeService.IsDiscovery &&
            activeService.IsGuarantor &&
            !activeProposal.IsApproved ? (
              <MyButton
                buttonStyle={styles.button}
                press={_handleServicePost}
                parameters={[activeService, activeProposal]}
                text={i18n.t("text_108")}
                full={true}
              />
            ) : null}
            {activeService.IsDiscovery &&
            activeProposal.IsDiscoveryApproved &&
            activeService.IsGuarantor &&
            !activeProposal.IsApproved ? (
              <MyButton
                buttonStyle={styles.button}
                press={() =>
                  console.log(
                    "activeService.IsDiscovery && activeProposal.IsDiscoveryApproved && activeService.IsGuarantor && !activeProposal.IsApproved"
                  )
                }
                text={i18n.t("text_108")}
                full={true}
              />
            ) : null}
          </React.Fragment>
        ) : null}
      </ScrollView>
      <View>
        <MyButton
          press={() => _handleSetInitialState("proposalListPage", 0)}
          text={i18n.t("text_109")}
          full={true}
        />
      </View>
    </View>
  );
};

export default ProposalDetail;

const styles = StyleSheet.create({
  questionBlock: {
    marginBottom: 15
  },
  questionText: {
    fontWeight: "bold"
  },
  proposalText: {
    fontFamily: "Raleway_Light",
    fontSize: 22,
    marginBottom: 10,
    marginTop: 10
  },
  button: {
    marginBottom: 10
  }
});
