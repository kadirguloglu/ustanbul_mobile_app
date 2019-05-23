import React from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";

import Information from "./SeeServiceScreen_information";
import Buttons from "./SeeServiceScreen_buttons";

const SeeServiceContent = props => {
  const { serviceCompanyPageData } = props;
  return serviceCompanyPageData.map((item, index) => {
    return (
      <View style={styles.view1} key={"ServiceCompanyPage-" + index}>
        <Information styles={styles} item={item} />
        <Buttons item={item} styles={styles} />
      </View>
    );
  });
};

export default SeeServiceContent;

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
