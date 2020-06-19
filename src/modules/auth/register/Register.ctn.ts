import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import View from "./Register.view";
import { StateReducer } from "@gotumi-redux";

import { actionLogin, actionClearAcction, SUCCESS, ERROR } from "../Auth.state";
import { actionChangeLoading, actionDialog } from "../../app/App.state";

export default compose(
  connect(
    (state: StateReducer) => ({
      login: state.auth.login,
      status: {
        SUCCESS,
        ERROR
      }
    }),
    (dispatch: any) => ({
      callApiLogin: (object: any) => {
        dispatch(actionLogin(object));
      },
      clearAction: () => {
        dispatch(actionClearAcction());
      },
      changeLoading: (status: boolean) => {
        dispatch(actionChangeLoading(status));
      },
      dialog: (status: boolean, config) => {
        dispatch(actionDialog(status, config));
      }
    })
  ),
  lifecycle({
    componentDidMount() {}
  })
)(View);
