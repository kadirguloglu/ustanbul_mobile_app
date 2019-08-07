import React, { Component } from "react";
import { View } from "react-native";
import {
  Icon,
  Button,
  Root,
  Text,
  Header,
  Left,
  Right,
  Body,
  Title,
  Spinner,
  Badge
} from "native-base";
import { connect } from "react-redux";
import { customerServiceCountData } from "../../src/actions/customerDetailService";

class CustomerDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.customerServiceCountData(
      this.props.generalServiceGetResponse.activeUser.Id
    );
    this.renderText = function(item) {
      switch (item) {
        case "bekleme":
          return "Beklemede";
        case "onaylanan":
          return "Onaylanan";
        case "yoruma-acik":
          return "Yoruma Açık";
        case "biten":
          return "Biten";
        case "iptal-edilen":
          return "İptal Edilen";
      }
      return "";
    };
  }
  _handleServiceCount = () => {
    let data = [];
    for (
      let i = 0;
      i <
      Object.getOwnPropertyNames(
        this.props.customerDetailServiceResponse.customerServiceCountResult
      ).length;
      i++
    ) {
      const item = Object.getOwnPropertyNames(
        this.props.customerDetailServiceResponse.customerServiceCountResult
      )[i];
      data.push(
        <View key={"item" + i} style={{ height: 60 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ width: 40, height: 50 }}>
              <Badge primary>
                <Text>
                  {
                    this.props.customerDetailServiceResponse
                      .customerServiceCountResult[item]
                  }
                </Text>
              </Badge>
            </View>
            <View style={{ width: 150, height: 50 }}>
              <Text>{this.renderText(item)}</Text>
            </View>
          </View>
        </View>
      );
    }
    return data;
  };
  render() {
    const {
      customerServiceCountLoading
    } = this.props.customerDetailServiceResponse;
    if (customerServiceCountLoading) {
      return <Spinner />;
    } else {
      return (
        <React.Element>
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
              <Title>Hesap Özetiniz</Title>
            </Body>
            <Right>
              {/* <Text>{this.state.currentPosition}</Text> */}
              {/* <Button onPress={() => alert(JSON.stringify(this.state.serviceParameter.Contracts.length))}><Text>Test</Text></Button> */}
            </Right>
          </Header>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: 10,
              alignContent: "flex-start",
              justifyContent: "flex-start"
            }}
          >
            {this._handleServiceCount()}
          </View>
        </React.Element>
      );
    }
  }
}

const mapStateToProps = ({
  customerDetailServiceResponse,
  generalServiceGetResponse
}) => ({
  customerDetailServiceResponse,
  generalServiceGetResponse
});

const mapDispatchToProps = {
  customerServiceCountData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetailScreen);
