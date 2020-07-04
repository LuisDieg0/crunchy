import React, { Component, Children, cloneElement } from "react";
import PropTypes from "prop-types";
import { Animated, TouchableHighlight, View, StatusBar } from "react-native";

import LightboxOverlay from "./LightboxOverlay";

export default class Lightbox extends Component {
  static propTypes = {
    activeProps: PropTypes.object,
    renderHeader: PropTypes.func,
    renderContent: PropTypes.func,
    renderFooter: PropTypes.func,
    underlayColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    didOpen: PropTypes.func,
    onOpen: PropTypes.func,
    willClose: PropTypes.func,
    onClose: PropTypes.func,
    springConfig: PropTypes.shape({
      tension: PropTypes.number,
      friction: PropTypes.number
    }),
    swipeToDismiss: PropTypes.bool,
    propsFooter: PropTypes.object
  };

  static defaultProps = {
    swipeToDismiss: true,
    onOpen: () => {},
    didOpen: () => {},
    willClose: () => {},
    onClose: () => {},
    onLongPress: () => {}
  };

  state = {
    isOpen: false,
    origin: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    layoutOpacity: new Animated.Value(1)
  };

  getContent = () => {
    if (this.props.renderContent) {
      return this.props.renderContent();
    } else if (this.props.activeProps) {
      return cloneElement(
        Children.only(this.props.children),
        this.props.activeProps
      );
    }
    return this.props.children;
  };

  getOverlayProps = () => ({
    isOpen: this.state.isOpen,
    origin: this.state.origin,
    renderHeader: this.props.renderHeader,
    swipeToDismiss: this.props.swipeToDismiss,
    springConfig: this.props.springConfig,
    backgroundColor: this.props.backgroundColor,
    children: this.getContent(),
    didOpen: this.props.didOpen,
    willClose: this.props.willClose,
    onClose: this.onClose,
    renderFooter: this.props.renderFooter,
    propsFooter: this.props.propsFooter
  });

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

  close = () => {
    throw new Error(
      "Lightbox.close method is deprecated. Use renderHeader(close) prop instead."
    );
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

  render() {
    // measure will not return anything useful if we dont attach a onLayout handler on android
    return (
      <View
        ref={component => (this._root = component)}
        style={this.props.style}
        onLayout={() => {}}
      >
        <Animated.View style={{ opacity: this.state.layoutOpacity }}>
          <TouchableHighlight
            underlayColor={this.props.underlayColor}
            onPress={this.open}
            onLongPress={this.props.onLongPress}
          >
            {this.props.children}
          </TouchableHighlight>
        </Animated.View>

        <LightboxOverlay {...this.getOverlayProps()} />
      </View>
    );
  }
}