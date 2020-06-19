import React, { Component } from "react";
import { View, Modal, TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets
} from "@react-navigation/stack";

import Login from "../modules/auth/login/Login.ctn";
import Register from "../modules/auth/register/Register.ctn";

import { ScrollView, RectButton } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default class AuthNavigation extends Component {
  render() {
    const { app, resetDialog } = this.props;
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={routes.login}
            component={Login}
            options={{ title: "Inicio de Sesión", header: () => null }}
          />
          <Stack.Screen
            name={routes.register}
            component={Register}
            options={{ title: "Registro" }}
          />
        </Stack.Navigator>

        {/* <Loading showLoading={app.loading.isLoading}></Loading> */}
      </NavigationContainer>
    );
  }
}

const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress
  }
});

const routes = {
  login: "$routes.login",
  register: "$routes.register",
  businessRegister: "$routes.businessRegister",
  dialog: "$routes.register.dialog"
};

export type auth =
  | "$routes.login"
  | "$routes.register"
  | "$routes.register.dialog"
  | "$routes.businessRegister";
