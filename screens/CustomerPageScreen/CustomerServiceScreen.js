import React, { Component } from "react";
import { ImageBackground, View, Alert } from "react-native";
import { connect } from "react-redux";
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
  proposalDetailData,
  updateServiceProposal
} from "../../src/actions/serviceService";
import {
  getQrCode,
  getComplaintOptionList
} from "../../src/actions/generalServiceGet";
import { postServiceComplaint } from "../../src/actions/servicePost";

import { Loader } from "../../src/functions";

import Content from "./Components/CustomerService_content";
import Point from "./Components/CustomerService_point";
import ComplaintService from "./Components/CustomerService_complaint";
import CustomerServicePreview from "./Components/CustomerService_preview";
import CustomerServiceHeader from "./Components/CustomerService_header";
import QRCode from "./Components/CustomerService_qrcode";

import styles from "./CustomerService.styles";

class CustomerServiceScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      newProposalRegex: true,
      oldProposalPrice: "0",
      selectedProposalId: 0,
      PAGES: [],
      PAGES_DATA_CATEGORY_INDEX: [],
      activeServicePage: 0,
      initialTabActivePage: 0,
      qrCodeValue: "",
      qrTimerValue: 120,
      selectRateCount: [],
      selectedService: {},
      data: null,
      servicePreviewListResultKeys: [],

      ComplaintOptionId: 0,
      Description: ""
    };
  }

  _handleSetInitialState = (p, v) => {
    this.setState({ [p]: v });
  };

  _handleComponentWillMount = () => {
    const {
      customerServicePreviewData,
      generalServiceGetResponse
    } = this.props;
    const { activeUser } = generalServiceGetResponse;
    if (activeUser.Id == 0) {
      Alert.alert(
        "Uyarı",
        "Öncelikle giriş yapmalısınız",
        [
          {
            text: "Giriş yap",
            onPress: () => this.props.navigation.navigate("Login")
          },
          {
            text: "Anasayfa",
            onPress: () => this.props.navigation.navigate("Home"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }
    customerServicePreviewData(activeUser.Id, 1).then(({ payload }) => {
      if (payload) {
        if (payload.data) {
          const keys = Object.keys(payload.data);
          this.setState({
            servicePreviewListResultKeys: keys
          });
        }
      }
    });
  };

  componentWillMount() {
    this._handleComponentWillMount();
  }

  navigationComponentWillMount = () => {
    this._handleComponentWillMount();
  };

  _handleQrStartTimer = () => {
    this.setState({ qrTimerValue: 120 });
    this.qrStartTimer = setInterval(() => {
      this._handleDecrementQrTimer();
    }, 1000);
  };

  _handleDecrementQrTimer = () => {
    if (this.state.qrTimerValue === 0) {
      clearInterval(this.qrStartTimer);
      this._handleCountDownFinishWithQrCode();
    }
    this.setState(prevState => ({ qrTimerValue: prevState.qrTimerValue - 1 }));
  };

  _handleCountDownFinishWithQrCode = () => {
    this.setState({ initialTabActivePage: 0 });
    Toast.show({
      text:
        "120 saniye içinde QR kod okutulmalıdır. Yeni bir kod talep ediniz.",
      buttonText: "Tamam",
      duration: 3500
    });
  };

  _handleGetQrCodeForMasterApproved = data => {
    const { getQrCode } = this.props;
    getQrCode(data.ID).then(({ payload }) => {
      if (payload) {
        if (payload.request) {
          if (payload.request._response) {
            this.setState({ initialTabActivePage: 1 });
            this.setState({ qrCodeValue: payload.request._response });
            this._handleQrStartTimer();
            return;
          }
        }
      }
      Toast.show({
        text:
          "QR kod oluşturulamadı. Lütfen internet bağlantınızı kontrol ediniz.",
        buttonText: "Tamam",
        duration: 3500
      });
    });
  };

  _handlerPreviewSelectedService = data => {
    this.props.servicePreviewDetailData(data.ID);
    this.props.servicePreviewDetailQuestionData(data.ID);
    this.setState({ initialTabActivePage: 4 });
  };

  onlyNumberRegex = value => {
    this.setState({ oldProposalPrice: value + "" });
    if (value.length == 0) this.setState({ newProposalRegex: true });
    else if (/^(\d*\.)?\d+$/.test(value)) {
      this.setState({ newProposalRegex: true });
    } else this.setState({ newProposalRegex: false });
  };

  _handleSetPoint = data => {
    const {
      companyServiceRateData,
      generalServiceGetResponse,
      customerServiceIsPointData,
      customerServiceOldPointData,
      servicePointListData
    } = this.props;
    const { getLanguageData } = generalServiceGetResponse;

    this.setState({ selectedService: data });

    companyServiceRateData(data.MasterID, getLanguageData.Id).then(
      ({ payload }) => {
        this.setState({ initialTabActivePage: 2 });
      }
    );
    customerServiceIsPointData(data.ID, getLanguageData.Id).then(
      ({ payload }) => {
        if (payload.data) {
          customerServiceOldPointData(data.ID, getLanguageData.Id);
        } else {
          servicePointListData(getLanguageData.Id);
        }
      }
    );
    // companyServiceRateData
  };

  _handleSendServicePoint = () => {
    let countList = [];
    const { selectedService, selectRateCount } = this.state;
    const { sendServicePoint } = this.props;
    for (let i = 0; i < selectRateCount.length; i++) {
      const item = selectRateCount[i];
      countList.push({
        Rate: item.Rate,
        ServiceScoreId: item.ID,
        CompanyId: selectedService.MasterID,
        CustomerServiceId: selectedService.ID
      });
    }

    sendServicePoint(countList).then(({ payload }) => {
      if (payload.data) {
        this.setState({ initialTabActivePage: 0 });
        Toast.show({
          text:
            "Verdiğiniz puanlar çok değerli. Size daha iyi hizmet veriyoruz.",
          buttonText: "Tamam",
          duration: 3500
        });
      } else {
        Toast.show({
          text:
            "İşlem sırasında hata oluştu. İnternet bağlantınızı kontrol ediniz.",
          buttonText: "Tamam",
          duration: 3500
        });
      }
    });
  };

  _handleApprovedService = data => {
    const { approvedService } = this.props;
    Alert.alert(
      "Hizmet onayı",
      "Hizmet onayı verdiğiniz an anlaşma tutarı kasanızdan düşülecek ve ustamıza iletilecektir. Hizmetin başarıyla tamamlandığını onaylıyor musunuz?",
      [
        {
          text: "Hizmet sırasında sorun ile karşılaştım",
          onPress: () => {
            this._handleComplaintService(data);
          },
          style: "cancel"
        },
        {
          text: "Hizmet başarıyla tamamlandı",
          onPress: () => {
            approvedService(data.ID).then(({ payload }) => {
              if (payload) {
                if (payload.data) {
                  Toast.show({
                    text: "Hizmet onaylama işlemi başarılı.",
                    buttonText: "Tamam",
                    duration: 3500
                  });
                  this._handleComponentWillMount();
                  return;
                }
              }
              Toast.show({
                text:
                  "Hizmet onaylama işlemi başarısız. İnternet bağlantınızı kontrol ediniz.",
                buttonText: "Tamam",
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
    const { getComplaintOptionList, generalServiceGetResponse } = this.props;
    const { getLanguageData } = generalServiceGetResponse;
    this.setState({ data: data });
    getComplaintOptionList(getLanguageData.Id).then(({ payload }) => {
      if (payload) {
        if (payload.data) {
          this.setState({
            initialTabActivePage: 3,
            ComplaintOptionId: 0,
            Description: ""
          });
          return;
        }
      }
      Toast.show({
        text:
          "İşlem sırasında bir hata oluştu. İnternet bağlantınızı kontrol ediniz.",
        buttonText: "Tamam",
        duration: 3500
      });
    });
  };

  _handlePostServiceComplaint = () => {
    const { ComplaintOptionId, Description, data } = this.state;
    if (ComplaintOptionId === 0) {
      Toast.show({
        text: "Şikayet konusu seçiniz.",
        buttonText: "Tamam",
        duration: 3500
      });
      return;
    }
    if (Description.length <= 30 || Description.length >= 1000) {
      Toast.show({
        text: "Şikayet metniniz 30 ile 1000 karakter arasında olmalıdır.",
        buttonText: "Tamam",
        duration: 3500
      });
      return;
    }
    const { postServiceComplaint, generalServiceGetResponse } = this.props;
    const { activeUser, getSiteData } = generalServiceGetResponse;
    const complaintModel = {
      ComplaintOptionId: ComplaintOptionId,
      Description: Description,
      CustomerServiceID: data.ID,
      CompanyUserID: data.MasterID,
      UserID: activeUser.Id,
      SiteID: getSiteData.Id
    };
    postServiceComplaint(complaintModel).then(({ payload }) => {
      if (payload) {
        if (payload.request) {
          if (payload.request._response) {
            if (payload.request._response === "success") {
              Toast.show({
                text:
                  "Şikayetiniz iletildi. En kısa zamanda sizin ile iletişime geçeceğiz.",
                buttonText: "Tamam",
                duration: 3500
              });
              this.setState({
                initialTabActivePage: 0,
                ComplaintOptionId: 0,
                Description: ""
              });
              return;
            } else {
              Toast.show({
                text:
                  "Şikayet iletilemedi. İnternet bağlantınızı kontrol ediniz.",
                buttonText: "Tamam",
                duration: 3500
              });
              return;
            }
          }
        }
      }
      Toast.show({
        text: "Şikayet iletilemedi. İnternet bağlantınızı kontrol ediniz.",
        buttonText: "Tamam",
        duration: 3500
      });
    });
  };

  _handleCancelService = data => {
    const { cancelService } = this.props;
    Alert.alert(
      "Uyarı",
      "Hizmeti iptal etmek istediğinize emin misiniz?",
      [
        {
          text: "Hayır",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "Evet",
          onPress: () => {
            cancelService(data.ID).then(({ payload }) => {
              if (payload) {
                if (payload.data) {
                  Toast.show({
                    text: "İptal işlemi başarılı.",
                    buttonText: "Tamam",
                    duration: 3500
                  });
                  this._handleComponentWillMount();
                  return;
                }
              }
              Toast.show({
                text:
                  "İptal işlemi başarısız. İnternet bağlantınızı kontrol ediniz.",
                buttonText: "Tamam",
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
          <TabHeading>
            <Icon name="ios-clipboard" />
            <Text>Gelen Teklifler</Text>
          </TabHeading>
        );
      case "2#Tamamlanmayı Bekleyenler":
        return (
          <TabHeading>
            <Icon name="ios-filing" />
            <Text>Tamamlanmayı Bekleyenler</Text>
          </TabHeading>
        );
      case "3#Onay Bekleyenler":
        return (
          <TabHeading>
            <Icon name="ios-checkmark" />
            <Text>Onay Bekleyenler</Text>
          </TabHeading>
        );
      case "4#Gelen Teklifler":
        return (
          <TabHeading>
            <Icon name="ios-information" />
            <Text>Gelen Teklifler</Text>
          </TabHeading>
        );
      case "5#İptal Edilenler":
        return (
          <TabHeading>
            <Icon name="ios-close" />
            <Text>İptal Edilenler</Text>
          </TabHeading>
        );
      case "6#Bekleyenler":
        return (
          <TabHeading>
            <Icon name="ios-clock" />
            <Text>Bekleyenler</Text>
          </TabHeading>
        );
      default:
        return (
          <TabHeading>
            <Icon name="ios-sync" />
            <Text>Tamamlananlar</Text>
          </TabHeading>
        );
    }
  };

  render() {
    const {
      customerDetailServiceResponse,
      companyDetailServiceResponse,
      navigation,
      generalServiceGetResponse
    } = this.props;
    const {
      servicePreviewDetailQuestionLoading,
      servicePreviewDetailQuestionResult,
      customerServicePreviewLoading,
      servicePreviewListResult
    } = customerDetailServiceResponse;
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
    } = companyDetailServiceResponse;
    const {
      getQrCodeLoading,
      getComplaintOptionListResult,
      getComplaintOptionListLoading
    } = generalServiceGetResponse;

    const {
      initialTabActivePage,
      qrCodeValue,
      qrTimerValue,
      selectRateCount,

      ComplaintOptionId,
      Description,
      servicePreviewListResultKeys
    } = this.state;

    return (
      <Root>
        {customerServicePreviewLoading ? <Loader /> : null}
        <NavigationEvents
          onDidFocus={() => this.navigationComponentWillMount()}
        />
        <CustomerServiceHeader
          initialTabActivePage={initialTabActivePage}
          navigation={navigation}
          _handleSetInitialState={this._handleSetInitialState}
        />
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
                  heading="Hizmet Listesi"
                  style={{ backgroundColor: "transparent" }}
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
                <Tab heading="Qr Code">
                  {getQrCodeLoading ? (
                    <Spinner />
                  ) : (
                    <QRCode
                      qrCodeValue={qrCodeValue}
                      qrTimerValue={qrTimerValue}
                    />
                  )}
                </Tab>
                <Tab heading="Puan Ver">
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
                        _handleSetInitialState={this._handleSetInitialState}
                        selectRateCount={selectRateCount}
                        _handleSendServicePoint={this._handleSendServicePoint}
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
                      _handleSetInitialState={this._handleSetInitialState}
                      selectRateCount={selectRateCount}
                      _handleSendServicePoint={this._handleSendServicePoint}
                    />
                  )}
                </Tab>
                <Tab heading="Şikayet Et">
                  <ComplaintService
                    _handleSetInitialState={this._handleSetInitialState}
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
                <Tab heading="Hizmet Önizleme">
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
                    _handleSetInitialState={this._handleSetInitialState}
                  />
                </Tab>
              </Tabs>
            ) : null}
          </View>
        </ImageBackground>
      </Root>
    );
  }
}

const mapStateToProps = ({
  generalServiceGetResponse,
  customerDetailServiceResponse,
  companyDetailServiceResponse,
  serviceServiceResponse,
  servicePostResponse
}) => ({
  generalServiceGetResponse,
  customerDetailServiceResponse,
  companyDetailServiceResponse,
  serviceServiceResponse,
  servicePostResponse
});

const mapDispatchToProps = {
  customerServicePreviewData,
  servicePreviewDetailData,
  servicePreviewDetailQuestionData,
  proposalDetailData,
  updateServiceProposal,
  getQrCode,
  companyServiceRateData,
  customerServiceIsPointData,
  customerServiceOldPointData,
  servicePointListData,
  sendServicePoint,
  approvedService,
  getComplaintOptionList,
  postServiceComplaint,
  cancelService
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerServiceScreen);
