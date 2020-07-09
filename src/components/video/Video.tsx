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
  Image,
  Alert
} from "react-native";
import {
  immersiveModeOn,
  immersiveModeOff
} from "react-native-android-immersive-mode";
// import Video from "react-native-video";
import Video, { ProgressBar, ControlBar } from "./src/index";
import AppContext from "../../navigation/AppContext";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";
// import Row from "./Row";
const heightBottomTab = 60;
export default class Youtube extends React.Component {
  state = {
    videoInfo: {},
    videos: [],
    init: false,
    videoId: "",
    onchangeVideo: true,
    isFullScreen: false,
    rotation: "",
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
  value = Dimensions.get("window").height;
  pan = new Animated.ValueXY({
    x: 0,
    y: Dimensions.get("window").height
  });
  window: any;
  panResponder: any;
  imagePanResponder: any;
  heightVideo = 0;
  widthVideo = 0;
  events = {} as any;
  listenerChangeVideo: any;
  listenerChangeDimension: any;
  _animatedFrame = new Animated.Value(0);
  onProgress = () => {};
  isInmersiveMode = false;
  componentWillMount() {
    this.createPanResponder();
    this.createImagePanResponder();
  }

  onInmersiveMode(status) {
    this.isInmersiveMode = status;
    if (status) {
      immersiveModeOn();
    } else {
      immersiveModeOff();
    }
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.status === 1 && !this.state.isFullScreen) {
        this.hide();
        return true;
      }
      // if (this.status === 2 && !this.state.isFullScreen) {
      //   this.dissmiss();
      //   return true;
      // }
      if (this.state.isFullScreen) {
        this.refYoutube.toggleFS();
        return true;
      }
      return false;
    });

    this.listenerChangeDimension.addEventListener((e: any) => {
      if (e.isPortail()) {
        StatusBar.setHidden(false);
        this.onInmersiveMode(false);
      } else {
        StatusBar.setHidden(true);
        this.onInmersiveMode(true);
      }
      this.restartPositions();
    });

    this.listenerChangeVideo.addEventListener((video = {}) => {
      const { videos = [], videoId = "" } = video;
      if (videoId === this.state.videoId && this.status !== 3) {
        this.open();
      } else {
        this.open(() => {
          this.setState(
            {
              videoId: videoId,
              onchangeVideo: true,
              videoInfo: video,
              videos: videos
            },
            () => {
              this.setState({ onchangeVideo: false });
            }
          );
        });
      }
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () => false);
  }

  restartPositions = () => {
    switch (this.status) {
      case 1:
        this.open();
        break;
      case 2:
        this.hide();
        break;
      case 3:
        this.dissmiss();
        break;
      default:
        break;
    }
  };
  private createPanResponder = () => {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
        if (this.state.isFullScreen) {
          return false;
        }
        if (gestureState.dy > 50 || gestureState.dy < -50) {
          return true;
        }
        return false;
      },
      onMoveShouldSetPanResponder: (e, gestureState) => {
        if (this.state.isFullScreen) {
          return false;
        }
        if (gestureState.dy > 50 || gestureState.dy < -50) {
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

  private createImagePanResponder = () => {
    this.imagePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return false;
      },
      onMoveShouldSetPanResponder: () => {
        return false;
      }
    });
  };

  open = (callback?: any) => {
    this.status = 1;
    Animated.timing(this.pan, {
      toValue: { x: 0, y: 0 },
      duration: 200
      // useNativeDriver: true
    }).start(callback);
  };

  hide = () => {
    this.status = 2;
    Animated.timing(this.pan, {
      toValue: { x: 0, y: this.value },
      duration: 200
      // useNativeDriver: true
    }).start(() => {});
  };

  dissmiss = () => {
    this.status = 3;
    Animated.timing(this.pan, {
      toValue: { x: 0, y: this.window.height },
      duration: 200
      // useNativeDriver: true
    }).start(() => {
      this.setState({ onchangeVideo: true });
    });
  };

  onFullScreen = (state: boolean, origin: any) => {
    if (state) {
      this.setState({ origin }, () => {
        this.setState({ isFullScreen: true }, () => {
          Animated.timing(this._animatedFrame, {
            toValue: 1,
            duration: 200
          }).start(() => {
            this.onInmersiveMode(true);
          });
        });
      });
    } else {
      this.onInmersiveMode(false);
      setTimeout(() => {
        Animated.timing(this._animatedFrame, {
          toValue: 0,
          duration: 200
        }).start(() => {
          setTimeout(() => {
            this.setState({ isFullScreen: false }, () => {});
          }, 20);
        });
      }, 20);
    }
  };

  render() {
    const { target, origin } = this.state;
    const { closeSesion, getNavigation } = this.props;
    const panResponder = this.state.isFullScreen
      ? this.imagePanResponder.panHandlers
      : this.panResponder.panHandlers;

    return (
      <AppContext.Consumer>
        {({ listenerChangeVideo, getDimension, listenerChangeDimension }) => {
          this.listenerChangeVideo = listenerChangeVideo;
          this.listenerChangeDimension = listenerChangeDimension;
          const { screen, window, isPortail } = getDimension()();
          const heightVideo = isPortail()
            ? window.height / (16 / 9)
            : this.isInmersiveMode
            ? screen.height
            : window.height;
          const widthVideo = window.width;
          this.window = getDimension()().window;
          this.heightVideo = heightVideo;
          this.widthVideo = widthVideo;
          this.value = window.height - heightBottomTab - 100;

          // fullScreen animated
          const zoomConfig = {
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
              outputRange: [origin.width, screen.width]
            }),
            height: this._animatedFrame.interpolate({
              inputRange: [0, 1],
              outputRange: [origin.height, screen.height]
            }),
            zIndex: 999
          };
          //
          const translateY = this.pan.y;

          const width = translateY.interpolate({
            inputRange: [0, this.value / 4, this.value],
            outputRange: [widthVideo, widthVideo, window.width * 0.2],
            extrapolate: "clamp"
          });
          const height = translateY.interpolate({
            inputRange: [0, this.value / 4, this.value],
            outputRange: [heightVideo, heightVideo, 60],
            extrapolate: "clamp"
          });

          const videoStyles = {
            backgroundColor: "red",
            width,
            height,
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [0, this.value],
                  outputRange: [isPortail() ? window.height * 0.1 : 0, 0],
                  extrapolate: "clamp"
                })
              }
            ]
          };
          const contentStyle = {
            backgroundColor: "green",
            flex: 1,
            transform: [
              {
                translateY
              }
            ]
          };
          const contentVideo = this.state.isFullScreen
            ? zoomConfig
            : [videoStyles];
          return (
            <>
              <View
                style={StyleSheet.absoluteFill}
                pointerEvents={Platform.OS === "ios" ? "box-none" : undefined}
              >
                <Animated.View style={contentStyle} {...panResponder}>
                  <Animated.View
                    style={[
                      {
                        backgroundColor: "red"
                      },
                      contentVideo
                    ]}
                  >
                    <Video
                      autoPlay
                      onProgress={() => this.onProgress}
                      url={
                        "https://dl.v.vrv.co/evs1/7970086ac80213034c19abf15b16f873/assets/60b2cc20e2014699c3d5e377b69ebb2c_,3837054.mp4,3837056.mp4,3837052.mp4,3837050.mp4,3837048.mp4,.urlset/master.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9kbC52LnZydi5jby9ldnMxLzc5NzAwODZhYzgwMjEzMDM0YzE5YWJmMTViMTZmODczL2Fzc2V0cy82MGIyY2MyMGUyMDE0Njk5YzNkNWUzNzdiNjllYmIyY18sMzgzNzA1NC5tcDQsMzgzNzA1Ni5tcDQsMzgzNzA1Mi5tcDQsMzgzNzA1MC5tcDQsMzgzNzA0OC5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTU5NDMzMDY4N319fV19&Signature=UT8LIFvNdt0AAdLk00gqN-i-9PLk6tvP5T6Dm1ttXiW0Qlxdzzz-N~sIR5uyr0u7ncL6xadi5MyLJO0hN2-ZmEv4NhMLpt43wv54BJhC5ahGY9SfotB5zvDtMiyYYUoinbKb-7orCQFqkUtgnWQChCJ6Vx3cVODJWsZZnXE6DOf8nK0w0EM5pBtvjlSJ3iiBEIbug1~UsxEdJMxm4FtOFc6nd30TzE7DJQGH3VYKqCEdL7YOAkn96tfk0hYcnIfBFmcpiDt5Urk0t5V4t2PPs7O4KDZ6a3ieGpeG3yG~R7yRUPgyL75kWSojWEWeIHIVZw7-vAaxJ6CwFyC2tyXjQw__&Key-Pair-Id=DLVR"
                      }
                    />
                  </Animated.View>
                  <View
                    style={{
                      zIndex: 99,
                      flexDirection: "row",
                      height: 60,
                      ...StyleSheet.absoluteFillObject
                    }}
                  >
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      activeOpacity={1}
                      onPress={() => {
                        if (this.status === 1) {
                          this.hide();
                        } else {
                          this.open();
                        }
                      }}
                    >
                      <Animated.Text
                        style={{
                          color: "white",
                          opacity: translateY.interpolate({
                            inputRange: [0, this.value],
                            outputRange: [1, 0],
                            extrapolate: "clamp"
                          })
                        }}
                      >
                        Abajo
                      </Animated.Text>
                    </TouchableOpacity>
                    <Animated.View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: translateY.interpolate({
                          inputRange: [0, this.value],
                          outputRange: [0, 1],
                          extrapolate: "clamp"
                        })
                      }}
                    >
                      <BorderlessButton
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 10
                        }}
                        activeOpacity={1}
                        onPress={() => {
                          this.dissmiss();
                        }}
                      >
                        <Text style={{ color: "white" }}>X</Text>
                      </BorderlessButton>
                    </Animated.View>
                  </View>
                  <Animated.View
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      top: window.height * 0.5
                    }}
                  ></Animated.View>
                </Animated.View>
              </View>

              <Animated.View
                style={{
                  flexDirection: "row",
                  elevation: 4,
                  height: heightBottomTab,
                  backgroundColor: "#082D58",
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  transform: [
                    {
                      translateY: this.state.isFullScreen
                        ? this._animatedFrame.interpolate({
                            inputRange: [0, 1],
                            outputRange: [this.status === 2 ? 0 : 60, 60]
                          })
                        : translateY.interpolate({
                            inputRange: [0, this.value, window.height],
                            outputRange: [60, 0, 0]
                          })
                    }
                  ]
                }}
              >
                <RectButton
                  onPress={() => {
                    getNavigation().navigate("$routes.home");
                  }}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {/* <Image
                    style={{ height: 20, width: 20, resizeMode: "contain" }}
                    source={require("../../../assets/ic_home.png")}
                  /> */}
                  <Text
                    style={{ color: "white", fontSize: 12 }}
                    numberOfLines={1}
                  >
                    Inicio
                  </Text>
                </RectButton>
                <RectButton
                  onPress={() => {
                    getNavigation().navigate("$routes.new");
                  }}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {/* <Image
                    style={{ height: 20, width: 20, resizeMode: "contain" }}
                    source={require("../../../assets/ic_favorite.png")}
                  /> */}

                  <Text
                    style={{ color: "white", fontSize: 12 }}
                    numberOfLines={1}
                  >
                    Nuevos
                  </Text>
                </RectButton>
                <RectButton
                  onPress={() => {
                    getNavigation().navigate("$routes.anime");
                  }}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {/* <Image
                    style={{ height: 20, width: 20, resizeMode: "contain" }}
                    source={require("../../../assets/ic_favorite.png")}
                  /> */}

                  <Text
                    style={{ color: "white", fontSize: 12 }}
                    numberOfLines={1}
                  >
                    animes
                  </Text>
                </RectButton>

                <RectButton
                  onPress={() => {
                    Alert.alert(
                      "",
                      "¿Desea cerrar sesión?",
                      [
                        {
                          text: "Aceptar",
                          onPress: () => {
                            // closeSesion();
                          }
                        },
                        {
                          text: "Cancelar"
                        }
                      ],
                      { cancelable: true }
                    );
                  }}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {/* <Image
                    style={{ height: 20, width: 20, resizeMode: "contain" }}
                    source={require("../../../assets/ic_close.png")}
                  /> */}

                  <Text
                    style={{ color: "white", fontSize: 12 }}
                    numberOfLines={1}
                  >
                    Salir
                  </Text>
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
