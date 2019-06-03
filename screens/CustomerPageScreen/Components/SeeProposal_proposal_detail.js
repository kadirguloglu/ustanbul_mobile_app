import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View, Spinner, Text } from "native-base";

import MyButton from "../../../components/MyButton";

const ProposalDetail = props => {
  const {
    serviceProposalPreviewLoading,
    serviceProposalPreviewData,
    activeService,
    activeProposal,
    _handleSetInitialState,
    _handleServicePost
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
                  <Text style={styles.answerText}>Cevap : {item.Answer}</Text>
                </View>
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
                buttonStyle={styles.button}
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
                buttonStyle={styles.button}
                press={() => console.log("activeService.IsApproved ?")}
                text={`Teklif daha önce onaylanmış`}
                full={true}
              />
            ) : null}
            <MyButton
              buttonStyle={styles.button}
              press={() => console.log("ustaya mesaj gönder")}
              text={`Ustaya mesaj gönder`}
              full={true}
            />
            {!activeService.IsDiscovery &&
            activeService.IsGuarantor &&
            !activeProposal.IsApproved ? (
              <MyButton
                buttonStyle={styles.button}
                press={_handleServicePost}
                parameters={[activeService, activeProposal]}
                text={`Teklifi onayla ve ödemeyi yap`}
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
