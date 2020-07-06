import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../modules/home/Home.ctn";
import Animes from "../modules/animes/Anime.ctn";
import Chapter from "../modules/animes/animeChapter/AnimeChapter.ctn";
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
          component={Animes}
          name={routesStack.animes}
          options={{ title: "inicio" }}
        ></Stack.Screen>
        <Stack.Screen
          component={Chapter}
          name={routesStack.chapter}
          options={{ title: "capitulos" }}
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
        options={{ title: "Inicio" }}
      ></Tab.Screen>
      <Tab.Screen
        component={Empty}
        name={routesTab.new}
        options={{ title: "Nuevo" }}
      ></Tab.Screen>
      <Tab.Screen
        component={Animes}
        name={routesTab.anime}
        options={{ title: "Animes" }}
      ></Tab.Screen>
      <Tab.Screen
        component={Empty}
        name={routesTab.other}
        options={{ title: "Otros" }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export const routesTab = {
  home: "$routes.home",
  new: "$routes.new",
  anime: "$routes.anime",
  other: "$routes.other",
};

export const routesStack = {
  init: "$routes.init",
  animes: "$routes.animes",
  chapter: "$routes.chapter",
};
