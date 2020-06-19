import { combineReducers } from "redux";

// ## Generator Reducer Imports
import {
  login,
  detailUser,
  register,
  updateUser
} from "../modules/auth/Auth.state";

export default combineReducers({
  // ## Generator Reducers
  login,
  detailUser,
  register,
  updateUser
});
