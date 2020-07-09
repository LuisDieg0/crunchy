import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistReducer } from "redux-persist";

import reducer from "./reducer";

import Auth from "../callApi/Auth.api";
import Playlist from "../callApi/Playlist.api";

import { persistStore } from "redux-persist";
import storage from "@react-native-community/async-storage";

export default function createReduxStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [];
  middlewares.push(sagaMiddleware);

  const persistConfig = {
    key: "root",
    storage,
    blacklist: []
  };

  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, applyMiddleware(...middlewares));

  console.log("store");
  sagaMiddleware.run(Auth);
  sagaMiddleware.run(Playlist);

  return {
    store,
    persistor: persistStore(store)
  };
}
