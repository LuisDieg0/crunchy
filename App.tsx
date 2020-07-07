import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import createStore from "./src/redux/store";
import AppView from "./src/modules/app/App.ctn";
// import AnimatedSplash from "react-native-animated-splash-screen";
// import * as Sentry from "@sentry/react-native";

const { store, persistor } = createStore();

export class App extends Component {
  componentDidMount() {
    // Sentry.nativeCrash();
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppView />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;

// import React, { Component } from "react";
// import { Text, View, TouchableOpacity } from "react-native";
// import { Provider, connect } from "react-redux";
// import { createStore, combineReducers } from "redux";
// const AUMENTAR = "AUMENTAR";
// const DISMINIR = "DISMINIR";

// export default class App extends Component {
//   state = {
//     counter1: 0,
//     counter2: 2
//   };
//   render() {
//     return (
//       <View>
//         <Provider store={store}>
//           <ContainerButtons></ContainerButtons>
//           <ContainerComponent1></ContainerComponent1>
//           <ContainerComponent2></ContainerComponent2>
//           {/* <ContainerComponent3></ContainerComponent3> */}
//         </Provider>
//       </View>
//     );
//   }
// }

// // componete X

// const Buttons = props => {
//   const { aumentar, disminuir } = props;
//   return (
//     <>
//       <TouchableOpacity
//         onPress={() => {
//           aumentar();
//         }}
//       >
//         <Text>Aumentar</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           disminuir();
//         }}
//       >
//         <Text>Disminuir</Text>
//       </TouchableOpacity>
//     </>
//   );
// };
// const ContainerButtons = connect(
//   state => {
//     return {};
//   },
//   dispatch => {
//     return {
//       aumentar: () => {
//         dispatch({ type: AUMENTAR });
//       },
//       disminuir: () => {
//         dispatch({ type: DISMINIR });
//       }
//     };
//   }
// )(Buttons);

// // similar al home.view
// const Component1 = props => {
//   return (
//     <View>
//       <Text>Is counter Component1 is {props.counter1}</Text>
//     </View>
//   );
// };

// // similar al home.container
// const ContainerComponent1 = connect(
//   state => {
//     console.log("state", state);
//     return {
//       counter1: state.counter1
//     };
//   },
//   dispatch => {
//     return {};
//   }
// )(Component1);

// const counter1 = (state = 0, action) => {
//   switch (action.type) {
//     case AUMENTAR:
//       return state + 1;

//     case DISMINIR:
//       return state - 1;

//     default:
//       return state;
//   }
// };
// const counter2 = () => {
//   console.log("counter2");
//   return 0;
// };

// const counter3 = () => {
//   console.log("counter3");
//   return 0;
// };

// const reducers = combineReducers({
//   counter1,
//   counter2,
//   counter3
// });

// const store = createStore(reducers);

// //similar al Anime.view
// const Component2 = props => {
//   return (
//     <View>
//       <Text>Is counter Component2 is {props.counter1}</Text>
//     </View>
//   );
// };

// // similar al Anime.container
// const ContainerComponent2 = connect(
//   state => {
//     console.log("state", state);
//     return {
//       counter1: state.counter1
//     };
//   },
//   dispatch => {
//     return {};
//   }
// )(Component2);
