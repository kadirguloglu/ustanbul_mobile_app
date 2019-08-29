import Carousel from "react-native-snap-carousel";
import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles, {
  sliderWidth,
  itemWidth,
  itemWidthOpportunity,
  itemHorizontalMargin,
  colors,
  entryBorderRadius,
  slideHeight
} from "../../screens/HomeScreen/styles";
import { ThemeColor } from "../../src/functions";
import { FontAwesome } from "@expo/vector-icons";

export default function Component2(props) {
  const { result } = props;
  return (
    <View>
      <Text style={styles.title_text}>
        {result.Name}
        {"   "}
        <FontAwesome
          style={{ color: "#4c8497", paddingLeft: 10 }}
          name="arrow-circle-right"
          size={12}
        />
      </Text>
      <Carousel
        data={result.SubCategories}
        keyExtractor={(item, index) => "component-2-" + index.toString()}
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
              key={"component-2-" + index}
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
        itemWidth={itemWidthOpportunity}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        layout={"default"}
        loop={true}
      />
    </View>
  );
}
