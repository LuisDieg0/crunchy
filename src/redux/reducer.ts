import { combineReducers } from "redux";
import storage from "@react-native-community/async-storage";

// ## Generator Reducer Imports
import app from "./app.reducer";
import auth from "./auth.reducer";
import playlist from "./playlist.reducer";

const appReducer = combineReducers({
  // ## Generator Reducers
  app,
  auth,
  playlist
});

export const CLEAR_SESSION = "CLEAR_SESSION";

export const actionClearSesion = () => ({
  type: CLEAR_SESSION
});

const rootReducer = (state, action) => {
  if (action.type === CLEAR_SESSION) {
    storage.removeItem("persist:root");
    storage.removeItem("NAVIGATION_STATE");
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
