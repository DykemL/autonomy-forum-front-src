import AuthApi from "./AuthApi";

export type SetLoadingAction = (value: boolean) => void

class Api {
  static auth: AuthApi = new AuthApi();
}

export default Api;