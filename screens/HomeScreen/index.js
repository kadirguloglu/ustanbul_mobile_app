import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import {
  Spinner,
  Container,
  Content,
  Footer,
  FooterTab,
  Button
} from "native-base";
import { connect } from "react-redux";
import { serviceCategoriesAndSubCategories } from "../../src/actions/categoryService";
import {
  popularCategories,
  searchCategories
} from "../../src/actions/homeService";
import { loginUser } from "../../src/actions/generalServiceGet";
import { MidPath, ThemeColor, IsFullData, storage } from "../../src/functions";
import { FontAwesome } from "@expo/vector-icons";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import MyFooter from "../../components/MyFooter";
import styles, {
  sliderWidth,
  itemWidth,
  itemWidthOpportunity,
  slideHeightOpportunity,
  itemHorizontalMargin,
  colors,
  entryBorderRadius,
  slideHeight
} from "./styles";

class HomeScreen extends Component {
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
    this.handlePressCategory = function(ID) {
      const { activeUser } = this.props.generalServiceGetResponse;
      this.setState({ loadingPressCategory: true });
      if (activeUser) {
        if (activeUser.ID) {
          if (activeUser.ID == 0) {
            alert("Hizmet oluşturmak için lütfen giriş yapınız");
            this.setState({ loadingPressCategory: false });
            return;
          } else {
            if (activeUser.IsCompany == true) {
              alert(
                "Şimdilik usta üyeliği ile hizmet talebi alamıyoruz. Lütfen kişisel hesabınız ile kayıt olunuz."
              );
              this.setState({ loadingPressCategory: false });
              return;
            }
          }
        }
      } else {
        alert("Hizmet oluşturmak için lütfen giriş yapınız");
        this.setState({ loadingPressCategory: false });
        return;
      }
      this.props.navigation.navigate("Service", {
        CategoryID: ID
      });
    };
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
    const popularCategoriesResult = this.props.homeServiceResponse
      .popularCategoriesResult;
    const serviceCategoriesResult = this.props.categoryServiceResponse
      .serviceCategoriesResult;
    if (this.state.loadingPressCategory) {
      return <Spinner />;
    }
    return (
      <Container>
        <Content>
          <View style={styles.container}>
            <View>
              <ImageBackground
                source={require("../../assets/background/homepage_background.png")}
                style={styles.header_background}
                resizeMode="cover"
              >
                <View style={{ flexDirection: "column" }}>
                  <View style={styles.header}>
                    <View style={{ zIndex: 2 }}>
                      <FontAwesome
                        style={[
                          styles.color_white,
                          {
                            transform: [{ rotate: "-45deg" }]
                          }
                        ]}
                        name="bell"
                        size={22}
                        onPress={() => this.props.navigation.toggleDrawer()}
                      />
                    </View>
                    <View style={styles.logo_block}>
                      <Text style={[styles.font_raleway_bold, styles.logo]}>
                        FixMasTR
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.font_ubuntu_r, styles.text_1]}>
                        Hizmet
                      </Text>
                      <Text style={[styles.font_ubuntu_r, styles.text_1]}>
                        {"      "}Al
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    position: "absolute",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Raleway_Light",
                      fontSize: 12,
                      color: "#fff"
                    }}
                  >
                    Hoşgeldin
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Raleway_Bold",
                      fontSize: 12,
                      color: "#fff"
                    }}
                  >
                    Kadir Güloğlu
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.content}>
              <View>
                <Text style={styles.title_text}>
                  POPÜLER KATEGORİLER{"   "}
                  <FontAwesome
                    style={{ color: "#4c8497", paddingLeft: 10 }}
                    name="arrow-circle-right"
                    size={12}
                  />
                </Text>
                {popularCategoriesResult &&
                popularCategoriesResult.length > 1 ? (
                  <Carousel
                    data={popularCategoriesResult}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={1}
                          style={{
                            width: itemWidth,
                            height: slideHeight,
                            paddingHorizontal: itemHorizontalMargin,
                            paddingBottom: 18
                          }}
                          onPress={() => this.handlePressCategory(item.ID)}
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
                              source={require("../../assets/image-place-holder.png")}
                              style={styles.image}
                              // onError={(s) => }
                            />
                          </View>
                          <View style={[styles.textContainer]}>
                            <Text style={[styles.title]} numberOfLines={1}>
                              {item.Name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    layout={"default"}
                    loop={true}
                  />
                ) : (
                  <Spinner />
                )}
              </View>
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
                      <View key={"serviceCategories" + result.ID}>
                        <Text style={styles.title_text}>
                          {result.Name}
                          {"   "}
                          <FontAwesome
                            style={{ color: "#4c8497", paddingLeft: 10 }}
                            name="arrow-circle-right"
                            size={12}
                          />
                        </Text>
                        <Carousel
                          data={result.SubCategories}
                          renderItem={({ item, index }) => {
                            return (
                              <TouchableOpacity
                                activeOpacity={1}
                                style={{
                                  width: itemWidth,
                                  height: slideHeight,
                                  paddingHorizontal: itemHorizontalMargin,
                                  paddingBottom: 18
                                }}
                                onPress={() =>
                                  this.handlePressCategory(item.ID)
                                }
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
                                    source={require("../../assets/image-place-holder.png")}
                                    style={styles.image}
                                  />
                                </View>
                                <View style={[styles.textContainer]}>
                                  <Text
                                    style={[styles.title]}
                                    numberOfLines={1}
                                  >
                                    {item.Name}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            );
                          }}
                          sliderWidth={sliderWidth}
                          itemWidth={itemWidthOpportunity}
                          containerCustomStyle={styles.slider}
                          contentContainerCustomStyle={
                            styles.sliderContentContainer
                          }
                          layout={"default"}
                          loop={true}
                        />
                      </View>
                    );
                  })
                : null}
            </View>
          </View>
        </Content>
        {/* <MyFooter active_tab={1} /> */}
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
