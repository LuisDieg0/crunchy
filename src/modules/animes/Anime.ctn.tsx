import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import View from "./Anime.view";
export default compose(
  connect(
    (state) => {
      return {
        data: new Array(10).fill({}).map((item, index) => ({
          title: `Anime ${index + 1}`,
          subTitle: `chapters  ${index + 360}`,
          image:
            "https://pxb.cdn.latpress.com/latpress/042020/1586870847052.jpg",
        })),
      };
    },
    (dispatch: any) => ({})
  ),
  lifecycle({
    componentDidMount() {},
  })
)(View);
