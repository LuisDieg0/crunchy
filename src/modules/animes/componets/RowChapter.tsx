import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";
type Props = {
  item: any;
  navigation: any;
};
export default class RowChapter extends Component<Props> {
  render() {
    const { item: { title, chap, image } = {}, navigation } = this.props;
    return (
      <View style={styles.row}>
        <RectButton
          onPress={() => {
            navigation.navigate("$routes.chapter");
          }}
        >
          <FastImage
            source={{
              uri: image,
            }}
            resizeMode={"contain"}
            style={styles.image}
          ></FastImage>
        </RectButton>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textChap}>{chap}</Text>
          </View>
          <BorderlessButton
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Image
              source={require("../../../../assets/three_points.png")}
              style={{
                height: 40,
                width: 40,
                tintColor: "black",
                resizeMode: "contain",
              }}
            ></Image>
          </BorderlessButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: "white",
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    height: 100,
    width: "100%",
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textChap: {
    fontSize: 15,
  },
});
