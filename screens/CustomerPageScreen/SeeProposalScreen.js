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
  Body
} from "native-base";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";

import GaveProposals from "./Components/GaveProposals";
import CanGiveProposals from "./Components/CanGiveProposals";
import { getServiceCustomerPage } from "../../src/actions/serviceService";

class SeeProposalScreen extends Component {
  constructor(props) {
    super(props);
  }

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

  render() {
    const { serviceServiceResponse, navigation } = this.props;
    const {
      serviceCustomerPageLoading,
      serviceCustomerPageData
    } = serviceServiceResponse;
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
              <Button transparent onPress={() => navigation.toggleDrawer()}>
                <Icon name="ios-menu" />
              </Button>
            </Left>
            <Body>
              <Title>{data.CategoryName}</Title>
            </Body>
            <Right>
              {/* <Text>{this.state.currentPosition}</Text> */}
              {/* <Button onPress={() => alert(JSON.stringify(this.state.serviceParameter.Contracts.length))}><Text>Test</Text></Button> */}
            </Right>
          </Header>
          <Tabs>
            <Tab heading="Gelen Teklifler">
              <ScrollView>
                <GaveProposals
                  GaveProposalMasters={
                    serviceCustomerPageData.GaveProposalMasters
                  }
                />
              </ScrollView>
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
  getServiceCustomerPage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeeProposalScreen);
