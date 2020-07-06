import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import View from "./Home.view";
export default compose(
  connect(
    (state) => {
      return {
        data: new Array(10).fill({}).map((item, index) => ({
          title: `Tower of god ${index + 10}`,
          subTitle: `Chapter ${index + 1}`,
          image:
            "https://d1phco5nl3d92c.cloudfront.net/2016/03/07021505/lolis-portada.jpg",
        })),
      };
    },
    (dispatch: any) => ({})
  ),
  lifecycle({
    componentDidMount() {},
  })
)(View);
