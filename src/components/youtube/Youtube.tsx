import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  PixelRatio,
  Platform,
  Button,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  PanResponder,
  Image,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import YouTube from "react-native-youtube";
import enviroment from "../../enviroment";
import { statusBarHeight } from "../toolbar/ToolBar";

const AnimatedYoutube = Animated.createAnimatedComponent(YouTube);
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
const Thumbnail = { uri: "" };
const heightVideo = PixelRatio.roundToNearestPixel(
  Dimensions.get("window").width / (16 / 9)
);
const heightDrag = 50;
const heightToolbar = 60;
export default class ReactNativeYouTubeExample extends React.Component {
  state = { init: false, controls: 1 };
  isOpen = true;
  isTranslateY = false;

  value = Dimensions.get("window").height - heightVideo - heightToolbar;
  pan = new Animated.ValueXY({ x: 0, y: this.value });
  panResponder: any;
  events = {} as any;
  componentWillMount() {
    this.createPanResponder();
  }

  componentDidMount() {
    this.open();
    this.pan.y.addListener(({ value }) => {
      console.log("animated", value);
      if (value === this.value && this.state.controls === 1) {
        this.setState({ controls: 2 });
      }
      if (value === 0 && this.state.controls === 2) {
        this.setState({ controls: 1 });
      }
    });
  }

  createPanResponder = () => {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderEnd: (e, gestureState) => {},

      onPanResponderMove: (e, gestureState) => {
        if (
          gestureState.dy > 0 &&
          this.isOpen &&
          gestureState.dy < this.value
        ) {
          Animated.event([null, { dy: this.pan.y }])(e, gestureState);
        }
        if (
          gestureState.dy > -this.value &&
          !this.isOpen &&
          gestureState.dy < this.value
        ) {
          const gesture = { ...gestureState };
          gesture.dy += this.value;
          Animated.event([null, { dy: this.pan.y }])(e, gesture);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (this.value / 4 - gestureState.dy < 0) {
          this.hide();
        } else {
          this.open();
        }
      }
    });
  };

  open = (onlyReinitTanslateY?: boolean) => {
    const { onChangeStatus = (status: boolean) => {} } = this.props;
    if (onlyReinitTanslateY) {
      this.hide();
      return;
    }
    Animated.timing(this.pan, {
      toValue: { x: 0, y: 0 },
      duration: 200
      // useNativeDriver: true
    }).start(() => {});
    this.isOpen = true;
    onChangeStatus(true);
  };
  hide = (translateY?: boolean) => {
    const { onChangeStatus = (status: boolean) => {} } = this.props;
    this.isTranslateY = translateY || false;
    Animated.timing(this.pan, {
      toValue: { x: 0, y: this.value + (translateY ? 100 : 0) },
      duration: 200
      // useNativeDriver: true
    }).start(() => {});
    this.isOpen = false;
    onChangeStatus(false);
  };

  renderHeader = () => {
    return (
      <View
        style={[
          {
            alignItems: "flex-end",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            backgroundColor: "white"
          }
        ]}
      >
        <View style={{ height: heightDrag }}></View>
      </View>
    );
  };
  render() {
    const opacityInterpolate = this.pan.y.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0]
    });

    const scrollStyles = {
      opacity: opacityInterpolate,
      transform: [
        {
          translateY: this.pan.y
        }
      ]
    };
    const translateXInterpolate = this.pan.y.interpolate({
      inputRange: [0, 290, Dimensions.get("window").height - 200],
      outputRange: [0, 60, 90],
      extrapolate: "clamp"
    });

    const panStyle = {
      width: this.pan.y.interpolate({
        inputRange: [0, this.value],
        outputRange: [
          Dimensions.get("window").width,
          Dimensions.get("window").width - 90
        ]
      }),
      height: this.pan.y.interpolate({
        inputRange: [0, this.value],
        outputRange: [heightVideo, heightVideo - 60]
      }),
      transform: [
        {
          translateY: this.pan.y
        },
        {
          translateX: translateXInterpolate
        }
      ]
    };

    return (
      <>
        <Animated.View
          style={[
            {
              position: "absolute",
              top: heightVideo + heightToolbar,
              left: 0,
              right: 0,
              bottom: 0
            }
          ]}
        >
          <Animated.ScrollView style={[styles.scrollView, scrollStyles]}>
            <View style={styles.padding}>
              <Text style={styles.title}>
                Bienvenido a ISO’s WareTV - Estructura
              </Text>
              <Text>
                Conoce la estructura y beneficios que tenemos para ti y tu
                empresa.
              </Text>
            </View>

            <View style={[styles.playlist, styles.padding]}>
              <Text style={styles.playlistUpNext}>Videos del módulo</Text>
              <PlaylistVideo
                image={Thumbnail}
                name="Registro de Obra"
                channel="Bienvenido a ISOSwareTV, acá podrás solucionar todas tus dudas relacionadas a la app ISOSware."
              />

              <PlaylistVideo
                image={Thumbnail}
                name="Registro de Obra"
                channel="Bienvenido a ISOSwareTV, acá podrás solucionar todas tus dudas relacionadas a la app ISOSware."
              />
              <PlaylistVideo
                image={Thumbnail}
                name="Registro de Obra"
                channel="Bienvenido a ISOSwareTV, acá podrás solucionar todas tus dudas relacionadas a la app ISOSware."
              />
              <PlaylistVideo
                image={Thumbnail}
                name="Registro de Obra"
                channel="Bienvenido a ISOSwareTV, acá podrás solucionar todas tus dudas relacionadas a la app ISOSware."
              />
              <PlaylistVideo
                image={Thumbnail}
                name="Registro de Obra"
                channel="Bienvenido a ISOSwareTV, acá podrás solucionar todas tus dudas relacionadas a la app ISOSware."
              />
              <PlaylistVideo
                image={Thumbnail}
                name="Registro de Obra"
                channel="Bienvenido a ISOSwareTV, acá podrás solucionar todas tus dudas relacionadas a la app ISOSware."
              />
            </View>
          </Animated.ScrollView>
        </Animated.View>
        <Animated.View
          style={[
            panStyle,
            {
              position: "absolute",
              top:
                heightToolbar + (Platform.OS === "ios" ? statusBarHeight : 0),
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 100
            }
          ]}
        >
          <Animated.View {...this.panResponder.panHandlers} style={[{}]}>
            {this.renderHeader()}
          </Animated.View>
          <AnimatedYoutube
            // ref={this._youTubeRef}
            apiKey={enviroment.API_KEY_GOOGLE}
            videoIds={[
              "uMK0prafzw0",
              "qzYgSecGQww",
              "XXlZfc1TrD0",
              "czcjU1w-c6k"
            ]}
            controls={this.state.controls}
            playlistId="PLF797E961509B4EB5"
            style={[
              StyleSheet.absoluteFill,
              {
                flex: 1,
                marginTop: 20
              }
            ]}
            onError={e => {
              // this.setState({ error: e.error });
            }}
            onReady={e => {
              // this.setState({ isReady: true });
            }}
            onChangeState={e => {
              console.log("e", e);
              // this.setState({ status: e.state });
            }}
            onChangeQuality={e => {
              // this.setState({ quality: e.quality });
            }}
            onChangeFullscreen={e => {
              // this.setState({ fullscreen: e.isFullscreen });
            }}
            onProgress={e => {
              console.log(e);
            }}
            showinfo={false}
            modestbranding={true}
          ></AnimatedYoutube>
        </Animated.View>
        <StickHeader
          onPressSearch={() => {
            this.hide();
          }}
        ></StickHeader>
      </>
    );
  }
}

export class StickHeader extends Component {
  SCREEN_WIDTH = Dimensions.get("window").width;
  searchAnim = new Animated.Value(this.SCREEN_WIDTH);

  _animSearchBar = (value: "close" | "open") => {
    if (value === "open") {
      return (callBack = () => {}) => {
        const toValue = 0;
        Animated.timing(this.searchAnim, {
          toValue,
          duration: 100,
          useNativeDriver: true
        }).start(() => {
          callBack();
        });
        this.isOpenSearch = true;
      };
    } else {
      return (callBack = () => {}) => {
        const toValue = this.SCREEN_WIDTH;
        Animated.timing(this.searchAnim, {
          toValue,
          duration: 100,
          useNativeDriver: true
        }).start(() => {
          callBack();
        });
        this.isOpenSearch = false;
      };
    }
  };

  render() {
    const { onPressSearch = () => {} } = this.props;
    return (
      <Animated.View
        style={[
          {
            // opacity: opacityInterpolate,
            position: "absolute",
            top: Platform.OS === "ios" ? statusBarHeight : 0,
            left: 0,
            right: 0,
            height: heightToolbar,
            backgroundColor: "white"
          }
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <View></View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{ height: 80, width: 80, resizeMode: "contain" }}
              source={require("../../../assets/ic_logo.png")}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onPressSearch();
              this._animSearchBar("open")();
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10
            }}
          >
            <Image
              style={{ height: 20, width: 20, resizeMode: "contain" }}
              source={require("../../../assets/ic_search.png")}
            />
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            flexDirection: "row",

            top: 0,
            transform: [{ translateX: this.searchAnim }],
            backgroundColor: "#F2F2F2",
            height: heightToolbar
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "center",
              height: 50,
              paddingLeft: 20
            }}
          >
            <TextInput placeholder="Buscar"></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => {
              this._animSearchBar("close")();
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: 50
            }}
          >
            <Text style={{ textAlign: "center" }}>X</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
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
    backgroundColor: "#FFF"
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

// import React from "react";
// import { SafeAreaView, StatusBar, Text, View } from "react-native";
// import YoutubePlayer from "react-native-yt-player";

// const TopBar = () => (
//   <View
//     style={{
//       alignSelf: "center",
//       position: "absolute",
//       top: 0
//     }}
//   >
//     <Text style={{ color: "#FFF" }}> Custom Top bar</Text>
//   </View>
// );

// const App = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <View style={{ paddingTop: 60 }}>
//           <YoutubePlayer
//             topBar={TopBar}
//             videoId="H5R9jZMBNI8"
//             // autoPlay
//             //onFullScreen={this.onFullScreen}
//             onStart={() => console.log("onStart")}
//             onEnd={() => console.log("on End")}
//           />

//           <View>
//             <Text>
//               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi,
//               aspernatur rerum, deserunt cumque ipsam unde nam voluptatum
//               tenetur cupiditate veritatis autem quidem ad repudiandae sapiente
//               odit voluptates fugit placeat ut!
//             </Text>
//           </View>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };

// export default App;
