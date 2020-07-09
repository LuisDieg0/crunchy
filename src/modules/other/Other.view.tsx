import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import RowChapter from "../animes/componets/RowChapter";
import { FlatGrid } from "react-native-super-grid";

export default class AnimeView extends Component<any> {
  constructor(props: any) {
    super(props);
  }
  state = {};

  render() {
    const {
      data: { chapters = [], description, title },
      navigation,
    } = this.props;

    return (
      <View style={styles.container}>
        <FlatGrid
          initialNumToRender={10}
          centerContent
          itemDimension={250}
          data={chapters}
          ListHeaderComponent={() => {
            return (
              <>
                <View style={{ alignItems: "center" }}>
                  <View>
                    <Text style={styles.textTitle}>{title}</Text>
                  </View>
                </View>

                <View style={{ marginBottom: 19 }}>
                  <Text style={styles.textDescription}>{description}</Text>
                </View>
              </>
            );
          }}
          renderItem={({ item, index }) => {
            return (
              <RowChapter item={item} navigation={navigation}></RowChapter>
            );
          }}
        ></FlatGrid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
  },
  textDescription: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#22a6b3",
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
