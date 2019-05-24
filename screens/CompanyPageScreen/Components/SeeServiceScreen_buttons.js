import React from "react";
import { View } from "native-base";
import MyButton from "../../../components/MyButton";

export default (Buttons = props => {
  const { styles, item, _handleServiceDetail } = props;
  return (
    <View style={styles.view3}>
      <MyButton
        text={`${item.MyProposalPrice} TL teklif verildi Detayları incele`}
        //buttonStyle={styles.button1}
        press={_handleServiceDetail}
        parameters={[item, item]}
        full={true}
      />
    </View>
  );
});
