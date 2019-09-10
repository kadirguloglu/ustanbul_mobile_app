import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Title,
  Tab,
  Tabs,
  Root,
  Spinner,
  Body,
  View,
  Toast
} from "native-base";
import { NavigationEvents } from "react-navigation";
import { ScrollView, Keyboard, Alert } from "react-native";

import i18n from "../../constants/strings";

import {
  getServiceCompanyPage,
  getMasterServiceProposalQuestionPage,
  sendServiceProposal
} from "../../src/actions/serviceService";
import SeeServiceContent from "./Components/SeeServiceScreen_content";
import ServiceDetail from "./Components/ServiceDetail_content";
import SendProposal from "./Components/SendProposal_content";

class SeeServiceScreen extends Component {
  // static navigationOptions = {
  //   header: null
  // };
  constructor(props) {
    super(props);
    this.state = {
      tabActivePage: 0,
      tabProposalSendActivePage: 0,
      proposalModel: {}
    };
  }

  _handleSetInitialState = (p, v) => {
    this.setState({ [p]: v });
  };

  _handleComponentWillMount = () => {
    const { generalServiceGetResponse } = this.props;
    const { activeUser } = generalServiceGetResponse;
    if (activeUser.Id == 0) {
      Alert.alert(
        i18n.t("text_51"),
        i18n.t("text_52"),
        [
          {
            text: i18n.t("giris_yap"),
            onPress: () => this.props.navigation.navigate("Login")
          },
          {
            text: i18n.t("anasayfa"),
            onPress: () => this.props.navigation.navigate("Home"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }
    this.props.getServiceCompanyPage(activeUser.Id, 1, 999);
  };

  componentWillMount() {
    this._handleComponentWillMount();
  }

  navigationComponentWillMount = () => {
    this._handleComponentWillMount();
  };

  _handleServiceDetail = service => {
    this.setState({ service: service });
    this.setState({ tabActivePage: 1 });
  };

  _handleSendProposal = () => {
    const {
      getMasterServiceProposalQuestionPage,
      generalServiceGetResponse
    } = this.props;
    const { activeUser } = generalServiceGetResponse;
    const { service } = this.state;
    this.setState({ proposalModel: {} });
    getMasterServiceProposalQuestionPage(service.CategoryID, 1, 1).then(
      ({ payload }) => {
        if (payload) {
          if (payload.data) {
            let Questions = [];
            for (let i = 0; i < payload.data.length; i++) {
              const item = payload.data[i];
              let quest = { Answers: [] };
              for (let p = 0; p < item.Answers.length; p++) {
                const itemAnswer = item.Answers[p];
                quest.Answers.push({ Answer: "" });
              }
              Questions.push(quest);
            }
            this.setState({
              proposalModel: {
                Questions: Questions,
                Price: "",
                UserID: activeUser.Id,
                CustomerServiceId: service.ID,
                CategoryID: service.CategoryID
              }
            });
            this.setState({ tabActivePage: 2 });
          }
        }
      }
    );
  };

  validateProposalForm = () => {
    Keyboard.dismiss();
    const { serviceServiceResponse } = this.props;
    const { masterServiceProposalQuestionPageData } = serviceServiceResponse;
    const { proposalModel } = this.state;

    let errorMessage = "";
    let lastIndex = 0;
    try {
      if (proposalModel.Price) {
        if (proposalModel.Price === "") {
          this.setState({ tabProposalSendActivePage: 0 });
          Toast.show({
            text: i18n.t("text_164"),
            buttonText: i18n.t("text_6"),
            duration: 2500
          });
          return false;
        }
        if (parseInt(proposalModel.Price) < 1) {
          this.setState({ tabProposalSendActivePage: 0 });
          Toast.show({
            text: i18n.t("text_164"),
            buttonText: i18n.t("text_6"),
            duration: 2500
          });
          return false;
        }
      } else {
        this.setState({ tabProposalSendActivePage: 0 });
        Toast.show({
          text: i18n.t("text_164"),
          buttonText: i18n.t("text_6"),
          duration: 2500
        });
        return false;
      }

      for (let i = 0; i < masterServiceProposalQuestionPageData.length; i++) {
        const item = masterServiceProposalQuestionPageData[i];
        const quest = proposalModel.Questions[i];
        lastIndex = i;

        if (item.QuestionType === 1) {
          if (
            item.QuestionMaxValue <= quest.Answers[0].Answer.length ||
            item.QuestionMinValue > quest.Answers[0].Answer.length
          ) {
            errorMessage = i18n.t("text_165");
            break;
          }
          if (item.IsRequired) {
            if (quest.Answers[0].Answer.length < 1) {
              errorMessage = i18n.t("text_166");
              break;
            }
          }
        }
        if (item.QuestionType === 2) {
          if (
            item.QuestionMaxValue <=
              parseInt(
                quest.Answers[0].Answer === "" ? 0 : quest.Answers[0].Answer
              ) ||
            item.QuestionMinValue >
              parseInt(
                quest.Answers[0].Answer === "" ? 0 : quest.Answers[0].Answer
              )
          ) {
            errorMessage = i18n.t("text_165");
            break;
          }
          if (item.IsRequired) {
            if (quest.Answers[0].Answer === "") {
              errorMessage = i18n.t("text_166");
              break;
            }
          }
        }
        if (item.QuestionType === 3) {
          if (item.IsRequired) {
            if (quest.Answers[0].Answer === "") {
              errorMessage = i18n.t("text_166");
              break;
            }
          }
        }
        if (item.QuestionType === 4) {
          if (item.IsRequired) {
            if (!quest.Answers[0].ID) {
              errorMessage = i18n.t("text_39");
              break;
            }
          }
        }
        if (item.QuestionType === 5) {
          const checkedList = quest.Answers.filter(ans => ans.Checked === true);
          if (item.IsRequired) {
            if (!checkedList) {
              errorMessage = i18n.t("text_166");
              break;
            }
            if (checkedList) {
              if (checkedList.length) {
                if (checkedList.length < 1) {
                  errorMessage = i18n.t("text_166");
                  break;
                }
              }
            }
          }
          if (checkedList) {
            if (
              item.QuestionMaxValue < checkedList.length ||
              item.QuestionMinValue > checkedList.length
            ) {
              errorMessage = i18n.t("text_167");
              break;
            }
          }
        }
      }
    } catch (error) {
      this.setState({ tabProposalSendActivePage: 0 });
      Toast.show({
        text: i18n.t("text_168"),
        buttonText: i18n.t("text_6"),
        duration: 2500
      });
      return false;
    }

    if (errorMessage !== "") {
      this.setState({ tabProposalSendActivePage: lastIndex + 1 });
      Toast.show({
        text: errorMessage,
        buttonText: i18n.t("text_6"),
        duration: 2500
      });
      return false;
    }

    return true;
  };

  _handleSendNewProposal = () => {
    if (this.validateProposalForm()) {
      const { proposalModel } = this.state;
      const { sendServiceProposal, generalServiceGetResponse } = this.props;
      sendServiceProposal(proposalModel).then(({ payload }) => {
        switch (payload.data) {
          case 1:
            this.setState({ tabActivePage: 0 });
            Toast.show({
              text: i18n.t("text_169"),
              buttonText: i18n.t("text_6"),
              duration: 4500
            });
            const { activeUser } = generalServiceGetResponse;
            this.props
              .getServiceCompanyPage(activeUser.Id, 1, 999)
              .then(() => {});
            break;
          default:
            Toast.show({
              text: i18n.t("text_170"),
              buttonText: i18n.t("text_6"),
              duration: 2500
            });
            break;
        }
      });
    }
  };

  render() {
    const { serviceServiceResponse, navigation } = this.props;
    const {
      serviceCompanyPageData,
      serviceCompanyPageLoading,
      masterServiceProposalQuestionPageLoading,
      masterServiceProposalQuestionPageData,
      serviceSendProposalLoading
    } = serviceServiceResponse;
    const {
      tabActivePage,
      service,
      tabProposalSendActivePage,
      proposalModel
    } = this.state;
    return (
      <Container>
        <NavigationEvents
          onDidFocus={() => this.navigationComponentWillMount()}
        />
        <Header>
          <Left>
            {tabActivePage === 0 ? (
              <Button transparent onPress={() => navigation.toggleDrawer()}>
                <Icon name="ios-menu" />
              </Button>
            ) : tabActivePage === 1 ? (
              <Button
                transparent
                onPress={() => this.setState({ tabActivePage: 0 })}
              >
                <Icon name="ios-arrow-back" />
              </Button>
            ) : tabProposalSendActivePage === 0 ? (
              <Button
                transparent
                onPress={() => this.setState({ tabActivePage: 1 })}
              >
                <Icon name="ios-arrow-back" />
              </Button>
            ) : (
              <Button
                transparent
                onPress={() =>
                  this._handleSetInitialState(
                    "tabProposalSendActivePage",
                    tabProposalSendActivePage - 1
                  )
                }
              >
                <Icon name="ios-arrow-back" />
              </Button>
            )}
          </Left>
          <Body>
            <Title>{i18n.t("teklif_ver_para_kazan")}</Title>
          </Body>
        </Header>
        <Tabs locked={true} renderTabBar={() => <View />} page={tabActivePage}>
          <Tab heading={i18n.t("text_171")}>
            {serviceCompanyPageLoading ? (
              <Spinner />
            ) : (
              <ScrollView>
                <SeeServiceContent
                  serviceCompanyPageData={serviceCompanyPageData.Data}
                  _handleServiceDetail={this._handleServiceDetail}
                />
              </ScrollView>
            )}
          </Tab>
          <Tab heading={i18n.t("text_172")}>
            <ServiceDetail
              service={service}
              _handleSendProposal={this._handleSendProposal}
              masterServiceProposalQuestionPageLoading={
                masterServiceProposalQuestionPageLoading
              }
            />
          </Tab>
          <Tab heading={i18n.t("text_173")}>
            <SendProposal
              masterServiceProposalQuestionPageLoading={
                masterServiceProposalQuestionPageLoading
              }
              masterServiceProposalQuestionPageData={
                masterServiceProposalQuestionPageData
              }
              tabProposalSendActivePage={tabProposalSendActivePage}
              _handleSetInitialState={this._handleSetInitialState}
              _handleSendNewProposal={this._handleSendNewProposal}
              proposalModel={proposalModel}
              serviceSendProposalLoading={serviceSendProposalLoading}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = ({
  generalServiceGetResponse,
  serviceServiceResponse
}) => ({
  generalServiceGetResponse,
  serviceServiceResponse
});

const mapDispatchToProps = {
  getServiceCompanyPage,
  getMasterServiceProposalQuestionPage,
  sendServiceProposal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeeServiceScreen);
