import React from "react";
import { Header, Left, Right, Body, Button, Icon, Title } from "native-base";

import { ThemeColor } from "../../../src/functions";
import i18n from "../../../constants/strings";

const CustomerServiceHeader = props => {
  const { initialTabActivePage, navigation, setInitialTabActivePage } = props;
  return (
    <Header style={{ backgroundColor: ThemeColor }}>
      <Left>
        {initialTabActivePage === 0 ? (
          <Button transparent onPress={() => navigation.toggleDrawer()}>
            <Icon name="ios-menu" color="white" style={{ color: "white" }} />
          </Button>
        ) : initialTabActivePage === 1 ? (
          <Button transparent onPress={() => setInitialTabActivePage(0)}>
            <Icon
              name="ios-arrow-back"
              color="white"
              style={{ color: "white" }}
            />
          </Button>
        ) : initialTabActivePage === 2 ? (
          <Button transparent onPress={() => setInitialTabActivePage(0)}>
            <Icon
              name="ios-arrow-back"
              color="white"
              style={{ color: "white" }}
            />
          </Button>
        ) : initialTabActivePage === 3 ? (
          <Button transparent onPress={() => setInitialTabActivePage(0)}>
            <Icon
              name="ios-arrow-back"
              color="white"
              style={{ color: "white" }}
            />
          </Button>
        ) : initialTabActivePage === 4 ? (
          <Button transparent onPress={() => setInitialTabActivePage(0)}>
            <Icon
              name="ios-arrow-back"
              color="white"
              style={{ color: "white" }}
            />
          </Button>
        ) : null}
      </Left>
      <Body>
        <Title style={{ color: "white" }}>{i18n.t("text_134")}</Title>
      </Body>
      <Right />
    </Header>
  );
};

export default CustomerServiceHeader;
