import { StyleSheet } from "react-native";
import { VideoSize } from "./Utils";

const styles = StyleSheet.create({
  inline: {
    //flex: 0,
    zIndex: 100,
    // backgroundColor: "#000",
    ...StyleSheet.absoluteFillObject
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject
  },
  button: {
    borderColor: "#000",
    borderWidth: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    borderRadius: 15
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,

    // height: VideoSize.inline.height,
    // width: VideoSize.inline.width,

    //paddingTop: 30,
    backgroundColor: "#000"
    // overflow: "visible"
  }
});

export default styles;
