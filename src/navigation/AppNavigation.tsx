import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../modules/home/Home.ctn";
import Animes from "../modules/animes/Anime.ctn";
import Chapter from "../modules/animes/animeChapter/AnimeChapter.ctn";
import AppContext from "./AppContext";
import { View, Image, Dimensions } from "react-native";
import ToolBar from "../components/toolbar/ToolBar";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import { isPortail, isTablet } from "../utils/validations";
import Youtube from "../components/youtube/Youtube";
import { BorderlessButton } from "react-native-gesture-handler";

export default function AppNavigation(props: any) {
  const [listenerChangeVideo] = React.useState({} as any);
  const [listenerSearch] = React.useState({} as any);
  let [listenerChangeDimension] = React.useState({} as any);
  let refNavigation = React.useRef() as any;
  const [dimension, setDimension] = React.useState({
    window: Dimensions.get("window"),
    screen: Dimensions.get("screen"),
    isPortail,
    isTablet
  });

  const getDimension = () => {
    return dimension;
  };
  const getNavigation = () => {
    return refNavigation;
  };
  React.useEffect(() => {
    Object.keys(listenerChangeDimension).forEach(key => {
      if (typeof listenerChangeDimension[key] === "function") {
        listenerChangeDimension[key](dimension);
      }
    });
  }, [dimension]);
  React.useEffect(() => {
    Dimensions.addEventListener("change", e => {
      const dim = { ...e, isPortail, isTablet };
      setDimension(dim);
    });

    return () => {
      Dimensions.removeEventListener("change", () => {});
      listenerChangeDimension = {};
    };
  }, []);

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
        },
        listenerChangeDimension: {
          addEventListener: event => {
            listenerChangeDimension[
              `_${Object.keys(listenerChangeDimension).length}`
            ] = event;
          }
        },
        getDimension: () => {
          return getDimension;
        }
      }}
    >
      <NavigationContainer
        ref={ref => {
          refNavigation = ref;
        }}
      >
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
      <Youtube {...{ ...props, getNavigation }}></Youtube>
    </AppContext.Provider>
  );
}

const Empty = () => {
  return <View></View>;
};
const TabNavigation = props => {
  return (
    <>
      <View style={{ flex: 1 }}>
        {/* <StatusBar
          barStyle={"dark-content"}
          translucent
          backgroundColor={"transparent"}
        ></StatusBar> */}
        <ToolBar backgroundToolbar="white" hideStatusBar>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}></View>
            <BorderlessButton
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 10
              }}
            >
              <Image
                source={require("../../assets/ic_search.png")}
                style={{
                  height: 16,
                  width: 16,
                  tintColor: "black",
                  resizeMode: "contain"
                }}
              ></Image>
            </BorderlessButton>
          </View>
        </ToolBar>
        <Tab.Navigator tabBar={() => null}>
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
      </View>
    </>
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
  animes: "$routes.animes",
  chapter: "$routes.chapter"
};
