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
import { serviceCategoriesAndSubCategories } from "../../src/actions/categoryService";
import {
  popularCategories,
  searchCategories
} from "../../src/actions/homeService";
import { loginUser } from "../../src/actions/generalServiceGet";
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
    this.props.popularCategories("1", "1", "1", "12");
    if (IsFullData) {
      this.props.serviceCategoriesAndSubCategories("1", "1");
    }
    this._renderItemOpportunity = function({ item, index }) {
      return (
        <TouchableOpacity
          activeOpacity={1}
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
  }
  handlePressCategory = ID => {
    const { activeUser } = this.props.generalServiceGetResponse;

    if (activeUser.Id == 0) {
      Alert.alert(
        "",
        "Hizmet almak için lütfen giriş yapın veya kayıt olun.",
        [
          {
            text: "İptal",
            //onPress: () => console.log("Ask me later pressed"),
            style: "cancel"
          },
          {
            text: "Giriş yap",
            onPress: () => {
              this.props.navigation.navigate("Login");
            }
          },
          {
            text: "Kayıt ol",
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
        alert(
          "Şimdilik usta üyeliği ile hizmet talebi alamıyoruz. Lütfen kişisel hesabınız ile kayıt olunuz."
        );
        return;
      }
    }
    this.props.navigation.navigate("Service", {
      CategoryID: ID
    });
  };
  componentDidMount() {
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
  render() {
    const {
      homeServiceResponse,
      categoryServiceResponse,
      generalServiceGetResponse,
      navigation
    } = this.props;
    const { popularCategoriesResult } = homeServiceResponse;
    const { serviceCategoriesResult } = categoryServiceResponse;
    const { activeUser } = generalServiceGetResponse;
    return (
      <Container>
        <Content>
          <View style={styles.container}>
            <Header activeUser={activeUser} navigation={navigation} />
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
                />
              </View>
              {serviceCategoriesResult && serviceCategoriesResult.length > 0
                ? serviceCategoriesResult.map(result => {
                    return (
                      <Component2
                        key={"serviceCategories" + result.ID}
                        result={result}
                        handlePressCategory={this.handlePressCategory}
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
