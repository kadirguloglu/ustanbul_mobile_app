import React from "react";
import { View } from "native-base";

import i18n from "../../../constants/strings";
import MyButton from "../../../components/MyButton";

const CustomerServiceKey5 = props => {
  const { styles, data, _handlerPreviewSelectedService } = props;
  return (
    <View>
      <MyButton
        full
        buttonStyle={styles.buttonStyle}
        press={_handlerPreviewSelectedService}
        parameters={[data]}
        text={i18n.t("text_129")}
        textStyle={styles.iconText}
      />
    </View>
  );
};

export default CustomerServiceKey5;
