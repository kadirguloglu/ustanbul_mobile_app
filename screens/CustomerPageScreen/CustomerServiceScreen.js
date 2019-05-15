import React, { Component } from "react";
import {
  StyleSheet,
  ListView,
  Text,
  ScrollView,
  ImageBackground,
  View
} from "react-native";
import { connect } from "react-redux";
import {
  customerServicePreviewData,
  servicePreviewDetailQuestionData
} from "../../src/actions/customerDetailService";
import { servicePreviewDetailData } from "../../src/actions/companyDetailService";
import {
  proposalDetailData,
  updateServiceProposal
} from "../../src/actions/serviceService";
import {
  Root,
  Spinner,
  Header,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Title,
  Tabs,
  Tab,
  TabHeading,
  ScrollableTab
} from "native-base";
import { ThemeColor, MyToast } from "../../src/functions";
//import { ViewPager } from "rn-viewpager";
import { BlurView } from "react-native-blur";
import Dialog from "react-native-dialog";
import moment from "moment";
import Modal from "react-native-modal";
import MyButton from "../../components/MyButton";
import { Icon as ExpoIcon } from "expo";

class CustomerServiceScreen extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      activeTab: 0,
      getToast: false,
      fabActive: false,
      iconIsText: false,
      modalIsVisible: false,
      dialogVisible: false,
      newProposalRegex: true,
      oldProposalPrice: "0",
      selectedProposalId: 0,
      PAGES: [],
      PAGES_DATA_CATEGORY_INDEX: []
    };
  }
  componentWillMount() {
    this.props
      .customerServicePreviewData(
        this.props.generalServiceGetResponse.activeUser.Id,
        1
      )
      .then(({ payload }) => {
        let sayac = 0;
        let PAGES = [];
        let PAGES_DATA_CATEGORY_INDEX = [];
        const keys = Object.keys(payload.data);
        for (let index = 0; index < keys.length; index++) {
          const element = payload.data[keys[index]];
          for (let valueIndex = 0; valueIndex < element.length; valueIndex++) {
            const item = element[valueIndex];
            PAGES.push(sayac);
            PAGES_DATA_CATEGORY_INDEX.push({
              index: sayac,
              categoryIndex: index,
              dataIndex: valueIndex
            });
            sayac++;
          }
        }
        this.setState({ PAGES_DATA_CATEGORY_INDEX: PAGES_DATA_CATEGORY_INDEX });
        this.setState({ PAGES: PAGES });
      });
  }
  handlerUpdateServiceProposal = (item, data) => {
    this.setState({ selectedProposalId: data.ProposalID });
    this.props.proposalDetailData(data.ProposalID).then(({ payload }) => {
      if (this.props.serviceServiceResponse.proposalDetailLoading == false) {
        this.setState({
          oldProposalPrice:
            this.props.serviceServiceResponse.proposalDetailResult.Price + ""
        });
        this.setState({ dialogVisible: true });
      }
    });
  };
  renderViewPagerPage = page => {
    const {
      servicePreviewListResult
    } = this.props.customerDetailServiceResponse;
    if (servicePreviewListResult) {
      const { dataIndex, categoryIndex } = this.state.PAGES_DATA_CATEGORY_INDEX[
        page
      ];
      const key = Object.keys(servicePreviewListResult)[categoryIndex];
      let item = servicePreviewListResult[key];
      let data = item[dataIndex];
      const element = (
        <View
          key={"Service" + page}
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            backgroundColor: "transparent"
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                padding: 10,
                textAlign: "center",
                color: "white",
                borderBottomColor: "white",
                borderBottomWidth: 1
              }}
            >
              {key.substr(2)}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              margin: 10,
              borderRadius: 5,
              padding: 10
            }}
          >
            <Text style={{ fontSize: 15, textAlign: "center" }}>
              {data.CategoryName}
            </Text>
            <Text
              style={{
                fontSize: 13,
                textAlign: "center",
                borderBottomColor: "white",
                borderBottomWidth: 1
              }}
            >
              {moment(data.CreateDate).format("DD MMMM YYYY, dddd hh:mm")}
            </Text>
            {key.indexOf("1#") > -1 ? (
              <View>
                <Button
                  full
                  style={styles.buttonStyle}
                  onPress={() =>
                    this.props.navigation.navigate("SeeProposal", {
                      item: item,
                      data: data
                    })
                  }
                >
                  <Text style={styles.iconText}>Teklifleri gör</Text>
                </Button>
                <Button
                  full
                  style={styles.buttonStyle}
                  onPress={() => this.handlerPreviewSelectedService(item, data)}
                >
                  <Text style={styles.iconText}>İncele</Text>
                </Button>
                <Button
                  full
                  style={styles.buttonStyle}
                  onPress={() => this.handlerPreviewSelectedService(item, data)}
                >
                  <Text style={styles.iconText}>İptal et</Text>
                </Button>
              </View>
            ) : key.indexOf("2#") > -1 ? (
              <View>
                <Button
                  full
                  style={styles.buttonStyle}
                  onPress={() => this.handlerPreviewSelectedService(item, data)}
                >
                  <Text style={styles.iconText}>
                    Usta onayı için QR oluştur
                  </Text>
                </Button>
                <Button
                  full
                  style={styles.buttonStyle}
                  onPress={() => this.handlerPreviewSelectedService(item, data)}
                >
                  <Text style={styles.iconText}>İncele</Text>
                </Button>
                <Button
                  full
                  style={styles.buttonStyle}
                  onPress={() => this.handlerPreviewSelectedService(item, data)}
                >
                  <Text style={styles.iconText}>İptal Et</Text>
                </Button>
              </View>
            ) : key.indexOf("3#") > -1 ? (
              <View>
                <Button
                  full
                  style={styles.buttonStyle}
                  onPress={() => this.handlerPreviewSelectedService(item, data)}
                >
                  <Text style={styles.iconText}>Hizmeti onayla</Text>
                </Button>
                <Button
                  full
                  style={styles.buttonStyle}
                  onPress={() => this.handlerPreviewSelectedService(item, data)}
                >
                  <Text style={styles.iconText}>İncele</Text>
                </Button>
                <Button
                  full
                  style={styles.buttonStyle}
                  onPress={() => this.handlerPreviewSelectedService(item, data)}
                >
                  <Text style={styles.iconText}>Şikayet et</Text>
                </Button>
              </View>
            ) : key.indexOf("4#") > -1 ? (
              <View>
                <Button
                  full
                  style={styles.buttonStyle}
                  onPress={() => this.handlerPreviewSelectedService(item, data)}
                >
                  <Text style={styles.iconText}>Puan ver</Text>
                </Button>
                <Button
                  full
                  style={styles.buttonStyle}
                  onPress={() => this.handlerPreviewSelectedService(item, data)}
                >
                  <Text style={styles.iconText}>İncele</Text>
                </Button>
              </View>
            ) : key.indexOf("5#") > -1 ? (
              <Button
                full
                style={styles.buttonStyle}
                onPress={() => this.handlerPreviewSelectedService(item, data)}
              >
                <Text style={styles.iconText}>İncele</Text>
              </Button>
            ) : key.indexOf("6#") > -1 ? (
              <View>
                <Button
                  full
                  style={styles.buttonStyle}
                  onPress={() => this.handlerPreviewSelectedService(item, data)}
                >
                  <Text style={styles.iconText}>Teklifleri gör</Text>
                </Button>
                <Button
                  full
                  style={styles.buttonStyle}
                  onPress={() => this.handlerPreviewSelectedService(item, data)}
                >
                  <Text style={styles.iconText}>İncele</Text>
                </Button>
                <Button
                  full
                  style={styles.buttonStyle}
                  onPress={() => this.handlerPreviewSelectedService(item, data)}
                >
                  <Text style={styles.iconText}>İptal et</Text>
                </Button>
              </View>
            ) : null}
          </View>
        </View>
      );
      return element;
    }
  };
  handlerPreviewSelectedService = (item, data) => {
    this.props.servicePreviewDetailData(data.ID);
    this.props.servicePreviewDetailQuestionData(data.ID);
    this.setState({ modalIsVisible: true });
  };
  onlyNumberRegex = value => {
    this.setState({ oldProposalPrice: value + "" });
    if (value.length == 0) this.setState({ newProposalRegex: true });
    else if (/^(\d*\.)?\d+$/.test(value)) {
      this.setState({ newProposalRegex: true });
    } else this.setState({ newProposalRegex: false });
  };
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
  handleUpdateProposal = () => {
    if (this.state.newProposalRegex == false) {
      MyToast("Teklifinizi kontrol ediniz");
      return;
    }
    this.props
      .updateServiceProposal(
        this.state.oldProposalPrice,
        this.state.selectedProposalId
      )
      .then(({ payload }) => {
        if (this.props.serviceServiceResponse.proposalDetailLoading == false) {
          let lst;
          if (
            this.props.updateServiceProposalResult.UpdateServiceProposalResult
          ) {
            lst = this.props.updateServiceProposalResult
              .UpdateServiceProposalResult;
          } else {
            lst = this.props.updateServiceProposalResult;
          }
          switch (lst) {
            case "success":
              MyToast("Teklifiniz güncellendi.");
              break;
            case "error":
              MyToast(
                "Teklifiniz güncellenirken hata oluştu. Tekrar deneyiniz."
              );
              break;
            default:
              break;
          }
        }
      });
    this.setState({ dialogVisible: false });
  };

  render() {
    const {
      servicePreviewDetailQuestionLoading,
      servicePreviewDetailQuestionResult,
      customerServicePreviewLoading
    } = this.props.customerDetailServiceResponse;
    const {
      servicePreviewDetailLoading,
      servicePreviewDetailResult
    } = this.props.companyDetailServiceResponse;
    if (customerServicePreviewLoading)
      return (
        <Root>
          <Spinner />
        </Root>
      );
    const blurComponentIOS = (
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="xlight"
        blurAmount={50}
      />
    );
    return (
      <Root>
        <Modal isVisible={this.state.modalIsVisible}>
          <ScrollView>
            <View style={{ backgroundColor: "white", padding: 10 }}>
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
                  <Text style={styles.ServicePreviewItemText}>
                    Garantörlü mü?
                  </Text>
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
                    {servicePreviewDetailResult.IsMasterApproved
                      ? "evet"
                      : "hayir"}
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
                press={() => this.setState({ modalIsVisible: false })}
                text="Kapat"
              />
            </View>
          </ScrollView>
        </Modal>
        <Dialog.Container
          visible={this.state.dialogVisible}
          blurComponentIOS={blurComponentIOS}
        >
          <Dialog.Title>Teklif Güncelleme</Dialog.Title>
          <Dialog.Description>
            {!this.state.newProposalRegex
              ? "Yeni teklifinizi yazınız. Sayısal Değer Giriniz"
              : "Yeni teklifinizi yazınız."}
          </Dialog.Description>
          <Dialog.Input
            onChangeText={value => this.onlyNumberRegex(value)}
            value={this.state.oldProposalPrice}
          />
          <Dialog.Button label="İptal et" onPress={() => this.handleCancel()} />
          <Dialog.Button
            label="Teklifi güncelle"
            onPress={() => this.handleUpdateProposal()}
          />
        </Dialog.Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.toggleDrawer()}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Hizmetlerim</Title>
          </Body>
          <Right />
        </Header>
        <ImageBackground
          style={{
            flex: 1
          }}
          source={require("../../assets/splash-screen-demo.png")}
        >
          <View style={{ flex: 1 }}>
            <Tabs
              renderTabBar={() => <View />}
              style={{ backgroundColor: "transparent" }}
            >
              {this.state.PAGES.map((page, ix) => (
                <Tab
                  key={"ViewPagerContent-" + page}
                  heading={"heading" + ix}
                  style={{ backgroundColor: "transparent" }}
                >
                  {this.renderViewPagerPage(page)}
                </Tab>
              ))}
            </Tabs>
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
  serviceServiceResponse
}) => ({
  generalServiceGetResponse,
  customerDetailServiceResponse,
  companyDetailServiceResponse,
  serviceServiceResponse
});

const mapDispatchToProps = {
  customerServicePreviewData,
  servicePreviewDetailData,
  servicePreviewDetailQuestionData,
  proposalDetailData,
  updateServiceProposal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerServiceScreen);

const styles = StyleSheet.create({
  iconText: {
    fontSize: 18,
    color: "white"
  },
  buttonStyle: {
    backgroundColor: ThemeColor,
    margin: 10,
    borderRadius: 5
  },
  ServicePreviewItemText: {
    textAlign: "center",
    fontSize: 15
  },
  ServicePreviewItemTextAnswer: {
    marginBottom: 2,
    borderBottomColor: ThemeColor,
    borderBottomWidth: 1
  }
});
