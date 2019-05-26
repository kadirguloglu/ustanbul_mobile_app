import React from "react";
import { ScrollView } from "react-native";
import Modal from "react-native-modal";
import { View, Spinner, Text } from "native-base";

import MyButton from "../../../components/MyButton";

export default (ModalDialog = props => {
  const {
    modalIsVisible,
    styles,
    servicePreviewDetailLoading,
    servicePreviewDetailResult,
    servicePreviewDetailQuestionLoading,
    servicePreviewDetailQuestionResult,
    setInitialState
  } = props;
  return (
    <Modal isVisible={modalIsVisible}>
      <ScrollView>
        <View style={styles.view4}>
          {servicePreviewDetailLoading ? (
            <Spinner />
          ) : servicePreviewDetailResult ? (
            <View>
              <Text style={styles.ServicePreviewItemText}>
                Adres Açıklaması
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.AddressDescription}
              </Text>
              <Text style={styles.ServicePreviewItemText}>Not</Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.Note}
              </Text>
              <Text style={styles.ServicePreviewItemText}>Garantörlü mü?</Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsGuarantor ? "evet" : "hayir"}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                Müşteri onaydı mı?
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsApproved ? "evet" : "hayir"}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                Usta onayladı mı?
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsMasterApproved ? "evet" : "hayir"}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                Keşif istendi mi?
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsDiscovery ? "evet" : "hayir"}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                Ödeme yapıldı mı?
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsPayment ? "evet" : "hayir"}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                İptal edildi mi?
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsActive ? "evet" : "hayir"}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                Ülke / İl / İlçe / Mahalle
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.CountryName
                  ? servicePreviewDetailResult.CountryName.trim()
                  : ""}{" "}
                /{" "}
                {servicePreviewDetailResult.CountyName
                  ? servicePreviewDetailResult.CountyName.trim()
                  : ""}{" "}
                /{" "}
                {servicePreviewDetailResult.DiscrictName
                  ? servicePreviewDetailResult.DiscrictName.trim()
                  : ""}{" "}
                /{" "}
                {servicePreviewDetailResult.NeigborhoodName
                  ? servicePreviewDetailResult.NeigborhoodName.trim()
                  : ""}
              </Text>
              <Text style={styles.ServicePreviewItemText}>Hizmet kodu</Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.ID}
                {servicePreviewDetailResult.CodeText}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                Sorulara verilen cevaplar
              </Text>
              {servicePreviewDetailQuestionLoading ? (
                <Spinner />
              ) : (
                servicePreviewDetailQuestionResult.map((item, index) => {
                  return (
                    <Text
                      key={"Answers" + index}
                      style={[
                        styles.QuestionAndAnswer,
                        styles.ServicePreviewItemTextAnswer
                      ]}
                    >
                      {item.Question} : {item.Answer}
                    </Text>
                  );
                })
              )}
            </View>
          ) : (
            <Spinner />
          )}
          <MyButton
            press={() => setInitialState("modalIsVisible", false)}
            text="Kapat"
            full={true}
          />
        </View>
      </ScrollView>
    </Modal>
  );
});
