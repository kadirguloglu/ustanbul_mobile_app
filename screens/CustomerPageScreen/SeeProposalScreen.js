import React, { Component } from "react";
import { View, Text } from "native-base";

class SeeProposalScreen extends Component {
  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props.navigation.getParam("item", 0))}</Text>
        <Text>------------------------------------</Text>
        <Text>{JSON.stringify(this.props.navigation.getParam("data", 0))}</Text>
      </View>
    );
  }
}

export default SeeProposalScreen;
