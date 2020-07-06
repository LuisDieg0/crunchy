import { call, put, select } from "redux-saga/effects";
import { Alert } from "react-native";
import { status, constantes } from "../utils/constantes";
import { actionClearSesion } from "../redux/reducer";
import { actionChangeLoading } from "../modules/app/App.state";

const messageConnection = "Ocurrió un error. Revise su conexión.";
const messageError = "Ocurrió un error. Inténtelo nuevamente";
type ActionStatus = { SUCCESS: string; ERROR: string };

type PropsList = {
  name: string;
  values: any;
  callApi: any;
  actionResponse: any;
  actionStatus: ActionStatus;
  paramsResponse: any;
  mapperList: (data: any) => any;
  getStorage: (data: any) => any;
};

export function* baseResponseList({
  name = "",
  values = {},
  callApi,
  actionResponse,
  mapperList,
  actionStatus: { ERROR, SUCCESS },
  paramsResponse = {},
  getStorage
}: PropsList) {
  try {
    const token = yield select(state => state.auth.login.access_token);
    const response = yield call(callApi, Object.assign(values, { token }));
    console.log("response", response);
    if (!response.error) {
      yield put(
        actionResponse(
          Object.assign({
            isLoading: false,
            action: SUCCESS,
            data: mapperList(response.data),
            ...paramsResponse
          })
        )
      );
    } else {
      const storage = yield select(state => getStorage(state));
      yield put(
        actionResponse(
          Object.assign({
            isLoading: false,
            action: ERROR,
            message: messageError,
            data: storage.data,
            ...paramsResponse
          })
        )
      );
    }

    if (__DEV__) {
      console.log("Response ", name, response);
    }
  } catch (error) {
    if (__DEV__) {
      console.log("catch error ", name, error.message);
    }
    const storage = yield select(state => getStorage(state));
    switch (error.message) {
      case constantes.NETWORK_CONECTION_FAIL:
        yield put(
          actionResponse({
            isLoading: false,
            message: messageConnection,
            action: ERROR,
            data: storage.data,
            ...paramsResponse
          })
        );
        if (__DEV__) {
          console.log(name, " entro al error de fallo de conexión");
        }
        break;
      default:
        yield put(
          actionResponse({
            isLoading: false,
            message: messageError,
            action: ERROR,
            data: storage.data,
            ...paramsResponse
          })
        );
        if (__DEV__) {
          console.log(name, " entro al error por defecto");
        }
        break;
    }
  }
}

type Registe = {
  name: string;
  values: any;
  callApi: any;
  actionResponse: any;
  actionStatus: ActionStatus;
  paramsResponse?: any;
};

export function* baseResponseRegister({
  name = "",
  values = {},
  callApi,
  actionResponse,
  actionStatus: { ERROR, SUCCESS },
  paramsResponse = {}
}: Registe) {
  try {
    const response = yield call(callApi, values);
    switch (response.status) {
      case status.success:
        yield put(
          actionResponse(
            Object.assign({
              isLoading: false,
              action: SUCCESS,
              message: response.message,
              data: response.body,
              ...paramsResponse
            })
          )
        );
        break;
      case status.unauthorized:
        yield put(actionClearSesion());
        yield showAlertCloseSession(response.message);
        break;
      default:
        yield put(
          actionResponse(
            Object.assign({
              isLoading: false,
              action: ERROR,
              message: response.message,
              ...paramsResponse,
              data: {}
            })
          )
        );
        if (__DEV__) {
          console.log(name, "entro al error");
        }
        break;
    }
    if (__DEV__) {
      console.log("Response ", name, response);
    }
  } catch (error) {
    if (__DEV__) {
      console.log("catch error ", name, error.message);
    }
    switch (error.message) {
      case constantes.NETWORK_CONECTION_FAIL:
        yield put(
          actionResponse({
            isLoading: false,
            message: messageConnection,
            action: ERROR,
            data: {},
            ...paramsResponse
          })
        );
        if (__DEV__) {
          console.log(name, " entro al error de fallo de conexión");
        }
        break;
      default:
        yield put(
          actionResponse({
            isLoading: false,
            message: messageError,
            action: ERROR,
            data: {},
            ...paramsResponse
          })
        );
        if (__DEV__) {
          console.log(name, " entro al error por defecto");
        }
        break;
    }
  }
}

const showAlertCloseSession = (message: string) => {
  Alert.alert(
    "",
    message,
    [
      {
        text: "Aceptar",
        onPress: () => {}
      }
    ],
    { cancelable: false }
  );
};
