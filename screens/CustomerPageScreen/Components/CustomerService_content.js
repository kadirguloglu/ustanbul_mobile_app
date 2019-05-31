import React from "react";
import moment from "moment";
import { View, Text } from "native-base";

import CustomerServiceKey1 from "./CustomerService_key_1";
import CustomerServiceKey2 from "./CustomerService_key_2";
import CustomerServiceKey3 from "./CustomerService_key_3";
import CustomerServiceKey4 from "./CustomerService_key_4";
import CustomerServiceKey5 from "./CustomerService_key_5";
import CustomerServiceKey6 from "./CustomerService_key_6";

const Content = props => {
  const {
    PAGES_DATA_CATEGORY_INDEX,
    servicePreviewListResult,
    navigation,
    styles,
    _handlerPreviewSelectedService,
    _handleGetQrCodeForMasterApproved,
    page,
    _handleSetPoint,
    _handleApprovedService,
    _handleComplaintService,
    _handleCancelService
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
          <CustomerServiceKey1
            styles={styles}
            navigation={navigation}
            data={data}
            _handlerPreviewSelectedService={_handlerPreviewSelectedService}
            _handleCancelService={_handleCancelService}
          />
        ) : key.indexOf("2#") > -1 ? (
          <CustomerServiceKey2
            styles={styles}
            data={data}
            _handlerPreviewSelectedService={_handlerPreviewSelectedService}
            _handleGetQrCodeForMasterApproved={
              _handleGetQrCodeForMasterApproved
            }
            _handleCancelService={_handleCancelService}
          />
        ) : key.indexOf("3#") > -1 ? (
          <CustomerServiceKey3
            styles={styles}
            data={data}
            _handleApprovedService={_handleApprovedService}
            _handlerPreviewSelectedService={_handlerPreviewSelectedService}
            _handleComplaintService={_handleComplaintService}
          />
        ) : key.indexOf("4#") > -1 ? (
          <CustomerServiceKey4
            styles={styles}
            data={data}
            _handleSetPoint={_handleSetPoint}
            _handlerPreviewSelectedService={_handlerPreviewSelectedService}
          />
        ) : key.indexOf("5#") > -1 ? (
          <CustomerServiceKey5
            styles={styles}
            data={data}
            _handlerPreviewSelectedService={_handlerPreviewSelectedService}
          />
        ) : key.indexOf("6#") > -1 ? (
          <CustomerServiceKey6
            styles={styles}
            navigation={navigation}
            data={data}
            _handlerPreviewSelectedService={_handlerPreviewSelectedService}
            _handleCancelService={_handleCancelService}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Content;
