import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import RowVideo from "../animes/componets/RowVideo";
import { FlatGrid } from "react-native-super-grid";

type Props = {
  data: any[];
  navigation: any;
};

export default class AnimeView extends Component<Props> {
  constructor(props: any) {
    super(props);
  }
  state = {};

  render() {
    const { data = [], navigation } = this.props;
    return (
      <View style={styles.container}>
        <FlatGrid
          initialNumToRender={10}
          centerContent
          itemDimension={150}
          data={data}
          renderItem={({ item, index }) => {
            return <RowVideo item={item} navigation={navigation}></RowVideo>;
          }}
        ></FlatGrid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
