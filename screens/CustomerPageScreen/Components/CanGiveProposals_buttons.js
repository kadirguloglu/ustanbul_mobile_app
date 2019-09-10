import React from "react";
import { Button, Text, View } from "native-base";

import i18n from "../../../constants/strings";

export default Buttons = props => {
  const { styles, item } = props;
  return (
    <View style={styles.view3}>
      <Button style={styles.button1}>
        <Text>{i18n.t("text_140")}</Text>
      </Button>
    </View>
  );
};
