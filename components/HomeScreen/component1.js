import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles, {
  sliderWidth,
  itemWidth,
  itemWidthOpportunity,
  slideHeightOpportunity,
  itemHorizontalMargin,
  colors,
  entryBorderRadius,
  slideHeight
} from "../../screens/HomeScreen/styles";
import { ThemeColor } from "../../src/functions";

export default function Component1(props) {
  return (
    <Carousel
      data={props.popularCategoriesResult}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: itemWidth,
              height: slideHeight,
              paddingHorizontal: itemHorizontalMargin,
              paddingBottom: 18
            }}
            onPress={() => props.handlePressCategory(item.ID)}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                left: itemHorizontalMargin,
                right: itemHorizontalMargin,
                bottom: 18,
                shadowColor: colors.black,
                shadowOpacity: 0.25,
                shadowOffset: { width: 0, height: 10 },
                shadowRadius: 10,
                borderRadius: entryBorderRadius,
                borderWidth: 1,
                borderColor: ThemeColor
              }}
            />
            <View style={[styles.imageContainer]}>
              <Image
                source={require("../../assets/image-place-holder.png")}
                style={styles.image}
                // onError={(s) => }
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
  );
}
