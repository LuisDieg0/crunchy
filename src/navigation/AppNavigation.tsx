import React, { Component } from "react";
import {
  createStackNavigator,
  TransitionPresets
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../modules/home/Home.ctn";
import Youtube from "../components/youtube/Youtube";
import AppContext from "./AppContext";
import { Animated, Text } from "react-native";
const Stack = createStackNavigator();

export default function AppNavigation(props: any) {
  const [listenerChangeVideo] = React.useState({} as any);
  const [listenerSearch] = React.useState({} as any);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name={routes.home}
          options={{ header: () => null }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const routes = {
  home: "$routes.home"
};
