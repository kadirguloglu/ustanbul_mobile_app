import React from "react";
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

import styles from "../styles";
import HeaderHello from "./Header_hello";

const Header = props => {
  const { activeUser, navigation } = props;
  return (
    <View>
      <ImageBackground
        source={require("../../../assets/background/homepage_background.png")}
        style={styles.header_background}
        resizeMode="cover"
      >
        <View style={styles.view1}>
          <View style={styles.header}>
            <View style={styles.view2}>
              <FontAwesome
                style={[
                  styles.color_white,
                  {
                    transform: [{ rotate: "-45deg" }]
                  }
                ]}
                name="bell"
                size={22}
                onPress={() => navigation.toggleDrawer()}
              />
            </View>
            <View style={styles.logo_block}>
              <Text style={[styles.font_raleway_bold, styles.logo]}>
                FixMasTR
              </Text>
            </View>
            <View>
              {activeUser.Id != 0 ? (
                activeUser.IsCompany ? (
                  <React.Fragment>
                    <Text style={[styles.font_ubuntu_r, styles.text_1]}>
                      Teklif ver
                    </Text>
                    <Text style={[styles.font_ubuntu_r, styles.text_1]}>
                      Para kazan
                    </Text>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Text style={[styles.font_ubuntu_r, styles.text_1]}>
                      Hizmet
                    </Text>
                    <Text style={[styles.font_ubuntu_r, styles.text_1]}>
                      {"      "}Al
                    </Text>
                  </React.Fragment>
                )
              ) : (
                <React.Fragment>
                  <Text style={[styles.font_ubuntu_r, styles.text_1]}>
                    Hizmet
                  </Text>
                  <Text style={[styles.font_ubuntu_r, styles.text_1]}>
                    {"      "}Al
                  </Text>
                </React.Fragment>
              )}
            </View>
          </View>
        </View>
        <HeaderHello activeUser={activeUser} />
      </ImageBackground>
    </View>
  );
};

export default Header;
