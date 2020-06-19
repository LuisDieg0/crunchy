declare module "@gotumi-modules/auth" {
  import { BaseProps } from "@gotumi-modules/base-props";
  import { BaseResponse } from "@gotumi-redux";

  export interface LoginProps extends BaseProps {
    callApiLogin: (data: any) => void;
    detailUser: {};
    status: { SUCCESS; ERROR };
    login: BaseResponse;
    clearAction: () => void;
  }

  export interface LoginState {
    changeData: (data?: any) => void;
  }

  export interface RegisterProps extends BaseProps {
    callApiRegister: (data: any) => void;
    status: { SUCCESS; ERROR };
    register: BaseResponse;
    clearAction: () => void;
  }

  export interface BusinessRegisterProps extends BaseProps {
    callApiRegister: (data: any) => void;
    status: { SUCCESS; ERROR };
    register: BaseResponse;
    clearAction: () => void;
  }

  export interface BusinessRegisterSate {}
}
