import React from "react";
import { Linking } from "react-native";
import { View } from "native-base";

import i18n from "../../../constants/strings";
import { siteUrl } from "../../../src/functions";
import MyButton from "../../../components/MyButton";

export default Buttons = props => {
  const {
    styles,
    item,
    serviceProposalPreview,
    serviceProposalPreviewLoading
  } = props;

  handleClick = () => {
    const link = `${siteUrl}/CompanyDetail/CompanyPreview/${item.ServiceProposalID}/${item.CustomerServiceID}`;
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    });
  };

  return (
    <View style={styles.view3}>
      <MyButton
        spinner={serviceProposalPreviewLoading}
        buttonStyle={styles.button1}
        text={i18n.t("text_112")}
        press={handleClick}
      />
      <MyButton
        spinner={serviceProposalPreviewLoading}
        buttonStyle={styles.button2}
        text={i18n.t("text_113")}
        press={serviceProposalPreview}
        parameters={[item]}
      />
    </View>
  );
};
