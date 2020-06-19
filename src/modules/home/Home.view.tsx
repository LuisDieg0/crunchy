import React, { Component } from "react";
import { Text, View, Image, Platform } from "react-native";
import YouTube from "../../components/youtube/Youtube";
import { TouchableOpacity } from "react-native-gesture-handler";
import { statusBarHeight } from "../../components/toolbar/ToolBar";

export default class HomeView extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {Platform.OS === "ios" && <View style={{ height: statusBarHeight }} />}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            marginTop: 10
          }}
        >
          <Image
            style={{ height: 80, width: 200, resizeMode: "contain" }}
            source={require("../../../assets/ic_logo.png")}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.closeSesion();
          }}
        >
          <Text>Cerrar sesion</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
