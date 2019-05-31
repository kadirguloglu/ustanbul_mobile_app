import React from "react";
import { View } from "native-base";
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
        text="Hizmeti onayla"
        textStyle={styles.iconText}
      />
      <MyButton
        full
        buttonStyle={styles.buttonStyle}
        press={_handlerPreviewSelectedService}
        parameters={[data]}
        textStyle={styles.iconText}
        text="İncele"
      />
      <MyButton
        full
        buttonStyle={styles.buttonStyle}
        press={_handleComplaintService}
        parameters={[data]}
        text="Şikayet et"
        textStyle={styles.iconText}
      />
    </View>
  );
};

export default CustomerServiceKey3;
