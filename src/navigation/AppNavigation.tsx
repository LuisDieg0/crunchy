import React, { Component } from "react";
import {
  createStackNavigator,
  TransitionPresets
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../modules/home/Home.ctn";
import Youtube from "../components/youtube/Youtube";

const Stack = createStackNavigator();

export default function AppNavigation(props: any) {
  const { app, resetDialog } = props;

  return (
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
