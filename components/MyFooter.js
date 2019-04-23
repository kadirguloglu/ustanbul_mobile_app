import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Footer, FooterTab, Button } from "native-base";
import { connect } from "react-redux";
import { ThemeColor } from "../src/functions";
import { FontAwesome } from "@expo/vector-icons";

class MyFooter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return null;
    const { active_tab } = this.props;
    return (
      <Footer>
        <FooterTab style={{ backgroundColor: "white" }}>
          <Button style={active_tab == 1 ? styles.activeTab : {}} vertical>
            <FontAwesome style={{ color: ThemeColor }} name="home" size={24} />
          </Button>
          <Button style={active_tab == 2 ? styles.activeTab : {}} vertical>
            <FontAwesome
              style={{ color: ThemeColor }}
              name="search"
              size={24}
            />
          </Button>
          <Button style={active_tab == 3 ? styles.activeTab : {}} vertical>
            <FontAwesome
              style={{ color: ThemeColor }}
              name="file-text"
              size={24}
            />
          </Button>
          <Button
            style={active_tab == 4 ? styles.activeTab : {}}
            vertical
            onPress={() =>
              this.props.activeUser ? Actions.UserMenu() : Actions.AuthUser()
            }
          >
            <FontAwesome style={{ color: ThemeColor }} name="user" size={24} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
const styles = StyleSheet.create({
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: ThemeColor
  }
});
const mapStateToProps = ({ activeUser }) => ({
  activeUser
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFooter);
