import React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { View, Text } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

import styles from "../styles";
import HeaderHello from "./Header_hello";

const Header = props => {
  const { activeUser, navigation, getSiteData } = props;
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
                {getSiteData.Name}
              </Text>
            </View>
            <View>
              {activeUser.Id != 0 ? (
                activeUser.IsCompany ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SeeService")}
                  >
                    <Text style={[styles.font_ubuntu_r, styles.text_1]}>
                      Teklif ver{"\n"}Para kazan
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <React.Fragment>
                    <Text style={[styles.font_ubuntu_r, styles.text_1]}>
                      Hizmet al
                    </Text>
                  </React.Fragment>
                )
              ) : (
                <React.Fragment>
                  <Text style={[styles.font_ubuntu_r, styles.text_1]}>
                    Hizmet al
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
