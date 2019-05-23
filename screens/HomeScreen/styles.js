import { StyleSheet, Dimensions, Platform } from "react-native";
import { ThemeColor } from "../../src/functions";

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
export const slideHeight = viewportHeight * 0.213;
export const slideHeightOpportunity = viewportHeight * 0.213;
export const slideWidth = wp(59);
export const slideWidthOpportunity = wp(59);
export const itemHorizontalMargin = wp(2);
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
export const itemWidthOpportunity =
  slideWidthOpportunity + itemHorizontalMargin * 2;
export const entryBorderRadius = 8;

export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#B721FF",
  background2: "#21D4FD"
};

export default StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column"
    // marginTop: 24
  },
  content: { paddingTop: 10 },
  header_background: {
    width: "100%",
    height: 210
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10
  },
  color_white: {
    color: "white"
  },
  font_ubuntu_r: {
    fontFamily: "Ubuntu_R"
  },
  font_raleway_bold: {
    fontFamily: "Raleway_Bold"
  },
  text_1: {
    fontSize: 12,
    color: "#fff"
  },
  logo_block: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    paddingLeft: 15,
    paddingTop: 10
  },
  logo: {
    fontSize: 27,
    color: "#fff",
    textAlign: "center"
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  radiusMask: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: "white"
  },
  radiusMaskEven: {
    backgroundColor: colors.black
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "stretch",
    // borderRadius: IS_IOS ? entryBorderRadius : 0,
    // borderTopLeftRadius: entryBorderRadius,
    // borderTopRightRadius: entryBorderRadius
    width: "100%",
    height: "auto"
  },
  slider: {
    marginTop: 15,
    overflow: "visible" // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
    paddingLeft: 16,
    flexWrap: "wrap",
    flex: 1
  },
  radiusMask: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: "white"
  },
  textContainer: {
    justifyContent: "center",
    paddingTop: 2,
    paddingBottom: 2,
    paddingHorizontal: 2,
    backgroundColor: ThemeColor,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
    flexDirection: "row"
  },
  title_text: {
    fontSize: 14,
    color: "#4c8497",
    paddingLeft: 15
  },
  view1: { flexDirection: "column" },
  view2: { zIndex: 2 },
  view3: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  text1: {
    fontFamily: "Raleway_Light",
    fontSize: 12,
    color: "#fff"
  },
  text2: {
    fontFamily: "Raleway_Bold",
    fontSize: 12,
    color: "#fff"
  },
  text3: {
    fontFamily: "Raleway_Bold",
    fontSize: 12,
    color: "#fff"
  },
  TouchableOpacity: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18
  },
  view: {
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
  },
  fontawesome1: { color: "#4c8497", paddingLeft: 10 }
});
