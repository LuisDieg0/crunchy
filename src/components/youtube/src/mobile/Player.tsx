import React, { PureComponent, cloneElement, Children } from "react";
import Animated, { Easing } from "react-native-reanimated";
const { Value, timing } = Animated;

import {
  View,
  StatusBar,
  Platform,
  BackHandler,
  TouchableOpacity,
  Text
} from "react-native";
import styles from "./styles";
import PlayerControls from "./Controls";
import PlayerView from "./YTWebView";
import {
  YTWebViewState,
  PlayerState,
  PlayerProps,
  PlayerDefaultProps
} from "./types";
import LightboxOverlay from "../../../ligthBox/LightboxOverlay";

const IsAndroid = Platform.OS === "android";

export default class Player extends PureComponent<PlayerProps, PlayerState> {
  static defaultProps = PlayerDefaultProps;

  constructor(props: PlayerProps) {
    super(props);
    this.state = {
      ready: false,
      layoutReady: !IsAndroid,
      fullScreen: false,
      play: this.props.autoPlay,
      duration: 0,
      currentTime: 0,
      layout: {
        top: 0,
        left: 0
      },
      isOpen: false,
      origin: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      layoutOpacity: new Animated.Value(1)
    };
  }
  player: any;

  _isUserUsingIconToFullScreen = false;

  // listeners
  onDurationReady = (duration: number) => {
    this.setState({ duration });
  };

  onPlaying = (currentTime: number) => {
    this.setState({ currentTime });
    this.props.onPlaying(currentTime);
  };
  onReady = () => {
    this.setState({ ready: true });
    this.props.onReady();
  };
  onError = () => {
    this.props.onError();
  };
  onEnd = () => {
    const { onEnd, loop } = this.props;
    onEnd();
    if (loop) {
      this.seekTo(0);
      this.playVideo();
    }
  };

  onStateChange = (state: YTWebViewState) => {
    this.props.onStateChange(state);
  };

  playVideo = () => {
    this.setState({ play: true });
    this.player._playVideo();
  };
  seekTo = async (s: number) => {
    this.setState({ currentTime: s });
    this.player._seekTo(s);
  };

  pauseVideo = () => {
    this.setState({ play: false });
    this.player._pauseVideo();
  };

  playTo = videoId => {
    this.player.playTo(videoId);
  };

  toggleFS = () => {
    this._root.measure((ox, oy, width, height, px, py) => {
      this.setState({ fullScreen: !this.state.fullScreen }, () => {
        this.props.onFullScreen(this.state.fullScreen, {
          width,
          height,
          x: px,
          y: py
        });
      });
    });
  };

  /// ligthbox

  open = () => {
    this._root.measure((ox, oy, width, height, px, py) => {
      this.props.onOpen();
      this.setState(
        {
          isOpen: false,
          isAnimating: true,
          origin: {
            width,
            height,
            x: px,
            y: py
          }
        },
        () => {
          this.props.didOpen();

          this.setState({
            isOpen: true
          });

          setTimeout(() => {
            this._root && this.state.layoutOpacity.setValue(0);
          });
        }
      );
    });
  };

  onClose = () => {
    this.state.layoutOpacity.setValue(1);
    setTimeout(() => {
      this.setState(
        {
          isOpen: false
        },
        this.props.onClose
      );
    });
  };

  //

  render() {
    const { playVideo, pauseVideo, seekTo, toggleFS } = this;
    const { videoId, autoPlay, topBar, showFullScreenButton } = this.props;
    const style: any = {
      ...styles.inline
    };
    const content = () => {
      return (
        <View
          ref={component => (this._root = component)}
          style={style}
          onLayout={() => {}}
        >
          <PlayerView
            videoId={videoId}
            autoPlay={autoPlay}
            ref={(player: any) => (this.player = player)}
            onDurationReady={this.onDurationReady}
            onReady={this.onReady}
            onError={this.onError}
            onPlaying={this.onPlaying}
            onEnd={this.onEnd}
          />
          <PlayerControls
            {...{
              playVideo,
              seekTo,
              pauseVideo,
              toggleFS,
              topBar,
              showFullScreenButton,
              ...this.state
            }}
          />
        </View>
      );
    };

    const getOverlayProps = () => ({
      isOpen: this.state.isOpen,
      origin: this.state.origin,
      renderHeader: this.props.renderHeader,
      swipeToDismiss: this.props.swipeToDismiss,
      springConfig: this.props.springConfig,
      backgroundColor: this.props.backgroundColor,
      children: content(),
      didOpen: this.props.didOpen,
      willClose: this.props.willClose,
      onClose: this.onClose,
      renderFooter: this.props.renderFooter,
      propsFooter: this.props.propsFooter
    });

    return (
      <>
        {/* <View style={styles.wrapper} onLayout={this.onLayout} /> */}
        {content()}
        {/* <LightboxOverlay {...getOverlayProps()} /> */}
      </>
    );
  }
}
