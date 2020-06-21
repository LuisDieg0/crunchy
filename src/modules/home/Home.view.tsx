import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Dimensions,
  TextInput
} from "react-native";
import YouTube from "../../components/youtube/Youtube";
import {
  TouchableOpacity,
  FlatList,
  RectButton
} from "react-native-gesture-handler";
import { statusBarHeight } from "../../components/toolbar/ToolBar";
import { Tab, Tabs, ScrollableTab } from "native-base";
import enviroment from "../../enviroment";
import callApi from "../../callApi/BaseCallApi";
import AppContext from "../../navigation/AppContext";
import SearchableList from "../../components/LargeList/SearchableList";
import { videoEntityList } from "../../mapper/Video.mapper";

const styleTab = {
  tabStyle: { backgroundColor: "white", elevation: 0 },
  activeTabStyle: { backgroundColor: "white" },
  activeTextStyle: { color: "#082D58" },
  textStyle: { color: "#BFBFBF" }
};
const heightToolbar = 60;

export default class HomeView extends Component {
  componentWillMount() {
    this.props.getPlaylist();
  }

  render() {
    const { data = [] } = this.props;
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <View style={{ height: statusBarHeight }} />}
        <StickHeader onPressSearch={() => {}}></StickHeader>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            marginTop: 10
          }}
        >
          <Image
            style={{ height: 80, width: 200, resizeMode: "contain" }}
            source={require("../../../assets/ic_logo.png")}
          />
        </View>
        <PlaylisTab data={data}></PlaylisTab>
        {/* <TouchableOpacity
          onPress={() => {
            this.props.closeSesion();
          }}
        >
          <Text>Cerrar sesion</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

function PlaylisTab({ data }) {
  let [currentIndex] = React.useState(0);
  return (
    <Tabs
      onChangeTab={({ i }) => {
        currentIndex = i;
      }}
      renderTabBar={() => (
        <ScrollableTab
          underlineStyle={{ backgroundColor: "#082D58" }}
          style={{ elevation: 0 }}
        />
      )}
    >
      {data.map((item, index) => (
        <Tab key={`_${index}`} heading={item.name} {...styleTab}>
          <Isos
            index={index}
            playlistId={item.playlistId}
            getCurrentIndex={() => currentIndex}
          ></Isos>
        </Tab>
      ))}
    </Tabs>
  );
}

export class Isos extends Component {
  state = { videos: [] };
  listenerSearch: any;
  funcSearch = (text: string) => {};
  componentDidMount() {
    this.apiVideos().then((response: any) => {
      const { items = [] } = response;
      const videos = videoEntityList(items);
      this.setState({ videos }, () => {
        this.funcSearch("");
      });
    });
    this.listenerSearch.addEventListener(text => {
      const { getCurrentIndex, index } = this.props;
      if (index === getCurrentIndex()) {
        this.funcSearch(text);
      }
    });
  }
  apiVideos = () => {
    const { playlistId } = this.props;
    const url = `playlistItems?part=snippet&key=${enviroment.API_KEY_GOOGLE}&playlistId=${playlistId}`;
    return callApi({
      url,
      apiName: "ListPlaylist",
      method: "GET",
      baseUrl: "youtube"
    });
  };

  render() {
    return (
      <AppContext.Consumer>
        {({ changeVideo, listenerSearch }) => {
          this.listenerSearch = listenerSearch;
          return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <SearchableList
                ref={ref => {
                  this.refList = ref;
                }}
                showSearch={false}
                filterText={func => {
                  this.funcSearch = func;
                }}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                searchKey={["title", "description", "document"]}
                highlightColor={"blue"}
                data={this.state.videos}
                renderItem={({ item }) => {
                  const { title } = item;
                  const { url_imagen } = item.cleanData ? item.cleanData : item;
                  return (
                    <RectButton
                      onPress={() => {
                        const video = item.cleanData ? item.cleanData : item;
                        changeVideo()({ ...video, videos: this.state.videos });
                      }}
                      style={{
                        height: 80,
                        padding: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Image
                        source={{ uri: url_imagen }}
                        style={{ height: 50, width: 50 }}
                      />
                      <View style={{ flex: 1, paddingLeft: 10 }}>
                        <Text>{title}</Text>
                      </View>
                    </RectButton>
                  );
                }}
                placeholder="Buscar"
              />
            </View>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export class StickHeader extends Component {
  SCREEN_WIDTH = Dimensions.get("screen").width;
  searchAnim = new Animated.Value(this.SCREEN_WIDTH);
  state = {
    data: [],
    isOpenSearch: false
  };
  apiSearchVideos = ({ search }) => {
    const url = `search?part=snippet&key=${enviroment.API_KEY_GOOGLE}&channelId=${enviroment.CHANNEL_ID}&maxResults=50&q=${search}`;
    return callApi({
      url,
      apiName: "ListPlaylist",
      method: "GET",
      baseUrl: "youtube"
    });
  };

  _animSearchBar = (value: "close" | "open") => {
    if (value === "open") {
      return (callBack = () => {}) => {
        const toValue = 0;
        Animated.timing(this.searchAnim, {
          toValue,
          duration: 100,
          useNativeDriver: true
        }).start(() => {
          callBack();
          this.setState({ isOpenSearch: true });
        });
      };
    } else {
      return (callBack = () => {}) => {
        const toValue = this.SCREEN_WIDTH;
        Animated.timing(this.searchAnim, {
          toValue,
          duration: 100,
          useNativeDriver: true
        }).start(() => {
          callBack();
          this.setState({ isOpenSearch: false });
        });
      };
    }
  };

  render() {
    const { onPressSearch = () => {} } = this.props;
    return (
      <AppContext.Consumer>
        {({ onSearch }) => {
          return (
            <>
              <Animated.View
                style={[
                  {
                    // opacity: opacityInterpolate,
                    position: "absolute",
                    top: Platform.OS === "ios" ? statusBarHeight : 0,
                    left: 0,
                    right: 0,
                    height: heightToolbar,
                    backgroundColor: "transparent",
                    zIndex: 1
                  }
                ]}
              >
                <View
                  style={{ flexDirection: "row", backgroundColor: "white" }}
                >
                  <View></View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {/* <Image
              style={{ height: 80, width: 80, resizeMode: "contain" }}
              source={require("../../../assets/ic_logo.png")}
            /> */}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      onPressSearch();
                      this._animSearchBar("open")();
                    }}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10
                    }}
                  >
                    <Image
                      style={{ height: 20, width: 20, resizeMode: "contain" }}
                      source={require("../../../assets/ic_search.png")}
                    />
                  </TouchableOpacity>
                </View>
                <Animated.View
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    flexDirection: "row",

                    top: 0,
                    transform: [{ translateX: this.searchAnim }],
                    backgroundColor: "#F2F2F2",
                    height: heightToolbar
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-start",
                      justifyContent: "center",
                      height: 50,
                      paddingLeft: 20
                    }}
                  >
                    <TextInput
                      placeholder="Buscar"
                      onChangeText={text => {
                        onSearch()(text);
                      }}
                    ></TextInput>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this._animSearchBar("close")();
                    }}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: 50,
                      width: 50
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>X</Text>
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
            </>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" }
});
