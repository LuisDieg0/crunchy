import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer } from "@react-navigation/native";
import Home from "../modules/home/Home.ctn";
import AppContext from "./AppContext";
import { View } from "react-native";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function AppNavigation(props: any) {
  const [listenerChangeVideo] = React.useState({} as any);
  const [listenerSearch] = React.useState({} as any);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={TabNavigation}
          name={routesStack.init}
          options={{ header: () => null, title: "Inicio" }}
        ></Stack.Screen>
        <Stack.Screen
          component={Empty}
          name={routesStack.videos}
          options={{ title: "Inicio" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Empty = () => {
  return <View></View>;
};
const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={Home}
        name={routesTab.home}
        options={{ header: () => null, title: "Inicio" }}
      ></Tab.Screen>
      <Tab.Screen
        component={Empty}
        name={routesTab.new}
        options={{ header: () => null, title: "Nuevo" }}
      ></Tab.Screen>
      <Tab.Screen
        component={Empty}
        name={routesTab.anime}
        options={{ header: () => null, title: "Animes" }}
      ></Tab.Screen>
      <Tab.Screen
        component={Empty}
        name={routesTab.other}
        options={{ header: () => null, title: "Otros" }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export const routesTab = {
  home: "$routes.home",
  new: "$routes.new",
  anime: "$routes.anime",
  other: "$routes.other"
};

export const routesStack = {
  init: "$routes.init",
  videos: "$routes.videos"
};
