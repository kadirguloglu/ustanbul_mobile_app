import React from "react";
import { View, Text, Thumbnail } from "native-base";

import { MidPath } from "../../../src/functions";

export default (Information = props => {
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
      <View>
        <Text>{item.Title}</Text>
        <Text>En yüksek : {item.MaxProposalPrice}</Text>
        <Text>En düşük : {item.MinProposalPrice}</Text>
        <Text>{item.Note}</Text>
      </View>
    </View>
  );
});
