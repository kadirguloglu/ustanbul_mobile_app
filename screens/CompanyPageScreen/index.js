import React, { Component } from "react";
import {
  StyleSheet,
  ListView,
  ImageBackground,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
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
  Toast,
  Container,
  Text,
  View
} from "native-base";
import Dialog from "react-native-dialog";
import { Permissions } from "expo";

import { ThemeColor } from "../../src/functions";
import { servicePreviewDetailQuestionData } from "../../src/actions/customerDetailService";
import {
  servicePreviewDetailData,
  companyServicePreviewData
} from "../../src/actions/companyDetailService";
import {
  proposalDetailData,
  updateServiceProposal
} from "../../src/actions/serviceService";
import PagerPageContent from "./Components/CompanyServiceScreen_pagerPageContent";
import ModalDialog from "./Components/CompanyServiceScreen_modalDialog";
import ApprovedServiceWithQr from "./Components/CompanyServiceScreen_approved_service_with_qr";

class CompanyServiceScreen extends Component {
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
      PAGES_DATA_CATEGORY_INDEX: [],
      blurViewRef: null,
      activeServicePage: 0,
      initialTabPage: 0,
      hasCameraPermission: null,
      scanned: true
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  setInitialState = (p, v) => {
    this.setState({ [p]: v });
  };

  componentWillMount() {
    const { generalServiceGetResponse } = this.props;
    const { activeUser } = generalServiceGetResponse;
    this.props
      .companyServicePreviewData(activeUser.Id, 1)
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
    const { proposalDetailData } = this.props;
    this.setState({ selectedProposalId: data.ProposalID });
    proposalDetailData(data.ProposalID).then(({ payload }) => {
      this.setState({
        oldProposalPrice: payload.data.Price + ""
      });
      this.setState({ dialogVisible: true });
    });
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
    const {
      newProposalRegex,
      oldProposalPrice,
      selectedProposalId
    } = this.state;
    const { serviceServiceResponse } = this.props;
    const {
      proposalDetailLoading,
      updateServiceProposalResult
    } = serviceServiceResponse;
    if (newProposalRegex == false) {
      Toast.show({
        text: "Teklifinizi kontrol ediniz.",
        buttonText: "Tamam",
        duration: 2500
      });
      return;
    }
    this.props
      .updateServiceProposal(oldProposalPrice, selectedProposalId)
      .then(({ payload }) => {
        switch (payload.status) {
          case 200:
            Toast.show({
              text: "Teklifiniz güncellendi.",
              buttonText: "Tamam",
              duration: 2500
            });
            break;
          default:
            Toast.show({
              text: "Teklifiniz güncellenirken hata oluştu. Tekrar deneyiniz.",
              buttonText: "Tamam",
              duration: 2500
            });
            break;
        }
      });
    this.setState({ dialogVisible: false });
  };

  _handleApprovedService = data => {
    this.setState({ initialTabPage: 1 });
    this.setState({ scanned: false });
  };

  _handleBarCodeScanned = ({ type, data }) => {
    this.setState({ initialTabPage: 0 });
    this.setState({ scanned: true });
    const { scanned } = this.state;
    if (!scanned) {
      console.log("LOG: -------------------------------------------------");
      console.log("LOG: _handleBarCodeScanned -> type,data", type, data);
      console.log("LOG: -------------------------------------------------");
    }
  };

  render() {
    const { companyDetailServiceResponse, navigation } = this.props;
    const {
      servicePreviewDetailQuestionLoading,
      servicePreviewDetailQuestionResult
    } = this.props.customerDetailServiceResponse;
    const {
      servicePreviewDetailLoading,
      servicePreviewDetailResult
    } = companyDetailServiceResponse;
    const {
      PAGES_DATA_CATEGORY_INDEX,
      newProposalRegex,
      PAGES,
      modalIsVisible,
      dialogVisible,
      activeServicePage,
      initialTabPage,
      hasCameraPermission,
      scanned
    } = this.state;

    if (servicePreviewDetailLoading) {
      return (
        <Root>
          <Spinner />
        </Root>
      );
    }
    return (
      <Root>
        <Container>
          <ModalDialog
            modalIsVisible={modalIsVisible}
            styles={styles}
            servicePreviewDetailLoading={servicePreviewDetailLoading}
            servicePreviewDetailResult={servicePreviewDetailResult}
            servicePreviewDetailQuestionLoading={
              servicePreviewDetailQuestionLoading
            }
            servicePreviewDetailQuestionResult={
              servicePreviewDetailQuestionResult
            }
            setInitialState={this.setInitialState}
          />
          <Dialog.Container visible={dialogVisible}>
            <Dialog.Title>Teklif Güncelleme</Dialog.Title>
            <Dialog.Description>
              {!newProposalRegex
                ? "Yeni teklifinizi yazınız. Sayısal Değer Giriniz"
                : "Yeni teklifinizi yazınız."}
            </Dialog.Description>
            <Dialog.Input
              onChangeText={value => this.onlyNumberRegex(value)}
              value={this.state.oldProposalPrice}
            />
            <Dialog.Button
              label="İptal et"
              onPress={() => this.handleCancel()}
            />
            <Dialog.Button
              label="Teklifi güncelle"
              onPress={() => this.handleUpdateProposal()}
            />
          </Dialog.Container>
          <Header>
            <Left>
              <Button transparent onPress={() => navigation.toggleDrawer()}>
                <Icon name="ios-menu" />
              </Button>
            </Left>
            <Body>
              <Title>Hizmetlerim</Title>
            </Body>
            <Right />
          </Header>

          <View style={styles.view3}>
            <Tabs
              renderTabBar={() => <View />}
              locked={true}
              page={initialTabPage}
              style={styles.tabs1}
            >
              <Tab heading="Hizmet listesi" style={styles.tab1}>
                <ImageBackground
                  style={styles.imageBackground1}
                  source={require("../../assets/splash-screen-demo.png")}
                >
                  <Tabs
                    renderTabBar={() => <View />}
                    style={styles.tabs1}
                    onChangeTab={value =>
                      this.setState({ activeServicePage: value.i })
                    }
                    page={activeServicePage}
                  >
                    {PAGES.map((page, ix) => (
                      <Tab
                        key={"ViewPagerContent-" + page}
                        heading={"heading" + ix}
                        style={styles.tab1}
                      >
                        <PagerPageContent
                          page={page}
                          PAGES_DATA_CATEGORY_INDEX={PAGES_DATA_CATEGORY_INDEX}
                          companyDetailServiceResponse={
                            companyDetailServiceResponse
                          }
                          handlerPreviewSelectedService={
                            this.handlerPreviewSelectedService
                          }
                          styles={styles}
                          handlerUpdateServiceProposal={
                            this.handlerUpdateServiceProposal
                          }
                          _handleApprovedService={this._handleApprovedService}
                        />
                      </Tab>
                    ))}
                  </Tabs>
                </ImageBackground>

                <View style={styles.dotAbsoluteBlock}>
                  <View style={styles.dotTextBlock}>
                    {PAGES.map((page, ix) => (
                      <TouchableHighlight
                        key={"dot-" + ix}
                        onPress={() => this.setState({ activeServicePage: ix })}
                      >
                        <Text
                          style={[
                            styles.dotText,
                            activeServicePage == ix
                              ? { color: ThemeColor }
                              : null
                          ]}
                        >
                          .
                        </Text>
                      </TouchableHighlight>
                    ))}
                  </View>
                </View>
              </Tab>
              <Tab heading="QR ile hizmet onaylama">
                <ApprovedServiceWithQr
                  hasCameraPermission={hasCameraPermission}
                  _handleBarCodeScanned={this._handleBarCodeScanned}
                  scanned={scanned}
                />
              </Tab>
            </Tabs>
          </View>
        </Container>
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
  companyServicePreviewData,
  servicePreviewDetailData,
  servicePreviewDetailQuestionData,
  proposalDetailData,
  updateServiceProposal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyServiceScreen);

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
  },
  view1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "transparent"
  },
  view2: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 5,
    padding: 10
  },
  view3: { flex: 1 },
  view4: { backgroundColor: "white", padding: 10 },
  text1: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1
  },
  text2: { fontSize: 15, textAlign: "center" },
  text3: {
    fontSize: 13,
    textAlign: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1
  },
  imageBackground1: {
    flex: 1
  },
  tabs1: { backgroundColor: "transparent" },
  tab1: { backgroundColor: "transparent" },
  dotAbsoluteBlock: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  },
  dotTextBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  dotText: { fontSize: 50, fontWeight: "bold", color: "white" }
});
