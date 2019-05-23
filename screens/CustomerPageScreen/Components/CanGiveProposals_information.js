import React from "react";
import { View, Text, Thumbnail } from "native-base";

import { MidPath } from "../../../src/functions";

export default (Information = props => {
  const { item, styles } = props;
  return (
    <View style={styles.view2}>
      <View>
        <Thumbnail large source={MidPath(item.PicturePath)} />
      </View>
      <View>
        <Text>{item.CompanyName}</Text>
        <Text>Oran : {item.AvarageRate}</Text>
        <Text>Yetkili : {item.AuthorizedPersonName}</Text>
      </View>
    </View>
  );
});
