import React from "react";
import { View } from "native-base";
import MyButton from "../../../components/MyButton";

const CustomerServiceKey2 = props => {
  const {
    styles,
    data,
    _handleGetQrCodeForMasterApproved,
    _handlerPreviewSelectedService,
    _handleCancelService
  } = props;
  return (
    <View>
      <MyButton
        full
        buttonStyle={styles.buttonStyle}
        press={_handleGetQrCodeForMasterApproved}
        parameters={[data]}
        text="Usta onayı için QR oluştur"
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

export default CustomerServiceKey2;
