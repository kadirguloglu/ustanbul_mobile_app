import React from "react";
import { Button, Text, View } from "native-base";

export default (Buttons = props => {
  const { styles, item } = props;
  return (
    <View style={styles.view3}>
      <Button style={styles.button1}>
        <Text>Teklif talep et</Text>
      </Button>
    </View>
  );
});
