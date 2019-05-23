import React from "react";
import { Button, Text, View } from "native-base";

export default (Buttons = props => {
  const { styles, item } = props;
  return (
    <View style={styles.view3}>
      <Button style={styles.button1}>
        <Text>Profili gör</Text>
      </Button>
      <Button style={styles.button2}>
        <Text>Teklifi incele</Text>
      </Button>
    </View>
  );
});
