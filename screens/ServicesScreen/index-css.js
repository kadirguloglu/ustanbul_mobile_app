import metrics from "../../config/metrics";
import { StyleSheet } from "react-native";

const SERVICE_IMAGE_WIDTH = metrics.DEVICE_WIDTH / 3;

export default StyleSheet.create({
  textCenter: {
    textAlign: "center"
  },
  help_block_success: {
    fontSize: 12,
    textAlign: "right",
    color: "green"
  },
  help_block_error: {
    fontSize: 12,
    textAlign: "right",
    color: "red"
  },
  serviceImage: {
    width: SERVICE_IMAGE_WIDTH,
    height: SERVICE_IMAGE_WIDTH
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  stepIndicator: {
    marginVertical: 50
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  QuestionTitle: {
    fontSize: 18,
    textAlign: "center",
    padding: 20
  },
  pageTopView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  button: {
    backgroundColor: "#59aae1",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 21,
    color: "white"
  }
});
