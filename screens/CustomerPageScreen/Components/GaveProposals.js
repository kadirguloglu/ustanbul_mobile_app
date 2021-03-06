import React from "react";
import { StyleSheet } from "react-native";
import { View, Spinner } from "native-base";

import Information from "./GaveProposals_information";
import Buttons from "./GaveProposals_buttons";

const GaveProposals = props => {
  const {
    serviceCustomerPageData,
    serviceProposalPreviewLoading,
    serviceProposalPreview
  } = props;
  if (!serviceCustomerPageData) {
    return <Spinner />;
  }
  return serviceCustomerPageData.GaveProposalMasters.map((item, index) => {
    return (
      <View style={styles.view1} key={"GaveProposalMaster-" + index}>
        <Information styles={styles} item={item} />
        <Buttons
          item={item}
          styles={styles}
          serviceProposalPreviewLoading={serviceProposalPreviewLoading}
          serviceProposalPreview={serviceProposalPreview}
        />
      </View>
    );
  });
};

export default GaveProposals;

const styles = StyleSheet.create({
  view1: {
    flexDirection: "column",
    padding: 5,
    borderBottomWidth: 1,
    borderColor: "#dedede"
  },
  view2: {
    flexDirection: "row"
  },
  view3: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  button1: {
    marginRight: 5
  },
  button2: {
    marginLeft: 5
  }
});
