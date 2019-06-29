import React from "react";
import { Image } from "react-native";
import { Container, Content } from "native-base";
import DrawerLinks from "./Routes";
import { connect } from "react-redux";

class SideMenu extends React.Component {
  render() {
    const { generalServiceGetResponse } = this.props;
    const { activeUser } = generalServiceGetResponse;
    return (
      <Container>
        <Content>
          {/* <Image
            source={{
              uri:
                "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
            }}
            style={{
              height: 120,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute"
            }}
          /> */}
          <Image
            square
            style={{
              height: 80,
              width: 70,
              position: "absolute",
              alignSelf: "center",
              top: 20
            }}
            source={
              activeUser.Id != 0
                ? activeUser.ProfilePicturePath
                  ? activeUser.ProfilePicturePath.Thumb == ""
                    ? require("../assets/icon.png")
                    : {
                        uri: activeUser.ProfilePicturePath.Thumb
                      }
                  : require("../assets/icon.png")
                : require("../assets/icon.png")
            }
          />
          <DrawerLinks {...this.props} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ generalServiceGetResponse }) => ({
  generalServiceGetResponse
});

export default connect(mapStateToProps)(SideMenu);
