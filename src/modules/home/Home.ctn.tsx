import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import View from "./Home.view";
import { StateReducer } from "@gotumi-redux";
import { actionClearSesion } from "../auth/Auth.state";
export default compose(
  connect(
    (state: StateReducer) => ({}),
    (dispatch: any) => ({
      closeSesion: () => {
        dispatch(actionClearSesion());
      }
    })
  ),
  lifecycle({
    componentDidMount() {}
  })
)(View);
