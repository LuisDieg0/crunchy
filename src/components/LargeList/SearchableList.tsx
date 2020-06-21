import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
  FlatListProps,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import Highlighter from "react-native-highlight-words";
import { LargeList, LargeListPropTypes } from "react-native-largelist";

const SearchableFlatListContext = React.createContext({ getText: () => "" });
interface Props extends FlatListProps<any> {
  searchKey: Array<string>;
  highlightColor?: string;
  onSearch?: () => void;
  renderEmptyRow?: (search: any) => JSX.Element;
  elementBetweenSearchAndList?: any;
  text?: string;
  placeholder: string;
  showSearch?: boolean;
  searchBarBackgroundStyles?: StyleProp<ViewStyle>;
  backgroundStyles?: StyleProp<ViewStyle>;
  searchTextInputStyle?: StyleProp<TextStyle>;
  filterText: (func: (text: string) => void) => void;
  heightForCell?: number;
  renderItem: ({ row: number, item: any }) => JSX.Element;
  initCellTop: number;
  styleContainer;
}

export class CompleteFlatList extends Component<Props> {
  refList: any;
  searchText = "";
  funcSearchText = (text: string) => {};
  data = [] as any;
  heightEmptyRow: number;

  constructor(props) {
    super(props);
    this.state = {
      init: false
    };
    this.data = props.data;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ init: true });
      if (this.refList && this.refList.reloadData) {
        this.refList.reloadData();
      }
    }, 200);
  }

  reloadData = () => {
    this.refList.reloadData();
  };

  _filterText = (t: string) => {
    this.searchText = t;
    this.heightEmptyRow = undefined;
    if (t === "") {
      this.data = this.props.data;
      if (this.refList && this.refList.reloadData) {
        this.refList.reloadIndexPaths(
          new Array(8).fill({}).map((_, row) => ({ row }))
        );
        setTimeout(() => {
          this.refList.reloadData();
        }, 10);
      }

      return;
    }

    const array = this.props.data;
    const searchKey = this.props.searchKey;
    const text = t.toLowerCase();
    const filteredData =
      array?.filter(item => {
        const itemData = searchKey
          .map(key => {
            return (item[key] ? `${item[key]}` : "").toUpperCase();
          })
          .join("");
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      }) || [];

    if (filteredData.length === 0) {
      filteredData.push({ showEmptyRow: true });
    }

    this.data = filteredData;
    if (this.refList && this.refList.reloadData) {
      this.refList.reloadIndexPaths(
        new Array(8).fill({}).map((_, row) => ({ row, section: 0 }))
      );
      setTimeout(() => {
        this.refList.reloadData();
      }, 10);
    }
  };

  render() {
    const { filterText, heightForCell } = this.props;

    if (filterText) {
      filterText(this._filterText);
    }

    const {
      renderItem,
      ItemSeparatorComponent,
      styleContainer,
      searchBarBackgroundStyles,
      placeholder,
      searchTextInputStyle,
      showSearch = true,
      elementBetweenSearchAndList,
      renderEmptyRow = txt => (
        <Text style={styles.noData}>
          No se encontró {txt && txt.length > 0 ? `'${txt}'` : "resultado"}
        </Text>
      ),
      initCellTop
    } = this.props;

    const searchbar = (
      <View style={[styles.containSearch, searchBarBackgroundStyles]}>
        <TextInput
          ref={ref => {}}
          style={[styles.inputSearch, searchTextInputStyle]}
          placeholder={placeholder}
          clearButtonMode="while-editing"
          placeholderTextColor="#919188"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={text => {
            this._filterText(text);
          }}
          maxLength={100}
        />
        <View style={styles.containImageSearch}></View>
      </View>
    );

    const EmptyRow = () => {
      return (
        <View
          style={{
            flex: 1
          }}
        >
          {renderEmptyRow(this.searchText)}
        </View>
      );
    };
    return (
      <View style={[styles.container]}>
        {showSearch && searchbar}
        {elementBetweenSearchAndList}

        {/* {!this.state.init ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ActivityIndicator></ActivityIndicator>
          </View>
        ) : ( */}
        <SearchableFlatListContext.Provider
          value={{ getText: () => this.searchText }}
        >
          <LargeList
            speedLevel1={500}
            keyboardShouldPersistTaps="handled"
            ref={ref => {
              this.refList = ref;
            }}
            style={{ flex: 1 }}
            renderItemSeparator={() => null}
            onLargeListDidUpdate={() => {
              console.log("onLargeListDidUpdate");
            }}
            {...this.props}
            numberOfRowsInSection={section =>
              this.state.init ? this.data.length + 1 : 0
            }
            heightForCell={(section, row) => {
              if (row == 0) {
                return this.heightEmptyRow || (heightForCell || 80) + 10;
              }
              if (row === this.data.length) {
                return this.heightEmptyRow ? 0 : 200;
              }
              return heightForCell || 80;
            }}
            renderCell={(section, row) => {
              if (row === this.data.length) {
                return <View />;
              }
              if (
                this.data.length === 1 &&
                this.data[0].showEmptyRow !== null &&
                typeof this.data[0].showEmptyRow !== "undefined"
              ) {
                return <EmptyRow></EmptyRow>;
              }
              return (
                renderItem && (
                  <SearchableFlatListContext.Consumer>
                    {({ getText }) => {
                      let item = { ...this.data[row] };
                      const highlightColor = this.props.highlightColor;

                      if (getText()) {
                        Object.keys(item).forEach(key => {
                          item[key] = (
                            <Highlighter
                              highlightStyle={{ color: highlightColor }}
                              searchWords={(getText() || "").split("")}
                              textToHighlight={`${item[key] || ""}`}
                            />
                          );
                        });
                        item.cleanData = this.data[row];
                      }

                      return renderItem({ item, row });
                    }}
                  </SearchableFlatListContext.Consumer>
                )
              );
            }}
          />
        </SearchableFlatListContext.Provider>

        {!this.state.init && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 100
            }}
          >
            <ActivityIndicator></ActivityIndicator>
          </View>
        )}
        {/* )} */}
      </View>
    );
  }
}

// export function CompleteFlatList(props: Props) {
//   const {
//     data: array = [],
//     searchKey,
//     highlightColor,
//     filterText,
//     heightForCell
//   } = props;
//   let [data] = React.useState(array as any);
//   let [searchText] = React.useState("");

//   let refList = React.useRef();
//   const [init, setInit] = React.useState(false);

//   React.useEffect(() => {
//     setTimeout(() => {
//       setInit(true);
//     }, 300);
//   }, []);
//   const _filterText = (t: string) => {
//     if (t === "") {
//       data = array;
//       refList.reloadData();
//       searchText = t;
//       return;
//     }

//     const text = t.toLowerCase();
//     const filteredData = [];
//     for (let d = 0; d < array!.length; d += 1) {
//       const dt = array![d];
//       for (let s = 0; s < searchKey.length; s += 1) {
//         const sk = searchKey[s];
//         const target = dt[sk];
//         if (typeof target === "undefined" || target == null) {
//           continue;
//         }
//         if (target.toLowerCase().indexOf(text) !== -1) {
//           if (highlightColor === "") {
//             filteredData.push(dt);
//             break;
//           }
//           const row = {} as any;
//           row.cleanData = dt;
//           const keys = Object.keys(dt);
//           for (let i = 0; i < keys.length; i += 1) {
//             const key = keys[i];
//             if (typeof dt[key] === "string") {
//               row[key] = (
//                 <Highlighter
//                   highlightStyle={{ color: highlightColor }}
//                   searchWords={[text]}
//                   textToHighlight={dt[key]}
//                 />
//               );
//             }
//           }
//           filteredData.push(row);

//           break;
//         }
//       }
//     }

//     if (filteredData.length === 0) {
//       filteredData.push({ showEmptyRow: true });
//     }

//     data = filteredData;
//     refList.reloadData();
//     searchText = t;
//   };

//   if (filterText) {
//     filterText(_filterText);
//   }
//   React.useEffect(() => {
//     console.log("text", props.text);
//     // _filterText(props.text);
//   }, [props.text]);
//   const {
//     renderItem,
//     ItemSeparatorComponent,
//     backgroundStyles,
//     searchBarBackgroundStyles,
//     placeholder,
//     searchTextInputStyle,
//     showSearch = true,
//     elementBetweenSearchAndList,
//     renderEmptyRow = txt => (
//       <Text style={styles.noData}>
//         No se encontró {txt && txt.length > 0 ? `'${txt}'` : "resultado"}
//       </Text>
//     )
//   } = props;

//   const searchbar = (
//     <View style={[styles.containSearch, searchBarBackgroundStyles]}>
//       <TextInput
//         ref={ref => {}}
//         style={[styles.inputSearch, searchTextInputStyle]}
//         placeholder={"placeholder"}
//         clearButtonMode="while-editing"
//         placeholderTextColor="#919188"
//         underlineColorAndroid="transparent"
//         autoCapitalize="none"
//         keyboardType="default"
//         onChangeText={text => {
//           _filterText(text);
//         }}
//         maxLength={100}
//       />
//       <View style={styles.containImageSearch}></View>
//     </View>
//   );

//   return (
//     <View
//       style={[
//         styles.container,
//         backgroundStyles,
//         { paddingTop: Platform.OS === "ios" ? statusBarHeight : 0 }
//       ]}
//     >
//       {showSearch && searchbar}
//       {elementBetweenSearchAndList}

//       {!init ? (
//         <View style={{ alignItems: "center", justifyContent: "center" }}>
//           <ActivityIndicator></ActivityIndicator>
//         </View>
//       ) : (
//         <LargeList
//           ref={ref => {
//             refList = ref;
//           }}
//           style={{ flex: 1 }}
//           nativeOptimize
//           dynamicMargin={100}
//           safeMargin={200}
//           scrollEventThrottle={16}
//           loadingMore
//           speedLevel1={1}
//           speedLevel2={2}
//           renderItemSeparator={() => null}
//           onLargeListDidUpdate={() => {
//             console.log("onLargeListDidUpdate");
//           }}
//           numberOfRowsInSection={section => data.length + 1}
//           heightForCell={(section, row) => {
//             if (row == 0) {
//               return (heightForCell || 80) + 10;
//             }
//             if (row === data.length) {
//               return 200;
//             }
//             return heightForCell || 80;
//           }}
//           renderCell={(section, row) => {
//             if (row === data.length) {
//               return <View />;
//             }
//             if (
//               data.length === 1 &&
//               data[0].showEmptyRow !== null &&
//               typeof data[0].showEmptyRow !== "undefined"
//             ) {
//               return renderEmptyRow(searchText);
//             }
//             return renderItem && renderItem({ row, data });
//           }}
//         />
//       )}

//       {/* <FlatList
//         keyboardShouldPersistTaps="always"
//         contentContainerStyle={{ paddingBottom: 100 }}
//         ItemSeparatorComponent={ItemSeparatorComponent}
//         bouncesZoom
//         bounces
//         data={data}
//         renderItem={({ item, index, separators }) => {
//           if (
//             data.length === 1 &&
//             data[0].showEmptyRow !== null &&
//             typeof data[0].showEmptyRow !== "undefined"
//           ) {
//             return renderEmptyRow(searchText);
//           }
//           return <View>{renderItem({ item, index, separators })}</View>;
//         }}
//         style={styles.flatList}
//         keyExtractor={(item, index) => `_${index}`}
//       /> */}
//     </View>
//   );
// }

const styles = StyleSheet.create({
  noData: { alignSelf: "center", textAlign: "center", marginTop: 20 },
  searchBarContainer: {
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f2f2f2",
    width: "100%"
  },
  searchBar: {
    borderRadius: 5,
    backgroundColor: "white",
    height: 38,
    fontSize: 15,
    width: "100%",
    paddingHorizontal: 10
  },
  container: {
    flex: 1,

    backgroundColor: "white"
  },
  defaultSeparator: {
    height: 1,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#f2f2f2"
  },
  flatList: {
    height: "100%",
    width: "100%",
    backgroundColor: "transparent"
  },
  containSearch: {
    marginTop: 10,
    marginLeft: 30,
    marginBottom: 10,
    marginRight: 30,
    flexDirection: "row",
    borderWidth: 0.4,
    borderRadius: 4
  },
  containImageSearch: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: Platform.OS === "ios" ? 5 : 10
  },
  imageSearch: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    flex: 1
  },
  inputSearch: {
    flex: 1,
    padding: Platform.OS === "ios" ? 5 : 1
  }
});

export default CompleteFlatList;

// class CompleteFlatListO extends React.PureComponent<Props> {
//   state = {
//     refreshing: false,
//     searchText: "",
//     rowScale: new Animated.Value(0)
//   };

//   static defaultProps = {
//     searchKey: [],
//     placeholder: "Search ...",
//     data: [],
//     isRefreshing: false,
//     renderItem: null,
//     renderSeparator: undefined,
//     pullToRefreshCallback: null,
//     onSearch: null,
//     highlightColor: "",
//     backgroundStyles: {},
//     searchTextInputStyle: {},
//     searchBarBackgroundStyles: {},
//     showSearch: true,
//     renderEmptyRow: searchText => (
//       <Text style={styles.noData}>
//         No se encontró{" "}
//         {searchText && searchText.length > 0 ? `'${searchText}'` : "resultado"}
//       </Text>
//     ),
//     elementBetweenSearchAndList: null
//   };

//   constructor(props: Props, defaultProps) {
//     super(props, defaultProps);
//     const {
//       refreshOnLoad = true,
//       pullToRefreshCallback,
//       setTextSearch
//     } = props;
//     if (pullToRefreshCallback !== null && refreshOnLoad) {
//       pullToRefreshCallback();
//     }
//   }

//   setTextSearch = () => {
//     this.setState({ searchText: this.props.searchKey });
//   };

//   componentDidMount() {}

//   clearSearch = () => this.setState({ searchText: "" }, this.searchInput.clear);

//   onRefresh = () => {
//     this.props.pullToRefreshCallback();
//     this.setState({ refreshing: true });
//     setTimeout(() => this.setState({ refreshing: false }), 7000);
//   };

//   refresh = () => {
//     let filtereddata = null;
//     if (this.props.data.length === 0) {
//       filtereddata = [{ type: "emptyrow", name: "No data available" }];
//     }
//     filtereddata = this.props.data;
//     this.setState({ refreshing: false, data: filtereddata });
//   };

//   filterText = () => {
//     const { data, searchKey, highlightColor, onSearch } = this.props;
//     if (this.state.searchText === "" || onSearch !== null) {
//       return data;
//     }
//     const searchText = this.state.searchText.toLowerCase();
//     const filteredData = [];
//     for (let d = 0; d < data.length; d += 1) {
//       const dt = data[d];
//       for (let s = 0; s < searchKey.length; s += 1) {
//         const sk = searchKey[s];
//         const target = dt[sk];
//         if (typeof target === "undefined" || target == null) {
//           continue;
//         }
//         if (target.toLowerCase().indexOf(searchText) !== -1) {
//           if (highlightColor === "") {
//             filteredData.push(dt);
//             break;
//           }
//           const row = {} as any;
//           row.cleanData = dt;
//           const keys = Object.keys(dt);
//           for (let i = 0; i < keys.length; i += 1) {
//             const key = keys[i];
//             if (typeof dt[key] === "string") {
//               row[key] = (
//                 <Highlighter
//                   highlightStyle={{ color: highlightColor }}
//                   searchWords={[searchText]}
//                   textToHighlight={dt[key]}
//                 />
//               );
//             }
//           }
//           filteredData.push(row);
//           break;
//         }
//       }
//     }
//     return filteredData;
//   };

//   render() {
//     const {
//       renderItem,
//       renderSeparator,
//       pullToRefreshCallback,
//       isRefreshing,
//       backgroundStyles,
//       searchBarBackgroundStyles,
//       onSearch,
//       placeholder,
//       searchTextInputStyle,
//       showSearch,
//       elementBetweenSearchAndList,
//       refresh = true
//     } = this.props as any;
//     const { searchText } = this.state;
//     const filteredData = this.filterText();

//     if (filteredData.length === 0) {
//       filteredData.push({ showEmptyRow: true });
//     }

//     const searchbar = (
//       <View style={[styles.containSearch, searchBarBackgroundStyles]}>
//         <TextInput
//           ref={c => (this.searchInput = c)}
//           style={[styles.inputSearch, searchTextInputStyle]}
//           placeholder={placeholder}
//           clearButtonMode="while-editing"
//           placeholderTextColor="#919188"
//           underlineColorAndroid="transparent"
//           autoCapitalize="none"
//           keyboardType="default"
//           onChangeText={searchText => this.setState({ searchText })}
//           value={searchText}
//           maxLength={100}
//         />
//         <View style={styles.containImageSearch}></View>
//       </View>
//     );

//     return (
//       <View
//         style={[
//           styles.container,
//           backgroundStyles,
//           { paddingTop: Platform.OS === "ios" ? statusBarHeight : 0 }
//         ]}
//       >
//         {showSearch && searchbar}
//         {elementBetweenSearchAndList}

//         <FlatList
//           scrollEventThrottle={7}
//           keyboardShouldPersistTaps="always"
//           contentContainerStyle={{ paddingBottom: 100 }}
//           // ItemSeparatorComponent={Separator}
//           // ListHeaderComponent={Separator}
//           ItemSeparatorComponent={renderSeparator}
//           bouncesZoom
//           bounces
//           initialNumToRender={8}
//           // {...jellyProps}
//           // refreshControl={
//           //   refresh ? (
//           //     onSearch !== null ? (
//           //       <RefreshControl
//           //         refreshing={isRefreshing}
//           //         onRefresh={() => onSearch(searchText)}
//           //       />
//           //     ) : pullToRefreshCallback !== null ? (
//           //       <RefreshControl
//           //         refreshing={isRefreshing}
//           //         onRefresh={pullToRefreshCallback}
//           //       />
//           //     ) : null
//           //   ) : null
//           // }
//           data={filteredData}
//           renderItem={({ item, index, separators }) => {
//             if (
//               filteredData.length === 1 &&
//               filteredData[0].showEmptyRow !== null &&
//               typeof filteredData[0].showEmptyRow !== "undefined"
//             ) {
//               return this.props.renderEmptyRow(searchText);
//             }
//             return <View>{renderItem({ item, index, separators })}</View>;
//           }}
//           style={styles.flatList}
//           keyExtractor={(item, index) => `_${index}`}
//         />
//       </View>
//     );
//   }
// }
