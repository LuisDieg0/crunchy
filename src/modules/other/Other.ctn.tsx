import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import ViewChapter from "./Other.view";
export default compose(
  connect(
    (state) => {
      return {
        data: {
          title: "title",
          description: "aqui va la descripcion de el anime, gaaaaaaaaaa",

          chapters: new Array(100).fill({}).map((item, index) => ({
            chap: `capitulo ${index + 1}`,
            title: `Title ${index + 1}`,
            image:
              "https://www.meme-arsenal.com/memes/13183c430aade91e29964598305f66c8.jpg",
          })),
        },
      };
    },
    (dispatch: any) => ({})
  ),
  lifecycle({
    componentDidMount() {},
  })
)(ViewChapter);
