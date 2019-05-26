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
  View
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
    const item = navigation.getParam("item", null);
    const data = navigation.getParam("data", null);
    getServiceCustomerPage(data.ID);
  }

  navigationComponentWillMount = () => {
    const { navigation, getServiceCustomerPage } = this.props;
    const item = navigation.getParam("item", null);
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
    if (serviceCustomerPageLoading) {
      return <Spinner />;
    }
    return (
      <Root>
        <NavigationEvents
          onDidFocus={() => this.navigationComponentWillMount()}
        />
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
                      GaveProposalMasters={
                        serviceCustomerPageData.GaveProposalMasters
                      }
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
                      activeService={data}
                      activeProposal={activeProposal}
                      _handleSetInitialState={this._handleSetInitialState}
                    />
                  )}
                </Tab>
              </Tabs>
            </Tab>
            <Tab heading="Teklif Verebilecekler">
              <ScrollView>
                <CanGiveProposals
                  CanGiveProposalMasters={
                    serviceCustomerPageData.CanGiveProposalMasters
                  }
                />
              </ScrollView>
            </Tab>
          </Tabs>
        </Container>
      </Root>
    );
  }
}

const mapStateToProps = ({ serviceServiceResponse }) => {
  return {
    serviceServiceResponse
  };
};

const mapDispatchToProps = {
  getServiceCustomerPage,
  serviceProposalPreview
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeeProposalScreen);
