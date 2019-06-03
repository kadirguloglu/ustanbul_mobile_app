import React from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";

import Information from "./CanGiveProposals_information";
import Buttons from "./CanGiveProposals_buttons";

const CanGiveProposals = props => {
  const { serviceCustomerPageData } = props;
  if (!serviceCustomerPageData) {
    return <Spinner />;
  }
  return serviceCustomerPageData.CanGiveProposalMasters.map((item, index) => {
    return (
      <View style={styles.view1} key={"CanGiveProposals-" + index}>
        <Information styles={styles} item={item} />
        <Buttons item={item} styles={styles} />
      </View>
    );
  });
};

export default CanGiveProposals;

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
