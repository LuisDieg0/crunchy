import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import createStore from "./src/redux/store";
import { persistStore } from "redux-persist";
import AppView from "./src/modules/app/App.ctn";
// import AnimatedSplash from "react-native-animated-splash-screen";
// import * as Sentry from "@sentry/react-native";

const { store, persistor } = createStore({ queueReleaseThrottle: 250 });

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

// Sentry.init({
//   dsn:
//     "https://34103f123cb04eaa924579c7cbe957e3@o331920.ingest.sentry.io/5213437"
// });

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
