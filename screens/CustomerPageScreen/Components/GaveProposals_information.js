import React from "react";
import { View, Text, Thumbnail } from "native-base";
import i18n from "../../../constants/strings";

import { MidPath } from "../../../src/functions";

export default Information = props => {
  const { item, styles } = props;
  return (
    <View style={styles.view2}>
      <View>
        <Thumbnail large source={MidPath(item.PicturePath)} />
      </View>
      <View>
        <Text>{item.CompanyName}</Text>
        <Text>
          {i18n.t("text_110")} : {item.Price}
        </Text>
        <Text>
          {i18n.t("text_111")} : {item.AuthorizedPersonName}
        </Text>
      </View>
    </View>
  );
};
