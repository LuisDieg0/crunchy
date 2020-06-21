import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import View from "./Home.view";
import { StateReducer } from "@gotumi-redux";
import { actionClearSesion } from "../auth/Auth.state";
import { actionchangeVideo } from "../app/App.state";
import { actionListPlaylist } from "./Home.state";
export default compose(
  connect(
    (state: StateReducer) => {
      return {
        data: state.playlist.list.data
      };
    },
    (dispatch: any) => ({
      closeSesion: () => {
        dispatch(actionClearSesion());
      },
      getPlaylist: (object: any) => {
        dispatch(actionListPlaylist(object));
      },
      changeVideo: (object: any) => {
        console.log("changeVideo", object);
        dispatch(actionchangeVideo(object));
      }
    })
  ),
  lifecycle({
    componentDidMount() {}
  })
)(View);
