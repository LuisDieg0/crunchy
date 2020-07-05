import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import View from "./Home.view";
export default compose(
  connect(
    state => {
      return {
        data: new Array(10).fill({}).map((item, index) => ({
          title: `Tower of god ${index + 1}`,
          subTitle: `Chapter ${index + 1}`
        }))
      };
    },
    (dispatch: any) => ({})
  ),
  lifecycle({
    componentDidMount() {}
  })
)(View);
