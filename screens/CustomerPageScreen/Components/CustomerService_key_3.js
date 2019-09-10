import React from "react";
import { View } from "native-base";

import i18n from "../../../constants/strings";
import MyButton from "../../../components/MyButton";

const CustomerServiceKey3 = props => {
  const {
    styles,
    data,
    _handleApprovedService,
    _handlerPreviewSelectedService,
    _handleComplaintService
  } = props;
  return (
    <View>
      <MyButton
        full
        buttonStyle={styles.buttonStyle}
        press={_handleApprovedService}
        parameters={[data]}
        text={i18n.t("text_131")}
        textStyle={styles.iconText}
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
        press={_handleComplaintService}
        parameters={[data]}
        text={i18n.t("text_82")}
        textStyle={styles.iconText}
      />
    </View>
  );
};

export default CustomerServiceKey3;
