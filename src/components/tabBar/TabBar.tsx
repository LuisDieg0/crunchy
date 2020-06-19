import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

const ItemButtom = ({ icon, onPress }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    ></TouchableOpacity>
  );
};
export default class TabBar extends Component {
  render() {
    return <View style={{ flexDirection: "row" }}></View>;
  }
}
