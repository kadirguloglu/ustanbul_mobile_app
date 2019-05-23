import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Title,
  Right,
  Root,
  Spinner,
  Body
} from "native-base";
import { NavigationEvents } from "react-navigation";
import { ScrollView } from "react-native";

import { getServiceCompanyPage } from "../../src/actions/serviceService";
import SeeServiceContent from "./Components/SeeServiceScreen_content";

class SeeServiceScreen extends Component {
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

  render() {
    const { serviceServiceResponse } = this.props;
    const {
      serviceCompanyPageData,
      serviceCompanyPageLoading
    } = serviceServiceResponse;

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
              <Title>Teklif ver para kazan</Title>
            </Body>
            <Right>
              {/* <Text>{this.state.currentPosition}</Text> */}
              {/* <Button onPress={() => alert(JSON.stringify(this.state.serviceParameter.Contracts.length))}><Text>Test</Text></Button> */}
            </Right>
          </Header>
          {serviceCompanyPageLoading ? (
            <Spinner />
          ) : (
            <ScrollView>
              <SeeServiceContent
                serviceCompanyPageData={serviceCompanyPageData.Data}
              />
            </ScrollView>
          )}
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
  getServiceCompanyPage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeeServiceScreen);
