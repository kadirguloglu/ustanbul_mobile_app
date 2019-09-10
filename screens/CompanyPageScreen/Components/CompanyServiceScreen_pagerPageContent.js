import React from "react";
import { View, Text } from "native-base";
import moment from "moment";

import i18n from "../../../constants/strings";
import MyButton from "../../../components/MyButton";

export default PagerPageContent = props => {
  const {
    page,
    PAGES_DATA_CATEGORY_INDEX,
    companyDetailServiceResponse,
    handlerPreviewSelectedService,
    styles,
    handlerUpdateServiceProposal,
    _handleApprovedService
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
                text={i18n.t("text_162")}
                buttonStyle={styles.buttonStyle}
                textStyle={styles.iconText}
                press={() => handlerUpdateServiceProposal(item, data)}
              />
              <MyButton
                full
                text={i18n.t("text_129")}
                buttonStyle={styles.buttonStyle}
                textStyle={styles.iconText}
                press={() => handlerPreviewSelectedService(item, data)}
              />
            </View>
          ) : key.indexOf("2#") > -1 ? (
            <View>
              <MyButton
                full
                text={i18n.t("text_183")}
                buttonStyle={styles.buttonStyle}
                textStyle={styles.iconText}
                press={_handleApprovedService}
                parameters={[data]}
              />
              <MyButton
                full
                text={i18n.t("text_129")}
                buttonStyle={styles.buttonStyle}
                textStyle={styles.iconText}
                press={() => handlerPreviewSelectedService(item, data)}
              />
            </View>
          ) : key.indexOf("3#") > -1 ? (
            <View>
              <MyButton
                full
                text={i18n.t("text_129")}
                buttonStyle={styles.buttonStyle}
                textStyle={styles.iconText}
                press={() => handlerPreviewSelectedService(item, data)}
              />
            </View>
          ) : key.indexOf("4#") > -1 ? (
            <View>
              <MyButton
                full
                text={i18n.t("text_129")}
                buttonStyle={styles.buttonStyle}
                textStyle={styles.iconText}
                press={() => handlerPreviewSelectedService(item, data)}
              />
            </View>
          ) : key.indexOf("5#") > -1 ? (
            <View>
              <MyButton
                full
                text={i18n.t("text_129")}
                buttonStyle={styles.buttonStyle}
                textStyle={styles.iconText}
                press={() => handlerPreviewSelectedService(item, data)}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
    return element;
  }
  return null;
};
