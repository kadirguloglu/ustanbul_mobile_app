import React from "react";
import { View } from "native-base";
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
        text="Puan ver"
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
    </View>
  );
};

export default CustomerServiceKey4;
