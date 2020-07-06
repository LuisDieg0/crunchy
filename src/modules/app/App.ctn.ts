import { compose, lifecycle } from "recompose";
import { Platform, UIManager } from "react-native";
import { connect } from "react-redux";
import Navigator from "./../../navigation/navigator";
import { actionDialog } from "../app/App.state";

export default compose(
  connect(
    state => {
      return { ...state };
    },
    dispatch => ({
      resetDialog: () => {
        dispatch(actionDialog(false, undefined));
      }
    })
  ),
  lifecycle({})
)(Navigator);
