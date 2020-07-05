import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";
type Props = {
  item: any;
};
export default class RowVideo extends Component<Props> {
  render() {
    const { item: { title, subTitle } = {} } = this.props;
    return (
      <View style={styles.row}>
        <RectButton>
          <FastImage
            source={{
              uri:
                "https://img1.ak.crunchyroll.com/i/spire1-tmb/6fc4c43b87042818082975dc03ea87ae1592991257_fwidestar.jpg"
            }}
            resizeMode={"contain"}
            style={styles.image}
          ></FastImage>
        </RectButton>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textSubTitle}>{subTitle}</Text>
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
                resizeMode: "contain"
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
    height: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  image: {
    height: 250,
    width: "100%"
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  textSubTitle: {
    fontSize: 15
  }
});
