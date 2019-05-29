import React from "react";
import moment from "moment";
import { View, Text } from "native-base";

import MyButton from "../../../components/MyButton";

const Content = props => {
  const {
    PAGES_DATA_CATEGORY_INDEX,
    servicePreviewListResult,
    navigation,
    styles,
    handlerPreviewSelectedService,
    _handleGetQrCodeForMasterApproved,
    page,
    _handleSetPoint,
    _handleApprovedService
  } = props;
  const { dataIndex, categoryIndex } = PAGES_DATA_CATEGORY_INDEX[page];
  const key = Object.keys(servicePreviewListResult)[categoryIndex];
  let item = servicePreviewListResult[key];
  let data = item[dataIndex];
  return (
    <View key={"Service" + page} style={styles.view1}>
      <View>
        <Text style={styles.text1}>{key.substr(2)}</Text>
      </View>
      <View style={styles.view2}>
        <Text style={styles.text2}>{data.CategoryName}</Text>
        <Text style={styles.text3}>
          {moment(data.CreateDate).format("DD MMMM YYYY, dddd hh:mm")}
        </Text>
        {key.indexOf("1#") > -1 ? (
          <View>
            <MyButton
              full
              buttonStyle={styles.buttonStyle}
              press={navigation.navigate}
              parameters={[
                "SeeProposal",
                {
                  data: data
                }
              ]}
              textStyle={styles.iconText}
              text="Teklifleri gör"
            />
            <MyButton
              full
              buttonStyle={styles.buttonStyle}
              onPress={handlerPreviewSelectedService}
              parameters={[data]}
              textStyle={styles.iconText}
              text="İncele"
            />
            <MyButton
              full
              buttonStyle={styles.buttonStyle}
              press={handlerPreviewSelectedService}
              parameters={[data]}
              textStyle={styles.iconText}
              text="İptal et"
            />
          </View>
        ) : key.indexOf("2#") > -1 ? (
          <View>
            <MyButton
              full
              buttonStyle={styles.buttonStyle}
              press={_handleGetQrCodeForMasterApproved}
              parameters={[data]}
              text="Usta onayı için QR oluştur"
              textStyle={styles.iconText}
            />
            <MyButton
              full
              buttonStyle={styles.buttonStyle}
              onPress={handlerPreviewSelectedService}
              parameters={[data]}
              textStyle={styles.iconText}
              text="İncele"
            />
            <MyButton
              full
              buttonStyle={styles.buttonStyle}
              press={handlerPreviewSelectedService}
              parameters={[data]}
              textStyle={styles.iconText}
              text="İptal et"
            />
          </View>
        ) : key.indexOf("3#") > -1 ? (
          <View>
            <MyButton
              full
              buttonStyle={styles.buttonStyle}
              press={_handleApprovedService}
              parameters={[data]}
              text="Hizmeti onayla"
              textStyle={styles.iconText}
            />
            <MyButton
              full
              buttonStyle={styles.buttonStyle}
              onPress={handlerPreviewSelectedService}
              parameters={[data]}
              textStyle={styles.iconText}
              text="İncele"
            />
            <MyButton
              full
              buttonStyle={styles.buttonStyle}
              press={handlerPreviewSelectedService}
              parameters={[data]}
              text="Şikayet et"
              textStyle={styles.iconText}
            />
          </View>
        ) : key.indexOf("4#") > -1 ? (
          <View>
            <MyButton
              full
              buttonStyle={styles.buttonStyle}
              press={_handleSetPoint}
              parameters={[data]}
              text="Puan ver"
              textStyle={styles.iconText}
            />
            <MyButton
              full
              buttonStyle={styles.buttonStyle}
              onPress={handlerPreviewSelectedService}
              parameters={[data]}
              textStyle={styles.iconText}
              text="İncele"
            />
          </View>
        ) : key.indexOf("5#") > -1 ? (
          <MyButton
            full
            buttonStyle={styles.buttonStyle}
            press={handlerPreviewSelectedService}
            parameters={[data]}
            text="İncele"
            textStyle={styles.iconText}
          />
        ) : key.indexOf("6#") > -1 ? (
          <View>
            <MyButton
              full
              buttonStyle={styles.buttonStyle}
              press={handlerPreviewSelectedService}
              parameters={[data]}
              text="Teklifleri gör"
              textStyle={styles.iconText}
            />
            <MyButton
              full
              buttonStyle={styles.buttonStyle}
              onPress={handlerPreviewSelectedService}
              parameters={[data]}
              textStyle={styles.iconText}
              text="İncele"
            />
            <MyButton
              full
              buttonStyle={styles.buttonStyle}
              press={handlerPreviewSelectedService}
              parameters={[data]}
              textStyle={styles.iconText}
              text="İptal et"
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Content;
