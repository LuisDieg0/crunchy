import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import RowVideo from "./componets/RowVideo";
import { FlatGrid } from "react-native-super-grid";
import auth from "@react-native-firebase/auth";

export default class HomeView extends Component {
  constructor(props) {
    super(props);
  }
  state = {};

  render() {
    const { data = [], navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            auth().signOut();
          }}
        >
          <Text>SignOutOut</Text>
        </TouchableOpacity>
        <FlatGrid
          initialNumToRender={10}
          centerContent
          itemDimension={250}
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
    flex: 1
  }
});
