import { call, put, select } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { status, constantes } from '../utils/constantes';
import { actionClearSesion } from '../redux/reducer';
import { actionChangeLoading } from '../modules/app/App.state';

const messageConnection = 'Ocurrió un error. Revise su conexión.';
const messageError = 'Ocurrió un error. Inténtelo nuevamente';
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
	name = '',
	values = {},
	callApi,
	actionResponse,
	mapperList,
	actionStatus: { ERROR, SUCCESS },
	paramsResponse = {},
	getStorage
}: PropsList) {
	try {
		const token = yield select((state) => state.auth.login.access_token);
		const response = yield call(callApi, Object.assign(values, { token }));
		console.log("response", response)
		switch (response.status) {
			case status.success:
				yield put(
					actionResponse(
						Object.assign({
							isLoading: false,
							action: SUCCESS,
							data: mapperList(response.body),
							message: response.message,
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
				const storage = yield select((state) => getStorage(state));

				yield put(
					actionResponse(
						Object.assign({
							isLoading: false,
							action: ERROR,
							message: response.message,
							list: storage.list,
							...paramsResponse
						})
					)
				);
				if (__DEV__) {
					console.log(name, 'entro al error');
				}
				break;
		}
		if (__DEV__) {
			console.log('Response ', name, response);
		}
	} catch (error) {
		if (__DEV__) {
			console.log('catch error ', name, error.message);
		}
		const storage = yield select((state) => getStorage(state));
		switch (error.message) {
			case constantes.NETWORK_CONECTION_FAIL:
				yield put(
					actionResponse({
						isLoading: false,
						message: messageConnection,
						action: ERROR,
						list: storage.list,
						...paramsResponse
					})
				);
				if (__DEV__) {
					console.log(name, ' entro al error de fallo de conexión');
				}
				break;
			default:
				yield put(
					actionResponse({
						isLoading: false,
						message: messageError,
						action: ERROR,
						list: storage.list,
						...paramsResponse
					})
				);
				if (__DEV__) {
					console.log(name, ' entro al error por defecto');
				}
				break;
		}
	}
}

type PropsUpdate = {
	name: string;
	values: any;
	callApi: any;
	actionResponse: any;
	actionStatus: ActionStatus;
	paramsResponse?: any;
};

export function* baseResponseUpdate({
	name = '',
	values = {},
	callApi,
	actionResponse,
	actionStatus: { SUCCESS, ERROR },
	paramsResponse = {}
}: PropsUpdate) {
	try {
		const token = yield select((state) => state.auth.detailUser.access_token);
		const response = yield call(callApi, Object.assign(values, { token }));
		switch (response.status) {
			case status.success:
				yield put(
					actionResponse(
						Object.assign({
							isLoading: false,
							action: SUCCESS,
							message: response.message,
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
							...paramsResponse
						})
					)
				);
				if (__DEV__) {
					console.log(name, 'entro al error');
				}
				break;
		}
		yield put(actionChangeLoading(false));
		if (__DEV__) {
			console.log('Response ', name, response);
		}
	} catch (error) {
		if (__DEV__) {
			console.log('catch error ', name, error.message);
		}
		switch (error.message) {
			case constantes.NETWORK_CONECTION_FAIL:
				yield put(
					actionResponse({
						isLoading: false,
						message: messageConnection,
						action: ERROR,
						...paramsResponse
					})
				);
				if (__DEV__) {
					console.log(name, ' entro al error de fallo de conexión');
				}
				break;
			default:
				yield put(
					actionResponse({
						isLoading: false,
						message: messageError,
						action: ERROR,
						...paramsResponse
					})
				);
				if (__DEV__) {
					console.log(name, ' entro al error por defecto');
				}
				break;
		}
		yield put(actionChangeLoading(false));
	}
}

type PropsDelete = {
	name: string;
	values: any;
	callApi: any;
	actionResponse: any;
	actionStatus: ActionStatus;
	paramsResponse: any;
};

export function* baseResponseDelete({
	name = '',
	values = {},
	callApi,
	actionResponse,
	actionStatus: { ERROR, SUCCESS },
	paramsResponse = {}
}: PropsDelete) {
	try {
		const token = yield select((state) => state.auth.login.access_token);
		const response = yield call(callApi, Object.assign(values, { token }));
		switch (response.status) {
			case status.accepted:
				yield put(
					actionResponse(
						Object.assign({
							isLoading: false,
							action: SUCCESS,
							message: response.message,
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
							...paramsResponse
						})
					)
				);
				if (__DEV__) {
					console.log(name, 'entro al error');
				}
				break;
		}
		if (__DEV__) {
			console.log('Response ', name, response);
		}
	} catch (error) {
		if (__DEV__) {
			console.log('catch error ', name, error.message);
		}
		switch (error.message) {
			case constantes.NETWORK_CONECTION_FAIL:
				yield put(
					actionResponse({
						isLoading: false,
						message: messageConnection,
						action: ERROR,
						...paramsResponse
					})
				);
				if (__DEV__) {
					console.log(name, ' entro al error de fallo de conexión');
				}
				break;
			default:
				yield put(
					actionResponse({
						isLoading: false,
						message: messageError,
						action: ERROR,
						...paramsResponse
					})
				);
				if (__DEV__) {
					console.log(name, ' entro al error por defecto');
				}
				break;
		}
	}
}

type PropsCreate = {
	name: string;
	values: any;
	callApi: any;
	actionResponse: any;
	actionStatus: ActionStatus;
	paramsResponse: any;
	mapperData: (data: any) => any;
};

export function* baseResponseCreate({
	name = '',
	values = {},
	callApi,
	actionResponse,
	actionStatus: { ERROR, SUCCESS },
	paramsResponse = {},
	mapperData
}: PropsCreate) {
	try {
		const token = yield select((state) => state.auth.login.access_token);
		const response = yield call(callApi, Object.assign(values, { token }));
		switch (response.status) {
			case status.createSuccess:
				yield put(
					actionResponse(
						Object.assign({
							isLoading: false,
							action: SUCCESS,
							message: response.message,
							data: mapperData(response.body),
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
							data: {},
							...paramsResponse
						})
					)
				);
				if (__DEV__) {
					console.log(name, 'entro al error');
				}
				break;
		}
		if (__DEV__) {
			console.log('Response ', name, response);
		}
	} catch (error) {
		if (__DEV__) {
			console.log('catch error ', name, error.message);
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
					console.log(name, ' entro al error de fallo de conexión');
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
					console.log(name, ' entro al error por defecto');
				}
				break;
		}
	}
}

type DetailUser = {
	name: string;
	values: any;
	callApi: any;
	actionResponse: any;
	actionStatus: ActionStatus;
	paramsResponse?: any;
	mapperData: (data: any) => any;
};

export function* baseResponseDetailUser({
	name = '',
	values = {},
	callApi,
	actionResponse,
	actionStatus: { ERROR, SUCCESS },
	paramsResponse = {}
}: DetailUser) {
	try {
		const token = yield select((state) => state.auth.login.access_token);
		const response = yield call(callApi, Object.assign(values, { token }));

		if (__DEV__) {
			switch (response.status) {
				case status.success:
					yield put(
						actionResponse(
							Object.assign({
								isLoading: false,
								action: SUCCESS,
								message: response.message,
								access_token: token,
								...paramsResponse,
								data: response.body
							})
						)
					);
					break;
				case status.unauthorized:
					yield put(actionClearSesion());
					yield showAlertCloseSession(response.message);
					break;
				default:
					const storage = yield select((state) => state.auth.detailUser);
					yield put(
						actionResponse(
							Object.assign({
								isLoading: false,
								action: ERROR,
								message: response.message,
								...paramsResponse,
								access_token: token,
								data: storage.data
							})
						)
					);
					if (__DEV__) {
						console.log(name, 'entro al error');
					}
					break;
			}
			console.log('Response ', name, response);
		}
	} catch (error) {
		// const token = yield select(state => state.auth.login.access_token);
		// const data = yield select(state => state.detailUser.data);
		if (__DEV__) {
			console.log('catch error ', name, error.message);
		}
		// switch (error.message) {
		//   case constantes.NETWORK_CONECTION_FAIL:
		//     yield put(
		//       actionResponse({
		//         isLoading: false,
		//         message: messageConnection,
		//         action: ERROR,
		//         data,
		//         ...paramsResponse,
		//         access_token: token
		//       })
		//     );
		//     if (__DEV__) {
		//       console.log(name, " entro al error de fallo de conexión");
		//     }
		//     break;
		//   default:
		//     yield put(
		//       actionResponse({
		//         isLoading: false,
		//         message: messageError,
		//         action: ERROR,
		//         data,
		//         ...paramsResponse,
		//         access_token: token
		//       })
		//     );
		//     if (__DEV__) {
		//       console.log(name, " entro al error por defecto");
		//     }
		//     break;
		// }
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
	name = '',
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
					console.log(name, 'entro al error');
				}
				break;
		}
		if (__DEV__) {
			console.log('Response ', name, response);
		}
	} catch (error) {
		if (__DEV__) {
			console.log('catch error ', name, error.message);
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
					console.log(name, ' entro al error de fallo de conexión');
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
					console.log(name, ' entro al error por defecto');
				}
				break;
		}
	}
}

const showAlertCloseSession = (message: string) => {
	Alert.alert(
		'',
		message,
		[
			{
				text: 'Aceptar',
				onPress: () => {}
			}
		],
		{ cancelable: false }
	);
};
