import React from "react";
import { View, Text, Thumbnail } from "native-base";

import i18n from "../../../constants/strings";
import { MidPath } from "../../../src/functions";

export default Information = props => {
  const { item, styles } = props;
  return (
    <View style={styles.view2}>
      <View>
        <Thumbnail
          large
          source={MidPath(
            item.Pictures.length ? item.Pictures[0].PicturePath : []
          )}
        />
      </View>
      <View style={styles.view4}>
        <Text numberOfLines={1}>{item.Title}</Text>
        <Text>
          {i18n.t("text_180")} : {item.MaxProposalPrice}
        </Text>
        <Text>
          {i18n.t("text_181")} : {item.MinProposalPrice}
        </Text>
        <Text numberOfLines={1}>{item.Note}</Text>
      </View>
    </View>
  );
};
