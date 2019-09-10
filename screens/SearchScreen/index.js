import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Content,
  List,
  ListItem
} from "native-base";

import i18n from "../../constants/strings";
import { categorySearch } from "../../src/actions/homeService";
import homeService from "../../src/reducers/homeService";

export class SearchScreen extends Component {
  static navigationOptions = {
    header: null
  };

  _handleSearchCategory = text => {
    if (text.length > 3) {
      const { categorySearch, generalServiceGetResponse } = this.props;
      const { getSiteData, getLanguageData } = generalServiceGetResponse;
      categorySearch(text, getSiteData.Id, getLanguageData.Id);
    }
  };

  render() {
    const { homeServiceResponse, navigation } = this.props;
    const { categorySearchData } = homeServiceResponse;
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              onChangeText={value => this._handleSearchCategory(value)}
              placeholder={i18n.t("text_40")}
            />
            <Icon name="ios-bookmark" />
          </Item>
          <Button transparent>
            <Text>{i18n.t("text_41")}</Text>
          </Button>
        </Header>
        <Content>
          <List>
            {categorySearchData.map((item, index) => {
              return (
                <ListItem
                  onPress={() =>
                    navigation.navigate("Service", {
                      CategoryID: item.ID
                    })
                  }
                  key={item.ID}
                >
                  <Text>{item.Name}</Text>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({
  generalServiceGetResponse,
  homeServiceResponse
}) => ({
  generalServiceGetResponse,
  homeServiceResponse
});

const mapDispatchToProps = {
  categorySearch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
