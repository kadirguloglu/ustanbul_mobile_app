import React from "react";
import { View } from "native-base";

import i18n from "../../../constants/strings";
import MyButton from "../../../components/MyButton";

export default Buttons = props => {
  const { styles, item, _handleServiceDetail } = props;
  return (
    <View style={styles.view3}>
      <MyButton
        text={i18n.t("text_182", { v: item.MyProposalPrice })}
        //buttonStyle={styles.button1}
        press={_handleServiceDetail}
        parameters={[item, item]}
        full={true}
      />
    </View>
  );
};
