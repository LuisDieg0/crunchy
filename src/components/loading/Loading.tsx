import React from "react";
import { StyleSheet, View, ActivityIndicator, Platform } from "react-native";
import colors from "../../styles/colors";
import { LoadingProps } from "@gotumi-components";
export default function loading({
  showLoading,
  style,
  styleIndicator,
  color,
  transparent = false
}: LoadingProps) {
  return showLoading ? (
    <View
      style={
        style || [
          styles.loading,
          transparent ? undefined : { backgroundColor: "black" }
        ]
      }
    >
      <ActivityIndicator
        color={color || colors.blue}
        size={Platform.OS === "ios" ? 0 : undefined}
      />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    justifyContent: "center",
    alignItems: "center"
  }
});
