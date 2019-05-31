import React from "react";
import { View } from "native-base";

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
        text="Teklifleri gör"
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
        press={_handleCancelService}
        parameters={[data]}
        textStyle={styles.iconText}
        text="İptal et"
      />
    </View>
  );
};

export default CustomerServiceKey1;
