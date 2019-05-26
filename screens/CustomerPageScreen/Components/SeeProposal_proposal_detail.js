import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View, Spinner, Text } from "native-base";

import { ThemeColor } from "../../../src/functions";
import MyButton from "../../../components/MyButton";

const ProposalDetail = props => {
  const {
    serviceProposalPreviewLoading,
    serviceProposalPreviewData,
    activeService,
    activeProposal,
    _handleSetInitialState
  } = props;
  const { ServiceCategoryQuestion } = serviceProposalPreviewData;
  return (
    <View padder style={{ flex: 1 }}>
      <ScrollView>
        {serviceProposalPreviewLoading ? (
          <Spinner />
        ) : (
          <View>
            {ServiceCategoryQuestion.map((item, index) => {
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
            })}
          </View>
        )}
        {activeService.IsDiscovery ? (
          <Text style={styles.proposalText}>{`Net teklif : ${
            activeProposal.Price
          } ₺`}</Text>
        ) : null}
        {!activeService.IsDiscovery ? (
          <Text style={styles.proposalText}>{`Ortalama teklif : ${
            activeProposal.Price
          } ₺`}</Text>
        ) : null}
        {activeService ? (
          <React.Fragment>
            {activeService.IsDiscovery &&
            !activeProposal.IsDiscoveryApproved ? (
              <MyButton
                press={() =>
                  console.log(
                    "activeService.IsDiscovery && !activeProposal.IsDiscoveryApproved ?"
                  )
                }
                text={`Keşif için onayla`}
                full={true}
              />
            ) : null}
            {activeService.IsApproved ? (
              <MyButton
                press={() => console.log("activeService.IsApproved ?")}
                text={`Teklif daha önce onaylanmış`}
                full={true}
              />
            ) : null}
            <MyButton
              press={() => console.log("ustaya mesaj gönder")}
              text={`Ustaya mesaj gönder`}
              full={true}
            />
            {!activeService.IsDiscovery &&
            activeService.IsGuarantor &&
            !activeProposal.IsApproved ? (
              <MyButton
                press={() =>
                  console.log(
                    "!activeService.IsDiscovery && activeService.IsGuarantor && !activeProposal.IsApproved"
                  )
                }
                text={`Teklifi onayla ve ödemeyi yap`}
                full={true}
              />
            ) : null}
            {activeService.IsDiscovery &&
            activeProposal.IsDiscoveryApproved &&
            activeService.IsGuarantor &&
            !activeProposal.IsApproved ? (
              <MyButton
                press={() =>
                  console.log(
                    "activeService.IsDiscovery && activeProposal.IsDiscoveryApproved && activeService.IsGuarantor && !activeProposal.IsApproved"
                  )
                }
                text={`Teklifi onayla ve ödemeyi yap`}
                full={true}
              />
            ) : null}
          </React.Fragment>
        ) : null}
      </ScrollView>
      <View>
        <MyButton
          press={() => _handleSetInitialState("proposalListPage", 0)}
          text="Geri dön"
          full={true}
        />
      </View>
    </View>
  );
};

export default ProposalDetail;

const styles = StyleSheet.create({
  ServicePreviewItemText: {
    textAlign: "center",
    fontSize: 15
  },
  ServicePreviewItemTextAnswer: {
    marginBottom: 4,
    borderBottomColor: ThemeColor,
    borderBottomWidth: 1
  },
  proposalText: {
    fontFamily: "Raleway_Light",
    fontSize: 22
  }
});
