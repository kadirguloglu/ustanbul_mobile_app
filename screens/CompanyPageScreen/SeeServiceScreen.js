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
  View
} from "native-base";
import { NavigationEvents } from "react-navigation";
import { ScrollView } from "react-native";

import {
  getServiceCompanyPage,
  getMasterServiceProposalQuestionPage
} from "../../src/actions/serviceService";
import SeeServiceContent from "./Components/SeeServiceScreen_content";
import ServiceDetail from "./Components/ServiceDetail_content";
import SendProposal from "./Components/SendProposal_content";

class SeeServiceScreen extends Component {
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

  componentWillMount() {
    const { generalServiceGetResponse } = this.props;
    const { activeUser } = generalServiceGetResponse;
    this.props.getServiceCompanyPage(activeUser.Id, 1, 999);
  }

  navigationComponentWillMount = () => {
    const { generalServiceGetResponse } = this.props;
    const { activeUser } = generalServiceGetResponse;
    this.props.getServiceCompanyPage(activeUser.Id, 1, 999);
  };

  _handleServiceDetail = service => {
    this.setState({ service: service });
    this.setState({ tabActivePage: 1 });
  };

  _handleSendProposal = () => {
    const { getMasterServiceProposalQuestionPage } = this.props;
    const { service } = this.state;
    getMasterServiceProposalQuestionPage(service.CategoryID, 1, 1).then(
      ({}) => {
        this.setState({ tabActivePage: 2 });
      }
    );
  };

  _handleSendNewProposal = () => {};

  render() {
    const { serviceServiceResponse } = this.props;
    const {
      serviceCompanyPageData,
      serviceCompanyPageLoading,
      masterServiceProposalQuestionPageLoading,
      masterServiceProposalQuestionPageData
    } = serviceServiceResponse;
    const {
      tabActivePage,
      service,
      tabProposalSendActivePage,
      proposalModel
    } = this.state;
    return (
      <Root>
        <NavigationEvents
          onDidFocus={() => this.navigationComponentWillMount()}
        />
        <Container>
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
                    this.setState({
                      tabProposalSendActivePage: tabProposalSendActivePage - 1
                    })
                  }
                >
                  <Icon name="ios-arrow-back" />
                </Button>
              )}
            </Left>
            <Body>
              <Title>Teklif ver para kazan</Title>
            </Body>
          </Header>
          <Tabs
            locked={true}
            renderTabBar={() => <View />}
            page={tabActivePage}
          >
            <Tab heading="Hizmetler">
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
            <Tab heading="Hizmet Detay">
              <ScrollView>
                <ServiceDetail
                  service={service}
                  _handleSendProposal={this._handleSendProposal}
                />
              </ScrollView>
            </Tab>
            <Tab heading="Teklif Ver">
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
              />
            </Tab>
          </Tabs>
        </Container>
      </Root>
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
  getMasterServiceProposalQuestionPage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeeServiceScreen);
