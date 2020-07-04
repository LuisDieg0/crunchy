import React, { Component } from "react";
import { View, Text } from "react-native";

export default class HomeView extends Component {
  state = {};

  render() {
    const { data = [] } = this.props;
    return (
      <View>
        <Text>Inicio</Text>
      </View>
    );
  }
}
