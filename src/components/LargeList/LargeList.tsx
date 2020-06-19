import React, { Component } from "react";
import { Text, View, Dimensions } from "react-native";
import { LargeList, LargeListPropTypes } from "react-native-largelist";

export default class LargeListComponent extends Component<LargeListPropTypes> {
  render() {
    return <LargeList {...this.props}></LargeList>;
  }
}

interface PropsLargeListGrid extends LargeListPropTypes {
  data: any[];
  itemHeight: number;
  renderRow: () => void;
}
export class LargeListGrid extends Component<PropsLargeListGrid> {
  state = { init: false };
  componentDidMount() {}

  render() {
    const { itemHeight, data, renderRow = () => {} } = this.props;
    const numcolum = Math.round(Dimensions.get("window").width / itemHeight);
    return (
      <LargeList
        ref={ref => {
          this.refList = ref;
        }}
        heightForCell={() => itemHeight + 60}
        numberOfRowsInSection={() =>
          this.state.init ? Math.ceil(data.length / numcolum) : 0
        }
        style={{ flex: 1 }}
        renderCell={(section, row) => {
          const array = paginate(data, numcolum, row + 1);
          return (
            <View style={{ flexDirection: "row" }}>
              {array.map((item, key) => {
                return (
                  <View
                    key={`${row}.${key}`}
                    style={{
                      height: itemHeight + 40,
                      width: Dimensions.get("window").width / numcolum - 10,
                      margin: 5
                    }}
                  >
                    renderRow()
                  </View>
                );
              })}
            </View>
          );
        }}
      />
    );
  }
}

function paginate(array: any[], page_size: number, page_number: number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
