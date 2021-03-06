import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";
type Props = {
  item: any;
  navigation: any;
  changeVideo: any;
};
export default class RowVideo extends Component<Props> {
  render() {
    const {
      item: { title, subTitle, image } = {},
      navigation,
      changeVideo
    } = this.props;
    return (
      <View style={styles.row}>
        <RectButton
          onPress={() => {
            changeVideo()({});
            // navigation.navigate("$routes.videos");
          }}
        >
          <FastImage
            source={{
              uri: image
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
