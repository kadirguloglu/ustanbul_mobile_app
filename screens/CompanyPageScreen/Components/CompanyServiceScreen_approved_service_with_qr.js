import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "native-base";
import { BarCodeScanner } from "expo";

const ApprovedServiceWithQr = props => {
  const { hasCameraPermission, _handleBarCodeScanned, scanned } = props;

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (scanned) return null;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end"
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={_handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

export default ApprovedServiceWithQr;
