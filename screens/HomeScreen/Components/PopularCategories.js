import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { Spinner, Container, Content } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";

import { SmallPath } from "../../../src/functions";
import styles, { sliderWidth, itemWidth } from "../styles";

const PopularCategories = props => {
  const { popularCategoriesResult, handlePressCategory } = props;
  return (
    <View>
      <Text style={styles.title_text}>
        POPÜLER KATEGORİLER{"   "}
        <FontAwesome
          style={styles.fontawesome1}
          name="arrow-circle-right"
          size={12}
        />
      </Text>
      {popularCategoriesResult && popularCategoriesResult.length > 1 ? (
        <Carousel
          data={popularCategoriesResult}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.TouchableOpacity}
                onPress={() => handlePressCategory(item.ID)}
              >
                <View style={styles.view} />
                <View style={[styles.imageContainer]}>
                  <Image
                    source={SmallPath(item.PicturePath)}
                    style={styles.image}
                  />
                </View>
                <View style={[styles.textContainer]}>
                  <Text style={[styles.title]} numberOfLines={1}>
                    {item.Name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={"default"}
          loop={true}
        />
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default PopularCategories;
