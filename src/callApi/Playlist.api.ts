import { takeEvery, call, put } from "redux-saga/effects";
import {
  actionResponseListPlaylist,
  LIST,
  ERROR,
  SUCCESS
} from "../modules/home/Home.state";
import { actionChangeLoading } from "../modules/app/App.state";
import { baseResponseList } from "./BaseResponse";
// import { userEntity } from "../mapper/UserDataMapper";
import callApi from "./BaseCallApi";

type Props = {
  object?: any;
  token?: string;
};
const apiListPlaylist = ({ object, token }: Props) => {
  const url = `api/playlist`;
  return callApi({
    token,
    url,
    apiName: "ListPlaylist",
    method: "GET",
    body: object
  });
};

function* sagaListPaylist(values: Props) {
  yield baseResponseList({
    name: "ListPlaylist",
    values,
    callApi: apiListPlaylist,
    actionResponse: actionResponseListPlaylist,
    actionStatus: { SUCCESS, ERROR },
    mapperList: data => data,
    getStorage: data => data.playlist.list,
    paramsResponse: {}
  });
}

export default function* funcionPrimaria() {
  yield takeEvery(LIST, sagaListPaylist);

  // yield ES6
  console.log("función generadora Auth");
}
