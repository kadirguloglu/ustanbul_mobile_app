import React from "react";
import { View, Text } from "native-base";
import moment from "moment";
import MyButton from "../../../components/MyButton";

export default (PagerPageContent = props => {
  const {
    page,
    PAGES_DATA_CATEGORY_INDEX,
    companyDetailServiceResponse,
    handlerPreviewSelectedService,
    styles,
    handlerUpdateServiceProposal,
    handlerServiceApproved
  } = props;
  const { servicePreviewListResult } = companyDetailServiceResponse;
  if (servicePreviewListResult) {
    const { dataIndex, categoryIndex } = PAGES_DATA_CATEGORY_INDEX[page];
    const key = Object.keys(servicePreviewListResult)[categoryIndex];
    let item = servicePreviewListResult[key];
    let data = item[dataIndex];
    const element = (
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
                text="İncele"
                buttonStyle={styles.buttonStyle}
                textStyle={styles.iconText}
                press={() => handlerPreviewSelectedService(item, data)}
              />
            </View>
          ) : key.indexOf("2#") > -1 ? (
            <View>
              <MyButton
                full
                text="İncele"
                buttonStyle={styles.buttonStyle}
                textStyle={styles.iconText}
                press={() => handlerPreviewSelectedService(item, data)}
              />
            </View>
          ) : key.indexOf("3#") > -1 ? (
            <View>
              <MyButton
                full
                text="İncele"
                buttonStyle={styles.buttonStyle}
                textStyle={styles.iconText}
                press={() => handlerPreviewSelectedService(item, data)}
              />
            </View>
          ) : key.indexOf("4#") > -1 ? (
            <View>
              <MyButton
                full
                text="İncele"
                buttonStyle={styles.buttonStyle}
                textStyle={styles.iconText}
                press={() => handlerPreviewSelectedService(item, data)}
              />
            </View>
          ) : key.indexOf("5#") > -1 ? (
            <MyButton
              full
              text="İncele"
              buttonStyle={styles.buttonStyle}
              textStyle={styles.iconText}
              press={() => handlerPreviewSelectedService(item, data)}
            />
          ) : key.indexOf("6#") > -1 ? (
            <View>
              <MyButton
                full
                text="Teklifleri gör"
                buttonStyle={styles.buttonStyle}
                textStyle={styles.iconText}
                press={() => handlerPreviewSelectedService(item, data)}
              />
              <MyButton
                full
                text="İncele"
                buttonStyle={styles.buttonStyle}
                textStyle={styles.iconText}
                press={() => handlerPreviewSelectedService(item, data)}
              />
              <MyButton
                full
                text="İptal et"
                buttonStyle={styles.buttonStyle}
                textStyle={styles.iconText}
                press={() => handlerPreviewSelectedService(item, data)}
              />
            </View>
          ) : null}
          {key.indexOf("1#") > -1 ? (
            <MyButton
              full
              text="Teklifi güncelle"
              buttonStyle={styles.buttonStyle}
              textStyle={styles.iconText}
              press={() => handlerUpdateServiceProposal(item, data)}
            />
          ) : item.indexOf("2#") > -1 ? (
            <MyButton
              full
              text="Onayla ve tamamla"
              buttonStyle={styles.buttonStyle}
              textStyle={styles.iconText}
              press={() => handlerServiceApproved(item, data)}
            />
          ) : null}
        </View>
      </View>
    );
    return element;
  }
  return null;
});
