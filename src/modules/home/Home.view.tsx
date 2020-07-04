import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import RowVideo from "./componets/RowVideo";

export default class HomeView extends Component {
  state = {};

  render() {
    const { data = [] } = this.props;
    return (
      <View>
        <FlatList
          data={data}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 10, width: "100%" }} />;
          }}
          renderItem={({ item, index }) => {
            return <RowVideo item={item}></RowVideo>;
          }}
        />
      </View>
    );
  }
}
