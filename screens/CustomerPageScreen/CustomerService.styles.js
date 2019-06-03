import { StyleSheet } from "react-native";

import { ThemeColor } from "../../src/functions";

export default StyleSheet.create({
  iconText: {
    fontSize: 18,
    color: "white"
  },
  buttonStyle: {
    marginBottom: 10
  },
  buttonStyle_old: {
    backgroundColor: ThemeColor,
    margin: 10,
    borderRadius: 5
  },
  ServicePreviewItemText: {
    textAlign: "center",
    fontSize: 15
  },
  ServicePreviewItemTextAnswer: {
    marginBottom: 2,
    borderBottomColor: ThemeColor,
    borderBottomWidth: 1
  },
  dotAbsoluteBlock: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  },
  dotTextBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  dotText: { fontSize: 50, fontWeight: "bold", color: "white" },
  view1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "transparent"
  },
  text1: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1
  },
  view2: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 5,
    padding: 10
  },
  text2: { fontSize: 15, textAlign: "center" },
  text3: {
    fontSize: 13,
    textAlign: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1
  },
  backgroundImage: {
    flex: 1
  }
});
