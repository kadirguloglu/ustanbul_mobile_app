import React from "react";
import { View } from "native-base";

import i18n from "../../../constants/strings";
import MyButton from "../../../components/MyButton";

const CustomerServiceKey1 = props => {
  const {
    styles,
    navigation,
    data,
    _handlerPreviewSelectedService,
    _handleCancelService
  } = props;
  return (
    <View>
      <MyButton
        full
        buttonStyle={styles.buttonStyle}
        press={navigation.navigate}
        parameters={[
          "SeeProposal",
          {
            data: data
          }
        ]}
        textStyle={styles.iconText}
        text={i18n.t("text_133")}
      />
      <MyButton
        full
        buttonStyle={styles.buttonStyle}
        press={_handlerPreviewSelectedService}
        parameters={[data]}
        textStyle={styles.iconText}
        text={i18n.t("text_129")}
      />
      <MyButton
        full
        buttonStyle={styles.buttonStyle}
        press={_handleCancelService}
        parameters={[data]}
        textStyle={styles.iconText}
        text={i18n.t("text_130")}
      />
    </View>
  );
};

export default CustomerServiceKey1;
