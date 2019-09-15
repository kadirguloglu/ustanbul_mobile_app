import { StyleSheet, Dimensions } from "react-native";
import { ThemeColor } from "../src/functions";
import colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    width: width * 0.8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 44,
    marginBottom: 10
  },
  inputIcon: {
    color: "white",
    paddingRight: 7,
    width: 18
  },
  input: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: 14,
    fontFamily: "Raleway_Light",
    borderBottomColor: "transparent",
    borderBottomWidth: 0,
    width: width * 0.8 - 30 - 18
  },
  button: {
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopStartRadius: 10,
    width: width * 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    backgroundColor: ThemeColor
  },
  buttonText: {
    color: colors.WHITE
  },
  lineByLine: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 18
  },
  line: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 55
  },
  lineByText: {
    textAlign: "center",
    height: 15,
    color: "white",
    fontSize: 14,
    fontFamily: "Raleway_Light",
    paddingLeft: 5,
    paddingRight: 5
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  socialLoginIcon: {
    color: "white",
    paddingLeft: 10,
    paddingRight: 10
  },
  logoView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  logoText: {
    fontFamily: "Raleway_Bold",
    fontSize: 54,
    color: "#fff"
  },
  fullBackgroundImage: {
    width: width,
    height: height,
    flex: 1
  },
  loginScreenView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  loginFormView: {
    flexDirection: "column",
    justifyContent: "flex-start",
    height: height * 0.6
  },
  registerTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.8,
    marginBottom: 10
  },
  text_1: {
    fontFamily: "Raleway_Light",
    fontSize: 14,
    color: "#fff"
  },
  text_2: {
    fontFamily: "Raleway_Bold",
    fontSize: 14,
    color: "#fff"
  }
});
