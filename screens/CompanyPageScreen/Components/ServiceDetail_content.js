import React from "react";
import { View, Text, Thumbnail } from "native-base";
import { StyleSheet } from "react-native";

import { MidPath } from "../../../src/functions";
import MyButton from "../../../components/MyButton";

const ServiceDetail = props => {
  const { service, _handleSendProposal } = props;

  return (
    <View style={styles.view1}>
      <View style={styles.view4}>
        <Text style={styles.strongTitle}>Hizmet Adresi</Text>
        <Text>Adres Detayı : {service.AddressDescription}</Text>
      </View>
      <View style={styles.view4}>
        <Text style={styles.strongTitle}>Hizmet Başlığı</Text>
        <Text>{service.Title}</Text>
      </View>
      <View style={styles.view4}>
        <Text style={styles.strongTitle}>Hizmet Notu</Text>
        <Text>{service.Note}</Text>
      </View>
      <View style={styles.view4}>
        <Text style={styles.strongTitle}>Garantörlü Hizmet Mi?</Text>
        <Text>{service.IsGuarantor ? "Evet" : "Hayır"}</Text>
      </View>
      <View style={styles.view4}>
        <Text style={styles.strongTitle}>Keşif İsteniyor Mu?</Text>
        <Text>{service.IsDiscovery ? "Evet" : "Hayır"}</Text>
      </View>
      {service.Questions.length ? (
        <View>
          <Text style={styles.strongTitle}>
            İlgili Hizmetin Soruları ve Cevapları
          </Text>
        </View>
      ) : null}
      {service.Questions.map((item, index) => (
        <View key={"Question-" + index} style={styles.view4}>
          <Text style={styles.strongTitle}>{item.Question}</Text>
          <Text>{item.Answer}</Text>
        </View>
      ))}
      {service.Pictures.length > 0 ? (
        <View>
          <Text style={styles.strongTitle}>
            İlgili Hizmetin Müşteri Tarafından Alınan Resimleri
          </Text>
        </View>
      ) : null}
      <View style={[styles.view2, styles.view4]}>
        {service.Pictures.map((item, index) => (
          <View key={"Picture-" + index} style={styles.view3}>
            <Thumbnail square large source={MidPath(item.PicturePath)} />
          </View>
        ))}
      </View>
      <View>
        <MyButton
          full={true}
          press={() => _handleSendProposal()}
          text="Teklif Ver"
        />
      </View>
    </View>
  );
};

export default ServiceDetail;

const styles = StyleSheet.create({
  view1: {
    padding: 5
  },
  view2: {
    flexDirection: "row"
  },
  view3: {
    padding: 3
  },
  view4: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#dedede"
  },
  strongTitle: {
    fontWeight: "bold"
  }
});
