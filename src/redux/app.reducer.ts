import { combineReducers } from "redux";

// ## Generator Reducer Imports
import { loading, dialog } from "../modules/app/App.state";

export default combineReducers({
  loading,
  dialog
});
