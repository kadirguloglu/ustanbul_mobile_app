import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { View, Text } from "native-base";
import QRCode from "react-native-qrcode";

import MyButton from "../../../components/MyButton";

const { height, width } = Dimensions.get("window");

const QrCode = props => {
  const { qrCodeValue, qrTimerValue } = props;

  return (
    <View padder style={styles.container}>
      <View>
        <Text style={styles.helperText}>
          Ustamız Hizmeti Onayladığında Sizde Onay Vererek Ücreti Ustamızın
          Hesabına Aktarabilirsiniz. Ustamız İlgili Hizmeti Onayladığında Hizmet
          "Onay Bekleyenler" Adımına Geçecektir.
        </Text>
        <View style={styles.qrCodeBlock}>
          <QRCode
            value={qrCodeValue}
            size={width * 0.7}
            bgColor="#000"
            fgColor="#fff"
          />
        </View>
        <Text style={styles.timerText}>
          {qrTimerValue} saniye içinde okutulmalıdır.
        </Text>
      </View>
      <View>
        <MyButton full text="İşlem tamamlandı" />
      </View>
    </View>
  );
};

export default QrCode;

const styles = StyleSheet.create({
  helperText: {
    marginBottom: 10
  },
  qrCodeBlock: {
    flexDirection: "row",
    justifyContent: "center"
  },
  timerText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 24
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column"
  }
});
