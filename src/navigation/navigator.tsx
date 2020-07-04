/* eslint-disable camelcase */
import React, { Component } from "react";
import Inicio from "./AppNavigation";
import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";

export default class navigator extends Component {
  render() {
    const { auth: { login: { access_token } } = {} } = this.props;

     return <AppNavigation {...this.props}></AppNavigation>;
    // console.log("access_token", access_token);
    // if (access_token !== null && access_token !== undefined) {
    //   return <AppNavigation {...this.props}></AppNavigation>;
    // }
    // return <AuthNavigation {...this.props}></AuthNavigation>;
  }
}
