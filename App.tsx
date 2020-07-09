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
// import { createStore, combineReducers, applyMiddleware } from "redux";
// import createSagaMiddleware from "redux-saga";
// import { takeEvery, call, put } from "redux-saga/effects";

// const AUMENTAR = "AUMENTAR";
// const DISMINIR = "DISMINIR";

// const CALLAPI = "CALLAPI";

// export default class App extends Component {
//   state = {
//     counter1: 0,
//     counter2: 2
//   };

//   // llamada simple
//   callApi1 = async () => {
//     const session_id = `d1e158f0e7f00a36ed02534f131d5626`;
//     const url = `https://api.crunchyroll.com/list_media.0.json?"fields=media.screenshot_image%2Cmedia.available%2Cmedia.premium_only%2Cmedia.media_id%2Cmedia.episode_number%2Cmedia.name%2Cmedia.collection_id%2Cmedia.collection_name%2Cmedia.playhead%2Cmedia.available_time%2Cmedia.duration%2Cmedia.url%2Cmedia.series_name%2Cmedia.series_id%2Cimage.wide_url%2Cimage.fwide_url%2Cimage.widestar_url%2Cimage.fwidestar_url%2Cimage.full_url%2Cmedia.etp_guid%2Cmedia.collection_etp_guid&collection_id=25140&sort=desc&offset=0&limit=5000&locale=esES&session_id=${session_id}`;
//     const response = await fetch(url, {
//       method: "GET",
//       mode: "cors",
//       cache: "no-cache",
//       credentials: "same-origin",
//       redirect: "follow",
//       referrer: "no-referrer"
//     });

//     response;
//   };

//   render() {
//     return (
//       <View>
//         <Provider store={store}>
//           <TouchableOpacity
//             onPress={() => {
//               this.callApi1();
//             }}
//           >
//             <Text>CallApi</Text>
//           </TouchableOpacity>
//           <ContainerButtons> </ContainerButtons>
//           <ContainerComponent1></ContainerComponent1>
//           <ContainerComponent2></ContainerComponent2>
//           {/* <ContainerComponent3></ContainerComponent3> */}
//         </Provider>
//       </View>
//     );
//   }
// }

// // componete X

// const actionCallApi = object => {
//   return { type: CALLAPI, object };
// };
// const Buttons = props => {
//   const { aumentar, disminuir } = props;
//   return (
//     <>
//       <TouchableOpacity
//         onPress={() => {
//           aumentar({ videoId: "1" });
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
//       aumentar: object => {
//         dispatch(actionCallApi(object));
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

// /*
//  componenetes
//  */
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

// /*
//  componenetes
//  */

// // reducers
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
// //

// const callApi = params => {

//   const session_id = `d1e158f0e7f00a36ed02534f131d5626`;
//   const url = `https://api.crunchyroll.com/list_media.0.json?"fields=media.screenshot_image%2Cmedia.available%2Cmedia.premium_only%2Cmedia.media_id%2Cmedia.episode_number%2Cmedia.name%2Cmedia.collection_id%2Cmedia.collection_name%2Cmedia.playhead%2Cmedia.available_time%2Cmedia.duration%2Cmedia.url%2Cmedia.series_name%2Cmedia.series_id%2Cimage.wide_url%2Cimage.fwide_url%2Cimage.widestar_url%2Cimage.fwidestar_url%2Cimage.full_url%2Cmedia.etp_guid%2Cmedia.collection_etp_guid&collection_id=25140&sort=desc&offset=0&limit=5000&locale=esES&session_id=${session_id}`;

//   return fetch(url, {
//     method: "GET",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     redirect: "follow",
//     referrer: "no-referrer"
//   }).then(response => response.json());
// };

// function* listenerCallApi(params) {
//   try {
//     const response = yield call(callApi, {});
//     yield put({ type: AUMENTAR });
//     console.log("response", response);
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// function* funcionGeneradora1() {
//   console.log("se esta ejecutando la funcion generadora principal 1");
//   yield takeEvery(CALLAPI, listenerCallApi);
// }

// // midelware
// const midelware = createSagaMiddleware();

// // store
// const store = createStore(reducers, applyMiddleware(midelware));

// midelware.run(funcionGeneradora1);
