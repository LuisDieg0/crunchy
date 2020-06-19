declare module "@gotumi-redux" {
  export interface PropsReducer {
    object: any;
    type: string;
  }

  export interface StateReducer {
    app: App;
    auth: Auth;
    payments: Payments;
  }

  type App = {};
  type Auth = {
    login: BaseResponse;
    detailUser: BaseResponse;
    updateUser: BaseResponse;
    register: BaseResponse;
  };
  type Payments = {
    typePaymentSelect: any;
  };

  type BaseResponse = {
    action: string;
    message: string;
    data: any;
  };
}
