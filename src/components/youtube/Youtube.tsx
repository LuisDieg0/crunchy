import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  PixelRatio,
  Platform,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder,
  StatusBar,
  BackHandler,
  Image
} from "react-native";
import YoutubePlayer from "../../components/youtube/src/mobile/index";
import AppContext from "../../navigation/AppContext";
import { RectButton } from "react-native-gesture-handler";
const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;

const PlaylistVideo = ({ name, channel, views, image }) => {
  return (
    <View style={styles.playlistVideo}>
      {/* <Image
        source={image}
        style={styles.playlistThumbnail}
        resizeMode="cover"
      /> */}
      <View style={styles.playlistText}>
        <Text style={styles.playlistVideoTitle}>{name}</Text>
        <Text style={styles.playlistSubText}>{channel}</Text>
        <Text style={styles.playlistSubText}>{views} views</Text>
      </View>
    </View>
  );
};
const heightVideo = PixelRatio.roundToNearestPixel(
  Dimensions.get("window").width / (16 / 9)
);
const heightBottomTab = 40;
export default class Youtube extends React.Component {
  state = {
    videoInfo: {},
    videos: [],
    init: false,
    videoId: "",
    onchangeVideo: true,
    isFullScreen: false,
    target: {
      x: 0,
      y: 0,
      opacity: 1
    },
    origin: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }
  };
  status = 3; // 1: expand , 2: minim, 3: hide
  value = Dimensions.get("window").height - heightVideo - heightBottomTab;
  pan = new Animated.ValueXY({
    x: 0,
    y: Dimensions.get("window").height + 100
  });
  panResponder: any;
  imagePanResponder: any;

  events = {} as any;
  listenerChangeVideo: any;

  _animatedFrame = new Animated.Value(0);
  componentWillMount() {
    this.createPanResponder();
    this.createImagePanResponder();
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.status === 1 && !this.state.isFullScreen) {
        this.hide();
        return true;
      }
      if (this.status === 2 && !this.state.isFullScreen) {
        this.dissmiss();
        return true;
      }
      if (this.state.isFullScreen) {
        this.onFullScreen(false, undefined);
        return true;
      }
      return false;
    });

    this.listenerChangeVideo.addEventListener(video => {
      const {
        resourceId: { videoId },
        videos = []
      } = video;
      if (videoId === this.state.videoId && this.status !== 3) {
        this.open();
      } else {
        this.open(() => {
          console.log("videos", videos);
          this.setState({
            videoId: videoId,
            onchangeVideo: true,
            videoInfo: video,
            videos: videos
          });
          setTimeout(() => {
            this.setState({ onchangeVideo: false }, () => {});
          });
        });
      }
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () => false);
  }

  createPanResponder = () => {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
        if (this.state.isFullScreen) {
          return false;
        }
        if (gestureState.dy > 50 || gestureState.dy < 0) {
          return true;
        }
        return false;
      },
      onMoveShouldSetPanResponder: (e, gestureState) => {
        if (this.state.isFullScreen) {
          return false;
        }
        if (gestureState.dy > 50 || gestureState.dy < 0) {
          return true;
        }
        return false;
      },

      onPanResponderMove: (e, gestureState) => {
        if (this.state.isFullScreen) {
          return false;
        }
        if (
          gestureState.dy > 0 &&
          this.status === 1 &&
          gestureState.dy < this.value
        ) {
          Animated.event([null, { dy: this.pan.y }])(e, gestureState);
        }
        if (
          gestureState.dy > -this.value &&
          this.status === 2 &&
          gestureState.dy < this.value
        ) {
          const gesture = { ...gestureState };
          gesture.dy += this.value;
          Animated.event([null, { dy: this.pan.y }])(e, gesture);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (this.state.isFullScreen) {
          return false;
        }
        switch (this.status) {
          case 1:
            if (gestureState.dy > 50) {
              this.hide();
            } else {
              this.open();
            }
            break;
          case 2:
            if (gestureState.dy > 50) {
              this.dissmiss();
              break;
            }
            if (gestureState.dy < -50) {
              this.open();
            } else {
              this.hide();
            }
            break;
          case 3:
            break;

          default:
            break;
        }
      }
    });
  };

  createImagePanResponder = () => {
    this.imagePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
        return false;
      },
      onMoveShouldSetPanResponder: (e, gestureState) => {
        return false;
      }
    });
  };

  open = (callback?) => {
    this.status = 1;
    Animated.timing(this.pan, {
      toValue: { x: 0, y: 0 },
      duration: 200,
      useNativeDriver: true
    }).start(callback);
  };

  hide = () => {
    this.status = 2;
    Animated.timing(this.pan, {
      toValue: { x: 0, y: this.value },
      duration: 200,
      useNativeDriver: true
    }).start(() => {});
  };

  dissmiss = () => {
    this.status = 3;
    Animated.timing(this.pan, {
      toValue: { x: 0, y: Dimensions.get("window").height },
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      this.setState({ onchangeVideo: true });
    });
  };

  onFullScreen = (state, origin) => {
    if (state) {
      StatusBar.setHidden(true, "slide");
      this.setState({ origin }, () => {
        this.setState({ isFullScreen: true }, () => {
          Animated.spring(this._animatedFrame, {
            toValue: 1
          }).start();
        });
      });
    } else {
      StatusBar.setHidden(false, "slide");
      Animated.spring(this._animatedFrame, {
        toValue: 0
      }).start(() => {
        this.setState({ isFullScreen: false });
      });
    }
  };

  render() {
    const opacityInterpolate = this.pan.y.interpolate({
      inputRange: [0, this.value - 100],
      outputRange: [1, 0]
    });

    const { width, height: screenHeight } = Dimensions.get("window");
    const height = width * 0.5625;

    const translateYInterpolate = this.pan.y;
    const scaleInterpolate = this.pan.y.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0.5],
      extrapolate: "clamp"
    });
    const translateXInterpolate = this.pan.y.interpolate({
      inputRange: [0, 300],
      outputRange: [0, 85],
      extrapolate: "clamp"
    });
    const scrollStyles = {
      zIndex: 999,
      backgroundColor: "white",
      transform: [
        {
          translateY: translateYInterpolate
        }
      ]
    };
    const videoStyles = {
      backgroundColor: "black",
      zIndex: 999,
      transform: [
        {
          translateY: translateYInterpolate
        },
        {
          translateX: translateXInterpolate
        },
        {
          scale: scaleInterpolate
        }
      ]
    };

    const { target, origin } = this.state;

    const animateConf = {
      // transform: [
      //   {
      //     scale: this._animatedScale
      //   },
      //   {
      //     translateX: this._animatedPositionX
      //   },
      //   {
      //     translateY: this._animatedPositionY
      //   }
      // ],
      left: this._animatedFrame.interpolate({
        inputRange: [0, 1],
        outputRange: [origin.x, target.x]
      }),
      top: this._animatedFrame.interpolate({
        inputRange: [0, 1],
        outputRange: [origin.y, target.y]
      }),
      width: this._animatedFrame.interpolate({
        inputRange: [0, 1],
        outputRange: [origin.width, WINDOW_WIDTH]
      }),
      height: this._animatedFrame.interpolate({
        inputRange: [0, 1],
        outputRange: [origin.height, WINDOW_HEIGHT]
      }),
      zIndex: 999
    };
    const contentStyle = this.state.isFullScreen
      ? animateConf
      : [{ width, height }, videoStyles];
    const panResponder = this.state.isFullScreen
      ? this.imagePanResponder.panHandlers
      : this.panResponder.panHandlers;

    return (
      <AppContext.Consumer>
        {({ listenerChangeVideo }) => {
          this.listenerChangeVideo = listenerChangeVideo;
          return (
            <>
              <View
                style={StyleSheet.absoluteFill}
                pointerEvents={Platform.OS === "ios" ? "box-none" : undefined}
              >
                <Animated.View style={contentStyle} {...panResponder}>
                  {!this.state.onchangeVideo ? (
                    <YoutubePlayer
                      autoPlay
                      onFullScreen={(state: boolean, origin) => {
                        console.log("origin", origin);
                        this.onFullScreen(state, origin);
                      }}
                      loop={false}
                      topBar={() => {
                        return (
                          <View
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              top: 0
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                this.hide();
                              }}
                            >
                              <Text style={{ color: "white" }}> {"<>"} </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                      videoId={this.state.videoId}
                      onStart={() => console.log("onStart")}
                      onEnd={() => console.log("on End")}
                    ></YoutubePlayer>
                  ) : (
                    <Animated.View
                      style={[
                        {
                          backgroundColor: "black"
                        },
                        contentStyle
                      ]}
                    ></Animated.View>
                  )}
                </Animated.View>
                <Animated.FlatList
                  style={[styles.scrollView, scrollStyles]}
                  data={this.state.videos}
                  ListHeaderComponent={() => {
                    const { title, description } = this.state.videoInfo;
                    return (
                      <View style={{ padding: 5 }}>
                        <Animated.Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            opacity: opacityInterpolate
                          }}
                        >
                          {title}
                        </Animated.Text>
                        <Animated.Text
                          style={{ fontSize: 14, opacity: opacityInterpolate }}
                        >
                          {description}
                        </Animated.Text>
                      </View>
                    );
                  }}
                  extraData={this.state.videoId}
                  renderItem={({ index, item }) => {
                    const {
                      title,
                      url_imagen,
                      resourceId: { videoId } = {}
                    } = item;

                    return (
                      <RectButton
                        enabled={videoId !== this.state.videoId}
                        onPress={() => {
                          const video = item;
                          this.setState({
                            videoId: videoId,
                            onchangeVideo: true,
                            videoInfo: video
                          });
                          setTimeout(() => {
                            this.setState({ onchangeVideo: false }, () => {});
                          });
                          // changeVideo()({ ...video, video: this.state.videos });
                        }}
                        style={{
                          height: 80,
                          padding: 10,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor:
                            videoId === this.state.videoId ? "gray" : undefined
                        }}
                      >
                        <Image
                          source={{ uri: url_imagen }}
                          style={{ height: 50, width: 50 }}
                        />
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                          <Text>{title}</Text>
                        </View>
                      </RectButton>
                    );
                  }}
                />
              </View>
              <Animated.View
                style={{
                  flexDirection: "row",
                  elevation: 4,
                  height: 60,
                  backgroundColor: "#082D58",
                  transform: [
                    {
                      translateY: this.pan.y.interpolate({
                        inputRange: [
                          0,
                          this.value,
                          Dimensions.get("window").height
                        ],
                        outputRange: [60, 0, 0]
                      })
                    }
                  ]
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>Perfil</Text>
                </View>
                <RectButton
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>
                    Favoritos
                  </Text>
                </RectButton>
                <RectButton
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>
                    Notificaciones
                  </Text>
                </RectButton>
                <RectButton
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>Salir</Text>
                </RectButton>
              </Animated.View>
            </>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  buttonGroup: {
    flexDirection: "row",
    alignSelf: "center",
    paddingBottom: 5
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  player: {
    alignSelf: "stretch",
    marginVertical: 10
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF",
    elevation: 4
  },
  title: {
    fontSize: 28
  },
  likeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15
  },
  touchIcon: {
    alignItems: "center",
    justifyContent: "center"
  },
  iconText: {
    marginTop: 5
  },
  padding: {
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  channelInfo: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    borderTopWidth: 1,
    borderTopColor: "#DDD"
  },
  channelIcon: {
    width: 50,
    height: 50
  },
  channelText: {
    marginLeft: 15
  },
  channelTitle: {
    fontSize: 18,
    marginBottom: 5
  },
  playlistUpNext: {
    fontSize: 24
  },
  playlistVideo: {
    flexDirection: "row",
    height: 100,
    marginTop: 15,
    marginBottom: 15
  },
  playlistThumbnail: {
    width: 50,
    height: 50,
    flex: 1
  },
  playlistText: {
    flex: 2,
    paddingLeft: 15
  },
  playlistVideoTitle: {
    fontSize: 18
  },
  playlistSubText: {
    color: "#555"
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
//   Animated
// } from "react-native";

// import { Video } from "expo";
// import { FontAwesome as Icon } from "@expo/vector-icons";

// const Thumbnail = { uri: "http://i.imgur.com/HKVgAl0.jpg" };

// const TouchableIcon = ({ name, children }) => {
//   return (
//     <TouchableOpacity style={styles.touchIcon}>
//       <Icon name={name} size={30} color="#767577" />
//       <Text style={styles.iconText}>{children}</Text>
//     </TouchableOpacity>
//   );
// };

// import YoutubePlayer from "../../components/youtube/src/mobile/index";

// const AnimatedYoutube = Animated.createAnimatedComponent(YoutubePlayer);

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

// export default class rnvideo extends Component {
//   _panResponder: any;
//   _y = 0;
//   _animation = new Animated.Value(0);
//   componentWillMount() {
//     this._animation.addListener(({ value }) => {
//       this._y = value;
//     });

//     this._panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: (e, gestureState) => {
//         if (gestureState.dy > 10 || gestureState.dy < 0) {
//           return true;
//         }
//         return false;
//       },
//       onMoveShouldSetPanResponder: (e, gestureState) => {
//         if (gestureState.dy > 10 || gestureState.dy < 0) {
//           return true;
//         }
//         return false;
//       },
//       onPanResponderMove: Animated.event([
//         null,
//         {
//           dy: this._animation
//         }
//       ]),
//       onPanResponderRelease: (e, gestureState) => {
//         if (gestureState.dy > 100) {
//           Animated.timing(this._animation, {
//             toValue: 300,
//             duration: 200
//           }).start();
//           this._animation.setOffset(300);
//         } else {
//           this._animation.setOffset(0);
//           Animated.timing(this._animation, {
//             toValue: 0,
//             duration: 200
//           }).start();
//         }
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

// const translateYInterpolate = this._animation.interpolate({
//   inputRange: [0, 300],
//   outputRange: [0, screenHeight - height],
//   extrapolate: "clamp"
// });

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
//           translateY: translateYInterpolate
//         },
//         {
//           translateX: translateXInterpolate
//         },
//         {
//           scale: scaleInterpolate
//         }
//       ]
//     };

//     return (
//       <>
//         <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
//           <Animated.View
//             style={[{ width, height }, videoStyles]}
//             {...this._panResponder.panHandlers}
//           >
//             <AnimatedYoutube
//               // {...this.panResponder.panHandlers}
//               // topBar={TopBar}
//               videoId="QVcOETUce98"
//               // autoPlay
//               //onFullScreen={this.onFullScreen}
//               onStart={() => console.log("onStart")}
//               onEnd={() => console.log("on End")}
//             ></AnimatedYoutube>
//           </Animated.View>
//           <Animated.ScrollView style={[styles.scrollView, scrollStyles]}>
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
//               <Text style={styles.playlistUpNext}>Up next</Text>
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
//               <PlaylistVideo
//                 image={Thumbnail}
//                 name="Next Sweet DJ Video"
//                 channel="Prerecorded MP3s"
//                 views="380K"
//               />
//             </View>
//           </Animated.ScrollView>
//         </View>
//       </>
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
//     width: null,
//     height: null,
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
