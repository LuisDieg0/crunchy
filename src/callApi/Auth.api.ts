import { takeEvery, call, put } from "redux-saga/effects";
import {
  LOGIN,
  REGISTER,
  ERROR,
  DETAIL_USER,
  SUCCESS,
  actionResponseLogin,
  actionResponseRegister,
  actionResponseDetailUser,
  actionResponseUpdateUser,
  UPDATE_USER
} from "../modules/auth/Auth.state";
import { actionChangeLoading } from "../modules/app/App.state";
import {
  baseResponseDetailUser,
  baseResponseRegister,
  baseResponseUpdate
} from "./BaseResponse";
// import { userEntity } from "../mapper/UserDataMapper";
import callApi from "./BaseCallApi";

type Props = {
  object?: any;
  token?: string;
};
const apiRegister = ({ object }: Props) => {
  const url = `api/auth/register`;
  return callApi({
    url,
    apiName: "Register",
    method: "POST",
    body: object
  });
};

const apiLogin = ({ object }: Props) => {
  const url = `oauth/token`;
  const data = {
    client_id: "2",
    client_secret: "tzwUplCo9MD8Ot79ricuXKD3YThDLNWw1GjEazx6",
    grant_type: "password",
    username: object.email,
    password: object.password
  };
  return callApi({
    url,
    method: "POST",
    body: data,
    apiName: "Login"
  });
};

const apiDetailUser = ({ token }: Props) => {
  const url = `api/user`;
  return callApi({ url, method: "GET", token, apiName: "DetailUser" });
};

const apiUpdateUser = ({ token, object }: Props) => {
  const url = `api/user`;
  return callApi({
    url,
    method: "PATCH",
    token,
    apiName: "UpdateUser",
    body: object
  });
};

function* sagaLogin(values: Props) {
  try {
    yield put(actionChangeLoading(true));
    const login = yield call(apiLogin, values);
    if (login.access_token != null) {
      const dataLogin = Object.assign({}, login, {
        action: SUCCESS,
        message: "usuario logeado correctamente"
      });
      yield put(actionResponseLogin(dataLogin));
      yield put(actionChangeLoading(false));
    } else {
      const dataLogin = Object.assign({
        action: ERROR,
        message: login.message
      });
      console.log("Api", dataLogin);
      yield put(actionResponseLogin(dataLogin));
      yield put(actionChangeLoading(false));
    }
    console.log("yarn", login);
  } catch (error) {
    console.log("catch error", error);
    yield put(
      actionResponseLogin({
        isLoading: false,
        message: "Ocurrio un error",
        action: ERROR
      })
    );
    yield put(actionChangeLoading(false));
  }
}

function* sagaRegister(values: Props) {
  yield baseResponseRegister({
    name: "RegisterUser",
    values,
    callApi: apiRegister,
    actionResponse: actionResponseRegister,
    actionStatus: { SUCCESS, ERROR }
  });
}

function* sagaDetailUser(values: Props) {
  yield baseResponseDetailUser({
    name: "DetailUser",
    values,
    callApi: apiDetailUser,
    actionResponse: actionResponseDetailUser,
    mapperData: item => item,
    actionStatus: { SUCCESS, ERROR }
  });
}

function* sagaUpdateUser(values: Props) {
  yield baseResponseUpdate({
    name: "UpdateUser",
    values,
    callApi: apiUpdateUser,
    actionResponse: actionResponseUpdateUser,
    actionStatus: { SUCCESS, ERROR }
  });
}

export default function* funcionPrimaria() {
  yield takeEvery(REGISTER, sagaRegister);
  yield takeEvery(LOGIN, sagaLogin);
  yield takeEvery(DETAIL_USER, sagaDetailUser);
  yield takeEvery(UPDATE_USER, sagaUpdateUser);

  // yield ES6
  console.log("función generadora Auth");
}
