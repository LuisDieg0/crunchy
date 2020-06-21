export enum YTWebViewState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5
}

export interface YTWebViewProps {
  videoId: string;
  autoPlay?: Boolean;
  style?: {};
  onReady?: () => void;
  onError?: () => void;
  onPlay?: () => void;
  onPlaying?: (s: number) => void;
  onPause?: () => void;
  onEnd?: () => void;
  onDurationReady?: (s: number) => void;
  onStateChange?: (s: YTWebViewState) => void;
  onPlaybackRateChange?: () => void;
  onPlaybackQualityChange?: () => void;
}

export interface PlayerState {
  ready: Boolean;
  layoutReady: Boolean;
  fullScreen: Boolean;
  play: Boolean;
  duration: number;
  currentTime: number;
  layout: {
    top: number;
    left: number;
  };
}

export const YTWebViewDefaultProps = {
  style: {},
  autoPlay: false,
  onReady: () => {},
  onError: () => {},
  onPlay: () => {},
  onPause: () => {},
  onEnd: () => {},
  onPlaying: () => {},
  onDurationReady: () => {},
  onStateChange: () => {},
  onPlaybackRateChange: () => {},
  onPlaybackQualityChange: () => {}
};

export interface PlayerProps extends YTWebViewProps {
  loop: boolean;
  topBar?: ({
    play,
    fullScreen
  }: {
    play?: boolean;
    fullScreen?: boolean;
  }) => React.ReactNode;
  showFullScreenButton?: boolean;
  onFullScreen?: (fullscreen: boolean) => void;
  onStart?: () => void;
}

export const PlayerDefaultProps = {
  ...YTWebViewDefaultProps,
  onFullScreen: () => {},
  loop: false,
  showFullScreenButton: true,
  onStart: () => {},
  swipeToDismiss: true,
  onOpen: () => {},
  didOpen: () => {},
  willClose: () => {},
  onClose: () => {},
  onLongPress: () => {}
};
