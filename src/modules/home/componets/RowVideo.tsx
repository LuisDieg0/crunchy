import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

type Props = {
  item: any;
};
export default class RowVideo extends Component<Props> {
  render() {
    const { item: { name } = {} } = this.props;
    return (
      <View style={styles.row}>
        <Text> {name} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    height: 40,
    flex: 1,
    borderWidth: 1
  }
});
