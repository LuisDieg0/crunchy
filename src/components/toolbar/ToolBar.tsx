import React, { Component } from "react";
import {
  View,
  StatusBar,
  Platform,
  NativeModules,
  StyleSheet
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { HeaderBackButton } from "@react-navigation/stack";
// import { ToolbarProps } from "@gotumi-components";

const { StatusBarManager = {} } = NativeModules;

export const statusBarHeight =
  Platform.OS === "ios"
    ? getStatusBarHeight()
    : StatusBarManager.HEIGHT === 0
    ? 30
    : StatusBarManager.HEIGHT;
export default function ToolBar(params: any) {
  return (
    <View>
      <View
        style={{
          height: params.hideStatusBar ? 0 : statusBarHeight,
          backgroundColor: params.backgroundStatusBar
        }}
      >
        {params.closeOnDragDown && (
          <View style={styles.draggableContainer}>
            <View style={[styles.draggableIcon]} />
          </View>
        )}
      </View>

      {!params.hideToolbar && (
        <View
          style={{
            height: 55,
            backgroundColor: params.backgroundToolbar
          }}
        >
          <View
            style={{
              height: 55,
              width: 53,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {params.content && params.content()}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  draggableContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  draggableIcon: {
    width: 35,
    height: 5,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "#ccc"
  }
});



// import React, { Component } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   PanResponder,
//   Animated,
//   PixelRatio,
//   Platform
// } from "react-native";
// import YouTube, {
//   YouTubeStandaloneIOS,
//   YouTubeStandaloneAndroid
// } from "react-native-youtube";
// import enviroment from "./src/enviroment";
// // import { Video } from "expo";
// import { FontAwesome as Icon } from "@expo/vector-icons";
// import ToolBar, { statusBarHeight } from "./src/components/toolbar/ToolBar";
// const Lights = {
//   uri:
//     "https://player.vimeo.com/external/207277102.hd.mp4?s=6939b93ae3554679b57f5e7fa831eef712a74b3c&profile_id=119&oauth2_token_id=57447761"
// };
// const Thumbnail = { uri: "" };
// const ChannelIcon = { uri: "http://i.imgur.com/PsM60Ky.png" };

// const TouchableIcon = ({ name, children }) => {
//   return (
//     <TouchableOpacity style={styles.touchIcon}>
//       <Icon name={name} size={30} color="#767577" />
//       <Text style={styles.iconText}>{children}</Text>
//     </TouchableOpacity>
//   );
// };

// const PlaylistVideo = ({ name, channel, views, image }) => {
//   return (
//     <View style={styles.playlistVideo}>
//       <Image
//         source={image}
//         style={styles.playlistThumbnail}
//         resizeMode="cover"
//       />
//       <View style={styles.playlistText}>
//         <Text style={styles.playlistVideoTitle}>{name}</Text>
//         <Text style={styles.playlistSubText}>{channel}</Text>
//         <Text style={styles.playlistSubText}>{views} views</Text>
//       </View>
//     </View>
//   );
// };
// const AnimatedYoutube = Animated.createAnimatedComponent(YouTube);

// export default class rnvideo extends Component {
//   componentWillMount() {
//     this._y = 0;
//     this._animation = new Animated.Value(0);
//     this._animation.addListener(({ value }) => {
//       this._y = value;
//     });

//     this._panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: Animated.event([
//         null,
//         {
//           dy: this._animation
//         }
//       ]),
//       onPanResponderRelease: (e, gestureState) => {
//         // if (gestureState.dy > 100) {
//         //   Animated.timing(this._animation, {
//         //     toValue: 300,
//         //     duration: 200
//         //   }).start();
//         //   this._animation.setOffset(300);
//         // } else {
//         //   this._animation.setOffset(0);
//         //   Animated.timing(this._animation, {
//         //     toValue: 0,
//         //     duration: 200
//         //   }).start();
//         // }
//       }
//     });
//   }
//   handleOpen = () => {
//     this._animation.setOffset(0);
//     Animated.timing(this._animation, {
//       toValue: 0,
//       duration: 200
//     }).start();
//   };
//   render() {
//     const { width, height: screenHeight } = Dimensions.get("window");
//     const height = width * 0.5625;

//     const opacityInterpolate = this._animation.interpolate({
//       inputRange: [0, 300],
//       outputRange: [1, 0]
//     });

//     const translateYInterpolate = this._animation.interpolate({
//       inputRange: [0, 300],
//       outputRange: [0, screenHeight - (height - 50)],
//       extrapolate: "clamp"
//     });

//     const scaleInterpolate = this._animation.interpolate({
//       inputRange: [0, 300],
//       outputRange: [1, 0.5],
//       extrapolate: "clamp"
//     });

//     const translateXInterpolate = this._animation.interpolate({
//       inputRange: [0, 300],
//       outputRange: [0, 85],
//       extrapolate: "clamp"
//     });

//     const scrollStyles = {
//       opacity: opacityInterpolate,
//       transform: [
//         {
//           translateY: translateYInterpolate
//         }
//       ]
//     };

//     const videoStyles = {
//       transform: [
//         {
//           translateY: this._animation
//         }
//         // {
//         //   translateX: translateXInterpolate
//         // },
//         // {
//         //   scale: scaleInterpolate
//         // }
//       ]
//     };

//     return (
//       <View style={{ flex: 1 }}>
//         {/* {Platform.OS === "ios" && (
//           <View style={{ height: statusBarHeight, backgroundColor: "white" }} />
//         )} */}
//         <ToolBar hideStatusBar></ToolBar>

//         {/* <TouchableOpacity onPress={this.handleOpen}>
//             <Text>Content Below: Click To Reopen Video</Text>
//           </TouchableOpacity> */}

//         <Animated.View
//           {...this._panResponder.panHandlers}
//           style={[
//             // videoStyles,
//             {
//               backgroundColor: "gray"
//             }
//           ]}
//         >
//           <View>
//             <Text>drag</Text>
//           </View>
//         </Animated.View>

//         <AnimatedYoutube
//           // ref={this._youTubeRef}
//           apiKey={enviroment.API_KEY_GOOGLE}
//           videoIds={[
//             "uMK0prafzw0",
//             "qzYgSecGQww",
//             "XXlZfc1TrD0",
//             "czcjU1w-c6k"
//           ]}
//           play={true}
//           playlistId="PLF797E961509B4EB5"
//           style={[
//             {
//               width,
//               height
//             },
//             videoStyles
//           ]}
//           onError={e => {
//             this.setState({ error: e.error });
//           }}
//           onReady={e => {
//             this.setState({ isReady: true });
//           }}
//           onChangeState={e => {
//             console.log("e", e);
//             this.setState({ status: e.state });
//           }}
//           onChangeQuality={e => {
//             this.setState({ quality: e.quality });
//           }}
//           onChangeFullscreen={e => {
//             this.setState({ fullscreen: e.isFullscreen });
//           }}
//           onProgress={e => {
//             // this.setState({ currentTime: e.currentTime });
//           }}
//         ></AnimatedYoutube>

//         {/* <Animated.ScrollView style={[styles.scrollView, scrollStyles]}>
//             <View style={styles.padding}>
//               <Text style={styles.title}>
//                 Bienvenido a ISO’s WareTV - Estructura
//               </Text>
//               <Text>
//                 Conoce la estructura y beneficios que tenemos para ti y tu
//                 empresa.
//               </Text>
//             </View>

//             <View style={[styles.playlist, styles.padding]}>
//               <Text style={styles.playlistUpNext}>Videos del módulo</Text>
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Registro de Obra"
//                 channel="Bienvenido a ISOSwareTV, acá podrás solucionar todas tus dudas relacionadas a la app ISOSware."
//               />
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Next Sweet DJ Video"
//                 channel="Prerecorded MP3s"
//                 views="380K"
//               />
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Next Sweet DJ Video"
//                 channel="Prerecorded MP3s"
//                 views="380K"
//               />
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Next Sweet DJ Video"
//                 channel="Prerecorded MP3s"
//                 views="380K"
//               />
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Next Sweet DJ Video"
//                 channel="Prerecorded MP3s"
//                 views="380K"
//               />
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Next Sweet DJ Video"
//                 channel="Prerecorded MP3s"
//                 views="380K"
//               />
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Next Sweet DJ Video"
//                 channel="Prerecorded MP3s"
//                 views="380K"
//               />
//             </View>
//           </Animated.ScrollView> */}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   scrollView: {
//     flex: 1,
//     backgroundColor: "#FFF"
//   },
//   title: {
//     fontSize: 28
//   },
//   likeRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 15
//   },
//   touchIcon: {
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   iconText: {
//     marginTop: 5
//   },
//   padding: {
//     paddingVertical: 15,
//     paddingHorizontal: 15
//   },
//   channelInfo: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#DDD",
//     borderTopWidth: 1,
//     borderTopColor: "#DDD"
//   },
//   channelIcon: {
//     width: 50,
//     height: 50
//   },
//   channelText: {
//     marginLeft: 15
//   },
//   channelTitle: {
//     fontSize: 18,
//     marginBottom: 5
//   },
//   playlistUpNext: {
//     fontSize: 24
//   },
//   playlistVideo: {
//     flexDirection: "row",
//     height: 100,
//     marginTop: 15,
//     marginBottom: 15
//   },
//   playlistThumbnail: {
//     width: 50,
//     height: 50,
//     flex: 1
//   },
//   playlistText: {
//     flex: 2,
//     paddingLeft: 15
//   },
//   playlistVideoTitle: {
//     fontSize: 18
//   },
//   playlistSubText: {
//     color: "#555"
//   }
// });
