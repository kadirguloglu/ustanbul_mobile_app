import React from "react";
import { View, Text, Spinner } from "native-base";
import { ScrollView } from "react-native";

import MyButton from "../../../components/MyButton";

const CustomerServicePreview = props => {
  const {
    styles,
    servicePreviewDetailLoading,
    servicePreviewDetailResult,
    servicePreviewDetailQuestionLoading,
    servicePreviewDetailQuestionResult,
    _handleSetInitialState
  } = props;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View padder>
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
                {servicePreviewDetailResult.IsGuarantor ? "Evet" : "Hayir"}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                Müşteri onaydı mı?
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsApproved ? "Evet" : "Hayir"}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                Usta onayladı mı?
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsMasterApproved ? "Evet" : "Hayir"}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                Keşif istendi mi?
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsDiscovery ? "Evet" : "Hayir"}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                Ödeme yapıldı mı?
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsPayment ? "Evet" : "Hayir"}
              </Text>
              <Text style={styles.ServicePreviewItemText}>
                İptal edildi mi?
              </Text>
              <Text style={styles.ServicePreviewItemTextAnswer}>
                {servicePreviewDetailResult.IsActive ? "Evet" : "Hayir"}
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
        </View>
      </ScrollView>
      <View>
        <MyButton
          full={true}
          press={() => _handleSetInitialState("initialTabActivePage", 0)}
          text="Kapat"
        />
      </View>
    </View>
  );
};

export default CustomerServicePreview;
