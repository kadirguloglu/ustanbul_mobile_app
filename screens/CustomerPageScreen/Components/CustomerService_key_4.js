import React from "react";
import { View } from "native-base";

import i18n from "../../../constants/strings";
import MyButton from "../../../components/MyButton";

const CustomerServiceKey4 = props => {
  const {
    styles,
    data,
    _handleSetPoint,
    _handlerPreviewSelectedService
  } = props;
  return (
    <View>
      <MyButton
        full
        buttonStyle={styles.buttonStyle}
        press={_handleSetPoint}
        parameters={[data]}
        text={i18n.t("text_81")}
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
    </View>
  );
};

export default CustomerServiceKey4;
