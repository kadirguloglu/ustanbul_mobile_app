import React, { useState, useEffect } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { useSelector } from "react-redux";

import i18n from "../../constants/strings";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import metrics from "../../config/metrics";
import { colors } from "../HomeScreen/styles";

const { width, height } = Dimensions.get("window");

function LoginScreen({ navigation }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [bottomHeight, setBottomHeight] = useState(0);
  const [pageState, setPageState] = useState("previewPage");
  const [carouselData, setCarouselData] = useState([
    {
      image: require("../../assets/loginPageBackground/5d7773713f049.png"),
      title: "Lorem ipsum door amet",
      description:
        "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir.",
      style: {
        justifyContent: "flex-end",
        alignItems: "flex-end"
      }
    },
    {
      image: require("../../assets/loginPageBackground/5d777391b99b1.png"),
      title: "Lorem ipsum door amet",
      description:
        "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir.",
      style: {
        justifyContent: "flex-end",
        alignItems: "flex-end"
      }
    },
    {
      image: require("../../assets/loginPageBackground/5d7773a48f3db.png"),
      title: "Lorem ipsum door amet",
      description:
        "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir.",
      style: {
        justifyContent: "flex-end",
        alignItems: "flex-end"
      }
    },
    {
      image: require("../../assets/loginPageBackground/5d7773b6ac28a.png"),
      title: "Lorem ipsum door amet",
      description:
        "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir.",
      style: {
        justifyContent: "flex-end",
        alignItems: "flex-end"
      }
    }
  ]);

  const { activeUser } = useSelector(state => state.generalServiceGetResponse);

  useEffect(() => {
    if (activeUser.Id !== 0) {
      navigation.navigate("Home");
    }
  }, [activeUser.Id]);

  function getRegisterPage() {
    setPageState("register");
  }
  function getLoginPage() {
    setPageState("login");
  }

  return (
    <React.Fragment>
      {pageState === "previewPage" ? (
        <Carousel
          data={carouselData}
          renderItem={({ item }) => {
            return (
              <View>
                <Image source={item.image} style={styles.image} />
                <View style={styles.container}>
                  <View
                    style={[
                      styles.texts,
                      {
                        ...item.style,
                        height: metrics.DEVICE_HEIGHT - bottomHeight
                      }
                    ]}
                  >
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.descriptionText}>
                      {item.description}
                    </Text>
                  </View>
                  <View
                    style={styles.buttonPanel}
                    onLayout={e => setBottomHeight(e.nativeEvent.layout.height)}
                  >
                    <Pagination
                      dotsLength={carouselData.length}
                      activeDotIndex={activeSlide}
                      dotStyle={styles.dotStyle}
                      inactiveDotStyle={styles.inactiveDotStyle}
                      inactiveDotOpacity={0.4}
                      inactiveDotScale={0.6}
                    />
                    <View style={styles.buttonViewPanel}>
                      <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => setPageState("login")}
                      >
                        <Text style={styles.buttonText}>
                          {i18n.t("giris_yap")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.buttonContainer, styles.homePageButton]}
                        onPress={() => navigation.navigate("Home")}
                      >
                        <Text
                          style={[styles.buttonText, styles.homePageButtonText]}
                        >
                          {i18n.t("text_190")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          onSnapToItem={index => setActiveSlide(index)}
          layout={"default"}
          sliderWidth={width}
          itemWidth={width}
          itemHeight={height}
          sliderHeight={height}
          loop={true}
          autoplay={true}
          lockScrollWhileSnapping={true}
        />
      ) : pageState === "login" ? (
        <LoginForm navigation={navigation} form_change={getRegisterPage} />
      ) : pageState === "register" ? (
        <RegisterForm form_change={getLoginPage} navigation={navigation} />
      ) : null}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    width: parseInt(width),
    height: parseInt(height)
  },
  container: {
    position: "absolute",
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  texts: {
    padding: metrics.DEVICE_WIDTH * 0.04,
    flexDirection: "column",
    width: "100%"
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    maxWidth: metrics.DEVICE_WIDTH * 0.6,
    color: "white"
  },
  descriptionText: {
    fontSize: 16,
    maxWidth: metrics.DEVICE_WIDTH * 0.6,
    color: "white"
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    marginVertical: -4,
    backgroundColor: "#a2a2a2d9"
  },
  buttonPanel: {
    backgroundColor: "#ffffffcf",
    flexDirection: "column"
  },
  inactiveDotStyle: {},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 50,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 6,
    paddingBottom: 6
  },
  homePageButton: {
    borderColor: colors.background2,
    backgroundColor: colors.background2
  },
  buttonText: { fontSize: 14, fontWeight: "bold" },
  homePageButtonText: {
    color: "white"
  },
  buttonViewPanel: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  }
});

export default LoginScreen;
