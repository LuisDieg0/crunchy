import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import View from "./Home.view";

export default compose(
  connect(
    state => {
      return {
        data: [
          {
            name: "111"
          },
          {
            name: "222"
          },
          {
            name: "222"
          },
          {
            name: "222"
          },
          {
            name: "222"
          },
          {
            name: "222"
          },
          {
            name: "222"
          }
        ]
      };
    },
    (dispatch: any) => ({})
  ),
  lifecycle({
    componentDidMount() {}
  })
)(View);
