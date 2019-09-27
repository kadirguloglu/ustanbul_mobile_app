import React, { useEffect, useState } from "react";
import { ImageBackground, View, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  Root,
  Spinner,
  Tabs,
  Tab,
  Toast,
  TabHeading,
  Icon,
  Text,
  ScrollableTab
} from "native-base";
import { NavigationEvents } from "react-navigation";

import i18n from "../../constants/strings";

import {
  customerServicePreviewData,
  servicePreviewDetailQuestionData,
  sendServicePoint,
  approvedService,
  cancelService
} from "../../src/actions/customerDetailService";
import {
  servicePreviewDetailData,
  companyServiceRateData,
  customerServiceIsPointData,
  customerServiceOldPointData,
  servicePointListData
} from "../../src/actions/companyDetailService";
import {
  getQrCode,
  getComplaintOptionList
} from "../../src/actions/generalServiceGet";
import { postServiceComplaint } from "../../src/actions/servicePost";

import { ThemeColor } from "../../src/functions";

import Content from "./Components/CustomerService_content";
import Point from "./Components/CustomerService_point";
import ComplaintService from "./Components/CustomerService_complaint";
import CustomerServicePreview from "./Components/CustomerService_preview";
import CustomerServiceHeader from "./Components/CustomerService_header";
import QRCode from "./Components/CustomerService_qrcode";

import styles from "./CustomerService.styles";

function CustomerServiceScreen({ navigation }) {
  const [newProposalRegex, setNewProposalRegex] = useState(true);
  const [oldProposalPrice, setOldProposalPrice] = useState("0");
  const [PAGES, setPAGES] = useState([]);
  const [PAGES_DATA_CATEGORY_INDEX, setPAGES_DATA_CATEGORY_INDEX] = useState(
    []
  );
  const [activeServicePage, setActiveServicePage] = useState(0);
  const [initialTabActivePage, setInitialTabActivePage] = useState(0);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [qrTimerValue, setQrTimerValue] = useState(120);
  const [selectRateCount, setSelectRateCount] = useState([]);
  const [selectedService, setSelectedService] = useState({});
  const [data, setData] = useState(null);
  const [
    servicePreviewListResultKeys,
    setServicePreviewListResultKeys
  ] = useState([]);
  const [ComplaintOptionId, setComplaintOptionId] = useState(0);
  const [Description, setDescription] = useState("");

  const dispatch = useDispatch();
  const {
    servicePreviewDetailQuestionLoading,
    servicePreviewDetailQuestionResult,
    customerServicePreviewLoading,
    servicePreviewListResult
  } = useSelector(x => x.customerDetailServiceResponse);
  const {
    servicePreviewDetailLoading,
    servicePreviewDetailResult,
    companyServiceRateData,
    companyServiceRateLoading,

    customerServiceIsPointLoading,
    customerServiceIsPointData,

    customerServiceOldPointLoading,
    customerServiceOldPointData,

    servicePointListLoading,
    servicePointListData
  } = useSelector(x => x.companyDetailServiceResponse);

  const {
    activeUser,
    getLanguageData,
    getSiteData,
    getQrCodeLoading,
    getComplaintOptionListResult,
    getComplaintOptionListLoading
  } = useSelector(x => x.generalServiceGetResponse);

  useEffect(() => {
    this._handleComponentWillMount();
    return () => {};
  }, []);

  useEffect(() => {
    if (activeUser.Id !== 0) {
      navigation.navigate("Home");
    }
    return () => {};
  }, [activeUser.Id]);

  _handleComponentWillMount = () => {
    if (activeUser.Id == 0) {
      Alert.alert(
        i18n.t("text_51"),
        i18n.t("text_52"),
        [
          {
            text: i18n.t("giris_yap"),
            onPress: () => navigation.navigate("Login")
          },
          {
            text: i18n.t("anasayfa"),
            onPress: () => navigation.navigate("Home"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }
    dispatch(customerServicePreviewData(activeUser.Id, 1)).then(
      ({ payload }) => {
        if (payload) {
          if (payload.data) {
            const keys = Object.keys(payload.data);
            setServicePreviewListResultKeys(keys);
          }
        }
      }
    );
  };

  navigationComponentWillMount = () => {
    this._handleComponentWillMount();
  };

  _handleQrStartTimer = () => {
    setQrTimerValue(120);
    this.qrStartTimer = setInterval(() => {
      this._handleDecrementQrTimer();
    }, 1000);
  };

  _handleDecrementQrTimer = () => {
    if (qrTimerValue === 0) {
      clearInterval(this.qrStartTimer);
      this._handleCountDownFinishWithQrCode();
    }
    setQrTimerValue(qrTimerValue - 1);
  };

  _handleCountDownFinishWithQrCode = () => {
    setInitialTabActivePage(0);
    Toast.show({
      text: i18n.t("text_53"),
      buttonText: i18n.t("text_6"),
      duration: 3500
    });
  };

  _handleGetQrCodeForMasterApproved = data => {
    dispatch(getQrCode(data.ID)).then(({ payload }) => {
      if (payload) {
        if (payload.request) {
          if (payload.request._response) {
            setInitialTabActivePage(1);
            setQrCodeValue(payload.request._response);
            this._handleQrStartTimer();
            return;
          }
        }
      }
      Toast.show({
        text: i18n.t("text_54"),
        buttonText: i18n.t("text_6"),
        duration: 3500
      });
    });
  };

  _handlerPreviewSelectedService = data => {
    dispatch(servicePreviewDetailData(data.ID));
    dispatch(servicePreviewDetailQuestionData(data.ID));
    setInitialTabActivePage(4);
  };

  onlyNumberRegex = value => {
    setOldProposalPrice(value + "");
    if (value.length == 0) setNewProposalRegex(true);
    else if (/^(\d*\.)?\d+$/.test(value)) {
      setNewProposalRegex(true);
    } else {
      setNewProposalRegex(false);
    }
  };

  _handleSetPoint = data => {
    setSelectedService(data);

    dispatch(companyServiceRateData(data.MasterID, getLanguageData.Id)).then(
      ({ payload }) => {
        setInitialTabActivePage(2);
      }
    );
    dispatch(customerServiceIsPointData(data.ID, getLanguageData.Id)).then(
      ({ payload }) => {
        if (payload.data) {
          dispatch(customerServiceOldPointData(data.ID, getLanguageData.Id));
        } else {
          dispatch(servicePointListData(getLanguageData.Id));
        }
      }
    );
    // companyServiceRateData
  };

  _handleSendServicePoint = () => {
    let countList = [];
    for (let i = 0; i < selectRateCount.length; i++) {
      const item = selectRateCount[i];
      countList.push({
        Rate: item.Rate,
        ServiceScoreId: item.ID,
        CompanyId: selectedService.MasterID,
        CustomerServiceId: selectedService.ID
      });
    }

    dispatch(sendServicePoint(countList)).then(({ payload }) => {
      if (payload.data) {
        setInitialTabActivePage(0);
        Toast.show({
          text: i18n.t("text_55"),
          buttonText: i18n.t("text_6"),
          duration: 3500
        });
      } else {
        Toast.show({
          text: i18n.t("text_56"),
          buttonText: i18n.t("text_6"),
          duration: 3500
        });
      }
    });
  };

  _handleApprovedService = data => {
    Alert.alert(
      i18n.t("text_57"),
      i18n.t("text_58"),
      [
        {
          text: i18n.t("text_59"),
          onPress: () => {
            this._handleComplaintService(data);
          },
          style: "cancel"
        },
        {
          text: i18n.t("text_60"),
          onPress: () => {
            dispatch(approvedService(data.ID)).then(({ payload }) => {
              if (payload) {
                if (payload.data) {
                  Toast.show({
                    text: i18n.t("text_61"),
                    buttonText: i18n.t("text_6"),
                    duration: 3500
                  });
                  this._handleComponentWillMount();
                  return;
                }
              }
              Toast.show({
                text: i18n.t("text_62"),
                buttonText: i18n.t("text_6"),
                duration: 3500
              });
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  _handleComplaintService = data => {
    setData(data);
    dispatch(getComplaintOptionList(getLanguageData.Id)).then(({ payload }) => {
      if (payload) {
        if (payload.data) {
          setInitialTabActivePage(3);
          setComplaintOptionId(0);
          setDescription("");
          return;
        }
      }
      Toast.show({
        text: i18n.t("text_24"),
        buttonText: i18n.t("text_6"),
        duration: 3500
      });
    });
  };

  _handlePostServiceComplaint = () => {
    if (ComplaintOptionId === 0) {
      Toast.show({
        text: i18n.t("text_63"),
        buttonText: i18n.t("text_6"),
        duration: 3500
      });
      return;
    }
    if (Description.length <= 30 || Description.length >= 1000) {
      Toast.show({
        text: i18n.t("text_64"),
        buttonText: i18n.t("text_6"),
        duration: 3500
      });
      return;
    }
    const complaintModel = {
      ComplaintOptionId: ComplaintOptionId,
      Description: Description,
      CustomerServiceID: data.ID,
      CompanyUserID: data.MasterID,
      UserID: activeUser.Id,
      SiteID: getSiteData.Id
    };
    dispatch(postServiceComplaint(complaintModel)).then(({ payload }) => {
      if (payload) {
        if (payload.request) {
          if (payload.request._response) {
            if (payload.request._response === "success") {
              Toast.show({
                text: i18n.t("text_65"),
                buttonText: i18n.t("text_6"),
                duration: 3500
              });
              setInitialTabActivePage(0);
              setComplaintOptionId(0);
              setDescription("");
              return;
            } else {
              Toast.show({
                text: i18n.t("text_66"),
                buttonText: i18n.t("text_6"),
                duration: 3500
              });
              return;
            }
          }
        }
      }
      Toast.show({
        text: i18n.t("text_66"),
        buttonText: i18n.t("text_6"),
        duration: 3500
      });
    });
  };

  _handleCancelService = data => {
    Alert.alert(
      i18n.t("text_51"),
      i18n.t("text_67"),
      [
        {
          text: i18n.t("text_68"),
          onPress: () => {},
          style: "cancel"
        },
        {
          text: i18n.t("text_69"),
          onPress: () => {
            dispatch(cancelService(data.ID)).then(({ payload }) => {
              if (payload) {
                if (payload.data) {
                  Toast.show({
                    text: i18n.t("text_70"),
                    buttonText: i18n.t("text_6"),
                    duration: 3500
                  });
                  this._handleComponentWillMount();
                  return;
                }
              }
              Toast.show({
                text: i18n.t("text_71"),
                buttonText: i18n.t("text_6"),
                duration: 3500
              });
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  renderTabHeading = item => {
    switch (item) {
      case "1#Gelen Teklifler":
        return (
          <TabHeading
            tabStyle={{ backgroundColor: ThemeColor }}
            activeTabStyle={{ backgroundColor: ThemeColor }}
          >
            <Icon
              name="ios-clipboard"
              color="white"
              style={{ color: "white" }}
            />
            <Text style={{ color: "white" }}>{i18n.t("text_72")}</Text>
          </TabHeading>
        );
      case "2#Tamamlanmayı Bekleyenler":
        return (
          <TabHeading
            tabStyle={{ backgroundColor: ThemeColor }}
            activeTabStyle={{ backgroundColor: ThemeColor }}
          >
            <Icon name="ios-filing" color="white" style={{ color: "white" }} />
            <Text style={{ color: "white" }}>{i18n.t("text_73")}</Text>
          </TabHeading>
        );
      case "3#Onay Bekleyenler":
        return (
          <TabHeading
            tabStyle={{ backgroundColor: ThemeColor }}
            activeTabStyle={{ backgroundColor: ThemeColor }}
          >
            <Icon
              name="ios-checkmark"
              color="white"
              style={{ color: "white" }}
            />
            <Text style={{ color: "white" }}>{i18n.t("text_74")}</Text>
          </TabHeading>
        );
      case "4#Gelen Teklifler":
        return (
          <TabHeading
            tabStyle={{ backgroundColor: ThemeColor }}
            activeTabStyle={{ backgroundColor: ThemeColor }}
          >
            <Icon
              name="ios-information"
              color="white"
              style={{ color: "white" }}
            />
            <Text style={{ color: "white" }}>{i18n.t("text_75")}</Text>
          </TabHeading>
        );
      case "5#İptal Edilenler":
        return (
          <TabHeading
            tabStyle={{ backgroundColor: ThemeColor }}
            activeTabStyle={{ backgroundColor: ThemeColor }}
          >
            <Icon name="ios-close" color="white" style={{ color: "white" }} />
            <Text style={{ color: "white" }}>{i18n.t("text_76")}</Text>
          </TabHeading>
        );
      case "6#Bekleyenler":
        return (
          <TabHeading
            tabStyle={{ backgroundColor: ThemeColor }}
            activeTabStyle={{ backgroundColor: ThemeColor }}
          >
            <Icon name="ios-clock" color="white" style={{ color: "white" }} />
            <Text style={{ color: "white" }}>{i18n.t("text_77")}</Text>
          </TabHeading>
        );
      default:
        return (
          <TabHeading
            tabStyle={{ backgroundColor: ThemeColor }}
            activeTabStyle={{ backgroundColor: ThemeColor }}
          >
            <Icon name="ios-sync" color="white" style={{ color: "white" }} />
            <Text style={{ color: "white" }}>{i18n.t("text_78")}</Text>
          </TabHeading>
        );
    }
  };

  return (
    <Root>
      <NavigationEvents
        onDidFocus={() => this.navigationComponentWillMount()}
      />
      <CustomerServiceHeader
        initialTabActivePage={initialTabActivePage}
        navigation={navigation}
        setInitialTabActivePage={setInitialTabActivePage}
      />
      {customerServicePreviewLoading ? (
        <Spinner />
      ) : (
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../../assets/splash-screen-demo.png")}
        >
          <View style={{ flex: 1 }}>
            {servicePreviewListResult &&
            servicePreviewListResultKeys.length > 0 ? (
              <Tabs
                renderTabBar={() => <View />}
                style={{ backgroundColor: "transparent" }}
                locked={true}
                page={initialTabActivePage}
              >
                <Tab
                  heading={i18n.t("text_79")}
                  style={{ backgroundColor: "transparent" }}
                  tabStyle={{ backgroundColor: ThemeColor }}
                  activeTabStyle={{ backgroundColor: ThemeColor }}
                >
                  <Tabs
                    style={{ backgroundColor: "transparent" }}
                    locked={true}
                    renderTabBar={() => <ScrollableTab />}
                  >
                    {servicePreviewListResultKeys.map((item, index) => {
                      return (
                        <Tab
                          style={{ backgroundColor: "transparent" }}
                          key={"1heading-" + index}
                          heading={this.renderTabHeading(item)}
                          tabStyle={{ backgroundColor: ThemeColor }}
                          activeTabStyle={{ backgroundColor: ThemeColor }}
                        >
                          <Tabs
                            renderTabBar={() => <View />}
                            style={{ backgroundColor: "transparent" }}
                          >
                            {servicePreviewListResult[item].map((elem, ix) => {
                              return (
                                <Tab
                                  key={"ViewPagerContent-" + ix}
                                  heading={"heading" + ix}
                                  style={{ backgroundColor: "transparent" }}
                                  tabStyle={{ backgroundColor: ThemeColor }}
                                  activeTabStyle={{
                                    backgroundColor: ThemeColor
                                  }}
                                >
                                  <Content
                                    dataKey={item}
                                    data={elem}
                                    navigation={navigation}
                                    styles={styles}
                                    _handlerPreviewSelectedService={
                                      this._handlerPreviewSelectedService
                                    }
                                    _handleGetQrCodeForMasterApproved={
                                      this._handleGetQrCodeForMasterApproved
                                    }
                                    _handleSetPoint={this._handleSetPoint}
                                    _handleApprovedService={
                                      this._handleApprovedService
                                    }
                                    _handleComplaintService={
                                      this._handleComplaintService
                                    }
                                    _handleCancelService={
                                      this._handleCancelService
                                    }
                                  />
                                </Tab>
                              );
                            })}
                          </Tabs>
                        </Tab>
                      );
                    })}
                  </Tabs>
                </Tab>
                <Tab
                  heading={i18n.t("text_80")}
                  tabStyle={{ backgroundColor: ThemeColor }}
                  activeTabStyle={{ backgroundColor: ThemeColor }}
                >
                  {getQrCodeLoading ? (
                    <Spinner />
                  ) : (
                    <QRCode
                      qrCodeValue={qrCodeValue}
                      qrTimerValue={qrTimerValue}
                    />
                  )}
                </Tab>
                <Tab
                  heading={i18n.t("text_81")}
                  tabStyle={{ backgroundColor: ThemeColor }}
                  activeTabStyle={{ backgroundColor: ThemeColor }}
                >
                  {companyServiceRateLoading &&
                  customerServiceIsPointLoading ? (
                    <Spinner />
                  ) : customerServiceIsPointData ? (
                    customerServiceOldPointLoading ? (
                      <Spinner />
                    ) : (
                      <Point
                        companyServiceRateData={companyServiceRateData}
                        customerServiceIsPointData={customerServiceIsPointData}
                        customerServiceOldPointData={
                          customerServiceOldPointData
                        }
                        servicePointListData={servicePointListData}
                        selectRateCount={selectRateCount}
                        _handleSendServicePoint={this._handleSendServicePoint}
                        setSelectRateCount={setSelectRateCount}
                      />
                    )
                  ) : servicePointListLoading ? (
                    <Spinner />
                  ) : (
                    <Point
                      companyServiceRateData={companyServiceRateData}
                      customerServiceIsPointData={customerServiceIsPointData}
                      customerServiceOldPointData={customerServiceOldPointData}
                      servicePointListData={servicePointListData}
                      selectRateCount={selectRateCount}
                      _handleSendServicePoint={this._handleSendServicePoint}
                      setSelectRateCount={setSelectRateCount}
                    />
                  )}
                </Tab>
                <Tab
                  heading={i18n.t("text_82")}
                  tabStyle={{ backgroundColor: ThemeColor }}
                  activeTabStyle={{ backgroundColor: ThemeColor }}
                >
                  <ComplaintService
                    setComplaintOptionId={setComplaintOptionId}
                    setDescription={setDescription}
                    getComplaintOptionListLoading={
                      getComplaintOptionListLoading
                    }
                    getComplaintOptionListResult={getComplaintOptionListResult}
                    ComplaintOptionId={ComplaintOptionId}
                    Description={Description}
                    _handlePostServiceComplaint={
                      this._handlePostServiceComplaint
                    }
                  />
                </Tab>
                <Tab
                  heading={i18n.t("text_83")}
                  tabStyle={{ backgroundColor: ThemeColor }}
                  activeTabStyle={{ backgroundColor: ThemeColor }}
                >
                  <CustomerServicePreview
                    styles={styles}
                    servicePreviewDetailLoading={servicePreviewDetailLoading}
                    servicePreviewDetailResult={servicePreviewDetailResult}
                    servicePreviewDetailQuestionLoading={
                      servicePreviewDetailQuestionLoading
                    }
                    servicePreviewDetailQuestionResult={
                      servicePreviewDetailQuestionResult
                    }
                    setInitialTabActivePage={setInitialTabActivePage}
                  />
                </Tab>
              </Tabs>
            ) : null}
          </View>
        </ImageBackground>
      )}
    </Root>
  );
}

CustomerServiceScreen.navigationOptions = {
  header: null
};

export default CustomerServiceScreen;
