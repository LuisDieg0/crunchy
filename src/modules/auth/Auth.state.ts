import { PropsReducer } from "@gotumi-redux";
// Initial state
const initialState = {
  action: "",
  isLoading: false,
  message: "",
  access_token: null,
  data: {}
};

// Actions
export const LOGIN = "@ACTION.LOGIN";
export const REGISTER = "@ACTION.REGISTER";
export const DETAIL_USER = "@ACTION.DETAIL_USER";
export const UPDATE_USER = "@ACTION.UPDATE_USER";

export const CLEAR_SESSION = "@ACTION.CLEAR_SESSION";
export const CLEAR_ACTION = "@ACTION.CLEAR_ACTION";

export const ERROR = "@STATUS.ERROR_AUTH";
export const SUCCESS = "@STATUS.SUCCESS_AUTH";
export const RESPONSE_REGISTER = "@ACTION.RESPONSE_REGISTER";
export const RESPONSE_DETAIL_USER = "@ACTION.RESPONSE_DETAIL_USER";
export const RESPONSE_LOGIN = "@ACTION.RESPONSE_LOGIN";
export const RESPONSE_UPDATE_USER = "@ACTION.RESPONSE_UPDATE_USER";

// Action creators
export const actionLogin = (object: any) => ({
  type: LOGIN,
  object
});
export const actionRegister = (object: any) => ({
  type: REGISTER,
  object
});

export const actionDetailUser = () => ({
  type: DETAIL_USER
});

export const actionUpdateUser = (object: any) => ({
  type: UPDATE_USER,
  object
});

export const actionResponseRegister = (object: any) => ({
  type: RESPONSE_REGISTER,
  object
});

export const actionResponseDetailUser = (object: any) => ({
  type: RESPONSE_DETAIL_USER,
  object
});

export const actionResponseLogin = (object: any) => ({
  type: RESPONSE_LOGIN,
  object
});

export const actionResponseUpdateUser = (object: any) => ({
  type: RESPONSE_UPDATE_USER,
  object
});

export const actionClearSesion = () => ({
  type: CLEAR_SESSION
});

export const actionClearAcction = () => ({
  type: CLEAR_ACTION
});

// Reducer
export function login(state = initialState, action: PropsReducer) {
  switch (action.type) {
    case RESPONSE_LOGIN:
      return action.object;
    case CLEAR_ACTION:
      return { ...state, action: "" };
    case CLEAR_SESSION:
      return Object.assign({
        action: "",
        isLoading: state.isLoading,
        access_token: null
      });
    default:
      return state;
  }
}

export function register(state = initialState, action: PropsReducer) {
  switch (action.type) {
    case RESPONSE_REGISTER:
      return Object.assign({}, action.object, {});
    case CLEAR_ACTION:
      return Object.assign({
        action: "",
        isLoading: state.isLoading,
        access_token: state.access_token
      });
    default:
      return state;
  }
}

export function detailUser(state = initialState, action: PropsReducer) {
  switch (action.type) {
    case RESPONSE_DETAIL_USER:
      console.log("Succes");
      return Object.assign(action.object);
    case CLEAR_ACTION:
      return Object.assign(state, {
        action: "",
        isLoading: state.isLoading
      });

    default:
      return state;
  }
}

export function updateUser(state = initialState, action: PropsReducer) {
  switch (action.type) {
    case RESPONSE_UPDATE_USER:
      console.log("Succes");
      return Object.assign(action.object);
    case CLEAR_ACTION:
      return Object.assign(state, {
        action: "",
        isLoading: state.isLoading
      });

    default:
      return state;
  }
}
