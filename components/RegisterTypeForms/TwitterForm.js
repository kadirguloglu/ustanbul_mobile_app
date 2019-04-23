import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ImageBackground,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Button,
  TouchableHighlight,
  Dimensions
} from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeColor } from "../../src/functions";

const { width, height } = Dimensions.get("window");
class TwitterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoHeight: height
    };
  }
  componentWillMount() {}
  render() {
    return (
      <View
        style={{ backgroundColor: "#55ACEE", width: width, height: height }}
      >
        <Animatable.View
          animation="zoomIn"
          delay={500}
          style={[styles.logoView, { height: this.state.logoHeight }]}
        >
          <Text style={[styles.logoText]}>FixMasTR</Text>
        </Animatable.View>
        <Animatable.View
          animation="zoomIn"
          delay={1500}
          onAnimationBegin={() => {
            this.setState({ logoHeight: height * 0.1 });
          }}
          style={styles.loginFormView}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <FontAwesome style={{ color: "white" }} name="twitter" size={100} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 19
            }}
          >
            <Text
              style={{
                fontFamily: "Raleway_Light",
                fontSize: 21,
                color: "#fff"
              }}
            >
              Twitter ile{" "}
            </Text>
            <Text
              style={{
                fontFamily: "Raleway_Bold",
                fontSize: 21,
                color: "#fff"
              }}
            >
              Kayıt Ol
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 19
            }}
          >
            <Text
              style={{
                fontFamily: "Raleway_Light",
                fontSize: 14,
                color: "#fff"
              }}
            >
              ÜYELİK TİPİ SEÇİNİZ
            </Text>
          </View>
          <View style={{ marginBottom: 10, marginTop: 24 }}>
            <TouchableHighlight
              style={[styles.button, styles.searchMasterButton]}
              onPress={() => console.log("")}
            >
              <Text style={[styles.buttonText, styles.searchMasterText]}>
                Usta Arıyorum
              </Text>
            </TouchableHighlight>
          </View>
          <View style={{ marginBottom: 10 }}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => console.log("")}
            >
              <Text style={styles.buttonText}>Ustayım</Text>
            </TouchableHighlight>
          </View>
          <View style={{ marginBottom: 10 }}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => console.log("")}
            >
              <Text style={styles.buttonText}>Şirketim</Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight
            onPress={() => this.props.login_form()}
            style={styles.registerTextContainer}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.text_1]}>Hesabım var mı?{"   "}</Text>
              <Text style={[styles.text_2]}>Giriş Yap</Text>
            </View>
          </TouchableHighlight>
        </Animatable.View>
      </View>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwitterForm);

const styles = StyleSheet.create({
  logoView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  logoText: {
    fontFamily: "Raleway_Bold",
    fontSize: 22,
    color: "#fff"
  },
  loginFormView: {
    flexDirection: "column",
    justifyContent: "flex-start",
    height: height * 0.9,
    paddingLeft: width * 0.1,
    paddingRight: width * 0.1
  },
  registerTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: width
  },
  text_1: {
    fontFamily: "Raleway_Light",
    fontSize: 14,
    color: "#fff"
  },
  text_2: {
    fontFamily: "Raleway_Bold",
    fontSize: 14,
    color: "#fff"
  },
  button: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 44
  },
  buttonText: {
    fontFamily: "Ubuntu_L",
    fontSize: 16,
    color: "white"
  },
  searchMasterButton: {
    borderWidth: 0,
    backgroundColor: "#9DACCB"
  },
  searchMasterText: {
    color: "black"
  }
});
