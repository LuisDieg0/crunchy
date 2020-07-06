import { takeEvery, call, put } from "redux-saga/effects";
import {
  LOGIN,
  REGISTER,
  ERROR,
  DETAIL_USER,
  SUCCESS,
  actionResponseLogin,
  actionResponseRegister,
  UPDATE_USER
} from "../modules/auth/Auth.state";
import { actionChangeLoading } from "../modules/app/App.state";
import { baseResponseRegister } from "./BaseResponse";
// import { userEntity } from "../mapper/UserDataMapper";
import callApi from "./BaseCallApi";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

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
  return auth().signInWithEmailAndPassword(object.email, object.password);
};

function* sagaLogin(values: Props) {
  try {
    yield put(actionChangeLoading(true));
    const login = yield call(apiLogin, values);
    console.log("login", login);
    if (login.user) {
      const dataLogin = Object.assign({}, login.user._user, {
        action: SUCCESS,
        message: "usuario logeado correctamente"
      });
      yield put(actionResponseLogin(dataLogin));
      yield put(actionChangeLoading(false));
    } else {
      const dataLogin = Object.assign({
        action: ERROR,
        message: "Ocurrio un error"
      });
      yield put(actionResponseLogin(dataLogin));
      yield put(actionChangeLoading(false));
      yield showAlert("Ocurrio un error");
    }
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
    yield showAlert("Ocurrio un error");
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
  yield;
}

function* sagaUpdateUser(values: Props) {
  yield;
}

export default function* funcionPrimaria() {
  yield takeEvery(REGISTER, sagaRegister);
  yield takeEvery(LOGIN, sagaLogin);
  yield takeEvery(DETAIL_USER, sagaDetailUser);
  yield takeEvery(UPDATE_USER, sagaUpdateUser);

  // yield ES6
  console.log("función generadora Auth");
}

const showAlert = (message: string) => {
  Alert.alert(
    "",
    message,
    [
      {
        text: "Aceptar",
        onPress: () => {}
      }
    ],
    { cancelable: true }
  );
};
