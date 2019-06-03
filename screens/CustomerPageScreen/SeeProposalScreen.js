import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Title,
  Right,
  Tab,
  Tabs,
  Root,
  Spinner,
  Body,
  View,
  Toast
} from "native-base";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";

import GaveProposals from "./Components/GaveProposals";
import CanGiveProposals from "./Components/CanGiveProposals";
import ProposalDetail from "./Components/SeeProposal_proposal_detail";

import {
  getServiceCustomerPage,
  serviceProposalPreview
} from "../../src/actions/serviceService";
import { servicePostService } from "../../src/actions/servicePost";

import { Loader } from "../../src/functions";

class SeeProposalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSeeProposalPage: 0,
      proposalListPage: 0,
      activeProposal: null
    };
  }

  _handleSetInitialState = (p, v) => {
    this.setState({ [p]: v });
  };

  componentWillMount() {
    const { navigation, getServiceCustomerPage } = this.props;
    const data = navigation.getParam("data", null);
    getServiceCustomerPage(data.ID);
  }

  _handleServicePost = (service, proposal) => {
    const {
      generalServiceGetResponse,
      servicePostService,
      navigation
    } = this.props;
    const { getSiteData } = generalServiceGetResponse;
    servicePostService(proposal, service, getSiteData).then(({ payload }) => {
      if (payload) {
        if (payload.request) {
          if (payload.request._response === "success") {
            Toast.show({
              text: "Teklif onaylandı ve ustaya bilgi verildi.",
              buttonText: "Tamam",
              duration: 5500
            });
            navigation.navigate("CustomerService", {
              data: navigation.getParam("data", null)
            });
            return;
          }
        }
      }
      Toast.show({
        text:
          "Teklif onaylama başarısız. Lütfen internet bağlantınızı kontrol ediniz.",
        buttonText: "Tamam",
        duration: 5500
      });
    });
  };

  navigationComponentWillMount = () => {
    const { navigation, getServiceCustomerPage } = this.props;
    const data = navigation.getParam("data", null);
    getServiceCustomerPage(data.ID);
  };

  _handleServiceProposalPreview = proposal => {
    const { serviceProposalPreview } = this.props;
    this.setState({ activeProposal: proposal });
    serviceProposalPreview(proposal.ServiceProposalID).then(({ payload }) => {
      this.setState({ proposalListPage: 1 });
    });
  };

  render() {
    const { serviceServiceResponse, navigation } = this.props;
    const {
      serviceCustomerPageLoading,
      serviceCustomerPageData,
      serviceProposalPreviewLoading,
      serviceProposalPreviewData
    } = serviceServiceResponse;
    const { proposalListPage, activeProposal } = this.state;
    const data = navigation.getParam("data", null);

    return (
      <Root>
        <NavigationEvents
          onDidFocus={() => this.navigationComponentWillMount()}
        />
        {serviceCustomerPageLoading ? <Loader /> : null}
        <Container>
          <Header>
            <Left>
              {proposalListPage === 0 ? (
                <Button transparent onPress={() => navigation.toggleDrawer()}>
                  <Icon name="ios-menu" />
                </Button>
              ) : proposalListPage === 1 ? (
                <Button
                  transparent
                  onPress={() => this.setState({ proposalListPage: 0 })}
                >
                  <Icon name="ios-arrow-back" />
                </Button>
              ) : null}
            </Left>
            <Body>
              <Title>{data.CategoryName}</Title>
            </Body>
            <Right />
          </Header>
          <Tabs>
            <Tab heading="Gelen Teklifler">
              <Tabs
                renderTabBar={() => <View />}
                page={proposalListPage}
                locked={true}
              >
                <Tab heading="Teklif Listesi">
                  <ScrollView>
                    <GaveProposals
                      serviceCustomerPageData={serviceCustomerPageData}
                      serviceProposalPreviewLoading={
                        serviceProposalPreviewLoading
                      }
                      serviceProposalPreview={
                        this._handleServiceProposalPreview
                      }
                    />
                  </ScrollView>
                </Tab>
                <Tab heading="Teklif Detayı">
                  {serviceProposalPreviewLoading ? null : (
                    <ProposalDetail
                      serviceProposalPreviewLoading={
                        serviceProposalPreviewLoading
                      }
                      serviceProposalPreviewData={serviceProposalPreviewData}
                      activeService={serviceCustomerPageData}
                      activeProposal={activeProposal}
                      _handleSetInitialState={this._handleSetInitialState}
                      _handleServicePost={this._handleServicePost}
                    />
                  )}
                </Tab>
              </Tabs>
            </Tab>
            <Tab heading="Teklif Verebilecekler">
              <ScrollView>
                <CanGiveProposals
                  serviceCustomerPageData={serviceCustomerPageData}
                />
              </ScrollView>
            </Tab>
          </Tabs>
        </Container>
      </Root>
    );
  }
}

const mapStateToProps = ({
  serviceServiceResponse,
  generalServiceGetResponse
}) => {
  return {
    serviceServiceResponse,
    generalServiceGetResponse
  };
};

const mapDispatchToProps = {
  getServiceCustomerPage,
  serviceProposalPreview,
  servicePostService
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeeProposalScreen);
