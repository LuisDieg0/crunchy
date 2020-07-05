import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import RowVideo from "./componets/RowVideo";
import { FlatGrid } from "react-native-super-grid";

export default class HomeView extends Component {
  constructor(props) {
    super(props);
  }
  state = {};

  render() {
    const { data = [] } = this.props;
    return (
      <View style={styles.container}>
        <FlatGrid
          initialNumToRender={10}
          centerContent
          itemDimension={250}
          data={data}
          renderItem={({ item, index }) => {
            return <RowVideo item={item}></RowVideo>;
          }}
        ></FlatGrid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
