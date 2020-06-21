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
    <AppContext.Provider
      value={{
        changeVideo: () => {
          return video => {
            Object.keys(listenerChangeVideo).forEach(key => {
              if (typeof listenerChangeVideo[key] === "function") {
                listenerChangeVideo[key](video);
              }
            });
          };
        },
        listenerChangeVideo: {
          addEventListener: event => {
            listenerChangeVideo[
              `_${Object.keys(listenerChangeVideo).length}`
            ] = event;
          }
        },
        onSearch: () => {
          return video => {
            Object.keys(listenerSearch).forEach(key => {
              if (typeof listenerSearch[key] === "function") {
                listenerSearch[key](video);
              }
            });
          };
        },
        listenerSearch: {
          addEventListener: event => {
            listenerSearch[`_${Object.keys(listenerSearch).length}`] = event;
          }
        }
      }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={Home}
            name={routes.home}
            options={{ header: () => null }}
          ></Stack.Screen>
        </Stack.Navigator>
        <Youtube></Youtube>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export const routes = {
  home: "$routes.home"
};

export type sale =
  | "$routes.sales"
  | "$routes.saleDetail"
  | "$routes.createSale"
  | "$routes.bussines"
  | "$routes.searchBussines"
  | "$routes.shoppinCar"
  | "$routes.bussinessDetails";
