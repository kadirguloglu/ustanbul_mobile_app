import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { Spinner, Container, Content } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import i18n from "../../constants/strings";

import { serviceCategoriesAndSubCategories } from "../../src/actions/categoryService";
import {
  popularCategories,
  searchCategories
} from "../../src/actions/homeService";
import { loginUser, getSite } from "../../src/actions/generalServiceGet";
import {
  ThemeColor,
  IsFullData,
  storage,
  SmallPath
} from "../../src/functions";
import Carousel from "react-native-snap-carousel";
import Component2 from "../../components/HomeScreen/component2";
import Header from "./Components/Header";
import PopularCategories from "./Components/PopularCategories";
import styles, {
  sliderWidth,
  itemWidth,
  itemWidthOpportunity,
  slideHeightOpportunity,
  itemHorizontalMargin,
  colors,
  entryBorderRadius
} from "./styles";

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      full_search_box: false,
      searchCategory: false,
      search_text: "",
      loadingPressCategory: false
    };
  }

  componentWillMount() {
    const {
      generalServiceGetResponse,
      popularCategories,
      serviceCategoriesAndSubCategories
    } = this.props;
    const { getLanguageData, getSiteData } = generalServiceGetResponse;
    popularCategories(getSiteData.Id, getLanguageData.Id, "1", "12");
    if (IsFullData) {
      serviceCategoriesAndSubCategories(getSiteData.Id, getLanguageData.Id);
    }

    storage
      .load({
        key: "activeUserID"
      })
      .then(ret => {
        this.props.loginUser("", "", ret);
      })
      .catch(err => {
        switch (err.name) {
          case "NotFoundError":
            break;
          case "ExpiredError":
            break;
        }
      });
  }

  _renderItemOpportunity = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={"item-key-render-item-" + index}
        style={{
          width: itemWidth,
          height: slideHeightOpportunity,
          paddingHorizontal: itemHorizontalMargin,
          paddingBottom: 18
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: itemHorizontalMargin,
            right: itemHorizontalMargin,
            bottom: 18,
            shadowColor: colors.black,
            shadowOpacity: 0.25,
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 10,
            borderRadius: entryBorderRadius,
            borderWidth: 1,
            borderColor: ThemeColor
          }}
        />
        <View style={[styles.imageContainer]}>
          <Image
            source={require("../../assets/firsat.png")}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    );
  };

  handlePressCategory = ID => {
    const { activeUser } = this.props.generalServiceGetResponse;

    if (activeUser.Id == 0) {
      Alert.alert(
        "",
        i18n.t("text_1"),
        [
          {
            text: "İptal",
            //onPress: () => console.log("Ask me later pressed"),
            style: "cancel"
          },
          {
            text: i18n.t("giris_yap"),
            onPress: () => {
              this.props.navigation.navigate("Login");
            }
          },
          {
            text: i18n.t("text_2"),
            onPress: () => {
              this.props.navigation.navigate("Login", {
                pageState: "register"
              });
            }
          }
        ],
        { cancelable: false }
      );
      return;
    } else {
      if (activeUser.IsCompany == true) {
        alert(i18n.t("text_3"));
        return;
      }
    }
    this.props.navigation.navigate("Service", {
      CategoryID: ID
    });
  };

  componentDidMount() {}
  render() {
    const {
      homeServiceResponse,
      categoryServiceResponse,
      generalServiceGetResponse,
      navigation
    } = this.props;
    const { popularCategoriesResult } = homeServiceResponse;
    const { serviceCategoriesResult } = categoryServiceResponse;
    const { activeUser, getSiteData } = generalServiceGetResponse;
    return (
      <Container>
        <Content>
          <View style={styles.container}>
            <Header
              getSiteData={getSiteData}
              activeUser={activeUser}
              navigation={navigation}
            />
            <View style={styles.content}>
              <PopularCategories
                popularCategoriesResult={popularCategoriesResult}
                handlePressCategory={this.handlePressCategory}
              />
              <View>
                <Text style={styles.title_text}>
                  FIRSATLAR{"   "}
                  <FontAwesome
                    style={{ color: "#4c8497", paddingLeft: 10 }}
                    name="arrow-circle-right"
                    size={12}
                  />
                </Text>
                <Carousel
                  data={[0, 1, 2]}
                  renderItem={this._renderItemOpportunity}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidthOpportunity}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  layout={"default"}
                  loop={true}
                  keyExtractor={(item, index) =>
                    "item-key-render-item-" + index.toString()
                  }
                />
              </View>
              {serviceCategoriesResult && serviceCategoriesResult.length > 0
                ? serviceCategoriesResult.map(result => {
                    return (
                      <Component2
                        key={"serviceCategories" + result.ID}
                        result={result}
                        handlePressCategory={this.handlePressCategory}
                        keyExtractor={(item, index) =>
                          "serviceCategories-" + index.toString()
                        }
                      />
                    );
                  })
                : null}
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({
  generalServiceGetResponse,
  categoryServiceResponse,
  homeServiceResponse
}) => ({
  generalServiceGetResponse,
  categoryServiceResponse,
  homeServiceResponse
});

const mapDispatchToProps = {
  popularCategories,
  searchCategories,
  serviceCategoriesAndSubCategories,
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
