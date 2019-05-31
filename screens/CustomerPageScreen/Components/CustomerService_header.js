import React from "react";
import { Header, Left, Right, Body, Button, Icon, Title } from "native-base";

const CustomerServiceHeader = props => {
  const { initialTabActivePage, navigation, _handleSetInitialState } = props;
  return (
    <Header>
      <Left>
        {initialTabActivePage === 0 ? (
          <Button transparent onPress={() => navigation.toggleDrawer()}>
            <Icon name="ios-menu" />
          </Button>
        ) : initialTabActivePage === 1 ? (
          <Button
            transparent
            onPress={() => _handleSetInitialState("initialTabActivePage", 0)}
          >
            <Icon name="ios-arrow-back" />
          </Button>
        ) : initialTabActivePage === 2 ? (
          <Button
            transparent
            onPress={() => _handleSetInitialState("initialTabActivePage", 0)}
          >
            <Icon name="ios-arrow-back" />
          </Button>
        ) : initialTabActivePage === 3 ? (
          <Button
            transparent
            onPress={() => _handleSetInitialState("initialTabActivePage", 0)}
          >
            <Icon name="ios-arrow-back" />
          </Button>
        ) : initialTabActivePage === 4 ? (
          <Button
            transparent
            onPress={() => _handleSetInitialState("initialTabActivePage", 0)}
          >
            <Icon name="ios-arrow-back" />
          </Button>
        ) : null}
      </Left>
      <Body>
        <Title>Hizmetlerim</Title>
      </Body>
      <Right />
    </Header>
  );
};

export default CustomerServiceHeader;
