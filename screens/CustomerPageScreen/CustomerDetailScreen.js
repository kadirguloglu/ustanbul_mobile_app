import React, { useState, useEffect } from "react";
import {
  View,
  Icon,
  Container,
  Button,
  Text,
  Header,
  Left,
  Right,
  Body,
  Title,
  Spinner,
  Badge
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { customerServiceCountData } from "../../src/actions/customerDetailService";

function CustomerDetailScreen({ navigation }) {
  const { activeUser } = useSelector(state => state.generalServiceGetResponse);
  const {
    customerServiceCountLoading,
    customerServiceCountResult
  } = useSelector(state => state.customerDetailServiceResponse);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(customerServiceCountData(activeUser.Id));
  }, []);

  function renderText(item) {
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
  }

  _handleServiceCount = () => {
    let data = [];
    const countResultPropNames = Object.getOwnPropertyNames(
      customerServiceCountResult
    );
    return countResultPropNames.map(i => {
      const item = countResultPropNames[i];
      return (
        <View key={"item" + i} style={{ height: 60 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ width: 40, height: 50 }}>
              <Badge primary>
                <Text>{customerServiceCountResult[item]}</Text>
              </Badge>
            </View>
            <View style={{ width: 150, height: 50 }}>
              <Text>{renderText(item)}</Text>
            </View>
          </View>
        </View>
      );
    });
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.toggleDrawer()}>
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
      {customerServiceCountLoading ? (
        <Spinner></Spinner>
      ) : (
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
          {_handleServiceCount()}
        </View>
      )}
    </Container>
  );
}

export default CustomerDetailScreen;
