import React from "react";
import { View } from "native-base";
import MyButton from "../../../components/MyButton";

const CustomerServiceKey6 = props => {
  const {
    styles,
    data,
    navigation,
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
        text="Teklifleri gör"
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
        press={_handleCancelService}
        parameters={[data]}
        textStyle={styles.iconText}
        text="İptal et"
      />
    </View>
  );
};

export default CustomerServiceKey6;
